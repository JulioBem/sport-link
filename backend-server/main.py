from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel
import json
from typing import List
import os

app = FastAPI()

json_file_path = "./events.json"
event_id = 'event123'

class EventsJsonFields(BaseModel):
    id: str
    title:str
    description:str
    location:dict
    date:str
    createdAt:str
    author:dict
    participants:list
    capacity:int
    imageURI:str
    expenses:dict


class PostsJsonFields(BaseModel):
    pass

    

# Ensure the JSON file exists
if not os.path.exists(json_file_path):
    with open(json_file_path, 'w') as file:
        json.dump([], file)

@app.get("/events/all", response_model=List[EventsJsonFields])
def read_data():
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)
        valid_data = [EventsJsonFields(**item) for item in data]
        return valid_data
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

@app.get("/events/id/{event_id}", response_model=EventsJsonFields)
def read_event_by_id(event_id: str = Path(..., description="The ID of the event to retrieve")):
    try:
        with open(json_file_path, 'r') as file:
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
    


@app.get("/")
def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
