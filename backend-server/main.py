from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from typing import List, Optional, Dict
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



events_json_file_path = "../src/data/events.json"
posts_json_file_path = "../src/data/posts.json"


# events.json classes:
class Participant(BaseModel):
    id: str
    name: str
    email: str
    profilePicture: str
    status: str

class Owner(BaseModel):
    id: str
    name: str
    email: str
    profilePicture: str
    chavePix: str

class ExpenseItem(BaseModel):
    id: int
    name: str
    cost: str
    owner: Owner
    participants: List[Participant]
    maxQuantity: int

class Location(BaseModel):
    address: str

class Author(BaseModel):
    id: str
    name: str
    email: str
    profilePicture: str
    chavePix: Optional[str] 

class EventsJsonFields(BaseModel):
    id: str
    title: str
    description: str
    location: Location
    date: str
    createdAt: str
    author: Author
    participants: List[Participant]
    capacity: int
    imageURI: str
    expenses: Optional[Dict]

#posts.json classes:
class PostAuthor(BaseModel):
    imageURI: str
    authorName: str
    authorSurname: str

class PostContent(BaseModel):
    postContent: str
    postDate: str

class PostsJsonFields(BaseModel):
    id: int
    author: PostAuthor
    post: PostContent

    
#check if JSON file exists:
if not os.path.exists(events_json_file_path):
    with open(events_json_file_path, 'w') as file:
        json.dump([], file)


#----------------------------- GET FUNCTIONS -----------------------------#

#returns all events json
@app.get("/events/all", response_model=List[EventsJsonFields])
def read_all_events():
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        valid_data = [EventsJsonFields(**item) for item in data]
        return valid_data
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all events by the specific event ID
@app.get("/events/id/{event_id}", response_model=EventsJsonFields)
def read_event_by_id(event_id: str = Path(..., description="The ID of the event to retrieve")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")
        return EventsJsonFields(**event)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all authors by the specific event ID
@app.get("/events/id/{event_id}/authors", response_model=Author)
def read_event_author(event_id: str = Path(..., description="The Author of the event to retrieve")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Return only the author part of the event
        author = event.get('author')
        if not author:
            raise HTTPException(status_code=404, detail="Author not found in the event")

        return Author(**author)
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all participants by the specific event ID
@app.get("/events/id/{event_id}/participants", response_model=List[Participant])
def read_event_participants(event_id: str = Path(..., description="All members inside an event by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Return the participants part of the event
        participants = event.get('participants', [])
        if not participants:
            raise HTTPException(status_code=404, detail="No participants found in the event")

        return [Participant(**participant) for participant in participants]
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all expenses by the specific event ID
@app.get("/events/id/{event_id}/expenses", response_model=List[ExpenseItem])
def read_event_expenses(event_id: str = Path(..., description="All expenses by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Extract the expenses and return them
        expenses = event.get('expenses', {}).get('equipment', []) + event.get('expenses', {}).get('transport', [])
        
        if not expenses:
            raise HTTPException(status_code=404, detail="No expenses found for this event")

        return [ExpenseItem(**expense) for expense in expenses]
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all transport items inside an event by the specific event ID
@app.get("/events/id/{event_id}/expenses/transports", response_model=List[ExpenseItem])
def read_event_expenses_trasports(event_id:str = Path(..., description="All transports by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Extract only the transport expenses and return them
        transport_expenses = event.get('expenses', {}).get('transport', [])
        
        if not transport_expenses:
            raise HTTPException(status_code=404, detail="No transport expenses found for this event")

        return [ExpenseItem(**expense) for expense in transport_expenses]
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#returns all equipment items inside an event by the specific event ID
@app.get("/events/id/{event_id}/expenses/equipments", response_model=List[ExpenseItem])
def read_event_expenses_equipments(event_id:str = Path(..., description="All transports by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Extract only the equipment expenses and return them
        equipment_expenses = event.get('expenses', {}).get('equipment', [])
        
        if not equipment_expenses:
            raise HTTPException(status_code=404, detail="No equipment expenses found for this event")

        return [ExpenseItem(**expense) for expense in equipment_expenses]
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


#returns all event owners by the specific event ID
@app.get("/events/id/{event_id}/owners", response_model=Owner)
def read_event_author(event_id: str = Path(..., description="The Author of the event to retrieve")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        # Find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        # Return only the author part of the event
        owner = event.get('author')
        if not owner:
            raise HTTPException(status_code=404, detail="Author not found in the event")

        return Owner(**owner)
        
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    
    
#returns all posts inside the community
@app.get("/posts/all", response_model=List[PostsJsonFields])
def read_all_posts():
    try:
        with open(posts_json_file_path, 'r') as file:
            data = json.load(file)
        valid_data = [PostsJsonFields(**item) for item in data]
        return valid_data
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#----------------------------- POST FUNCTIONS -----------------------------#

#----------------------------- REMOVE FUNCTIONS -----------------------------#

#----------------------------- PUT FUNCTIONS -----------------------------#

@app.get("/ping")
def root():
    return {"message": "Pong!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
