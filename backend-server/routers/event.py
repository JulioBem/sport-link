from fastapi import APIRouter, HTTPException, Path
import json
from typing import List
from models.event_models import EventsJsonFields, EventCreateRequest, EventAddParticipant, Participant, ExpenseItem, Owner, Author
from utils.json_utils import events_json_file_path
import uuid
import datetime
import os

router = APIRouter()

#returns all events json
@router.get("/events/all", response_model=List[EventsJsonFields])
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
@router.get("/events/id/{event_id}", response_model=EventsJsonFields)
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
@router.get("/events/id/{event_id}/authors", response_model=Author)
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
@router.get("/events/id/{event_id}/participants", response_model=List[Participant])
def read_event_participants(event_id: str = Path(..., description="All members inside an event by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #return the participants part of the event
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
@router.get("/events/id/{event_id}/expenses", response_model=List[ExpenseItem])
def read_event_expenses(event_id: str = Path(..., description="All expenses by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #extract the expenses and return them
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
@router.get("/events/id/{event_id}/expenses/transports", response_model=List[ExpenseItem])
def read_event_expenses_trasports(event_id:str = Path(..., description="All transports by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #extract only the transport expenses and return them
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
@router.get("/events/id/{event_id}/expenses/equipments", response_model=List[ExpenseItem])
def read_event_expenses_equipments(event_id:str = Path(..., description="All transports by event ID")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #extract only the equipment expenses and return them
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
@router.get("/events/id/{event_id}/owners", response_model=Owner)
def read_event_author(event_id: str = Path(..., description="The Author of the event to retrieve")):
    try:
        with open(events_json_file_path, 'r') as file:
            data = json.load(file)
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #return only the author part of the event
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
    

#----------------------------- POST FUNCTIONS -----------------------------#

#creates a new event inside community
@router.post("/events/create", response_model=EventsJsonFields)
def create_event(event: EventCreateRequest):
    try:
        #read existing data from JSON file
        if os.path.exists(events_json_file_path):
            with open(events_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #create a new event with values from the request body
        new_event = {
            "id": "event" + str(uuid.uuid4()),
            "title": event.title,
            "description": event.description,
            "location": event.location.dict(),
            "date": event.date,
            "createdAt": datetime.utcnow().isoformat(),
            "author": {
                "id": str(uuid.uuid4()),
                "name": "Admin",
                "email": "admin@example.com",
                "profilePicture": "https://placehold.co/50.png",
                "chavePix": ""
            },
            "participants": [],
            "capacity": event.capacity,
            "imageURI": "https://placehold.co/50.png",
            "expenses": {}
        }

        #append the new event to the data list
        data.append(new_event)
        #write the updated data back to the JSON file
        with open(events_json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return EventsJsonFields(**new_event)
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#adds a new user to the event "participant" array
@router.post("/event/id/{event_id}/enter")
def add_event_participant(event_id: str, participant: EventAddParticipant):
    try:
        #read existing data from JSON file
        if os.path.exists(events_json_file_path):
            with open(events_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #find event by ID
        event = next((item for item in data if item['id'] == event_id), None)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #chek if user is already in event
        if any(p['id'] == participant.id for p in event['participants']):
            return {"message": "Participant is already in the event"}

        #add user in list
        event['participants'].append(participant.dict())

        #add changes to json
        with open(events_json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return {"message": "new user added"}

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")