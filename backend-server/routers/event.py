from fastapi import APIRouter, HTTPException, Path
import json
from typing import List
from models.event_models import *
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
        #find the event with the given ID
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
        
        #find the event with the given ID
        event = next((item for item in data if item['id'] == event_id), None)

        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #return only the author part of the event
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
@router.post("/event/id/{event_id}/add/participant")
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
    

#reserve an equipment inside an event
@router.post("/event/id/{event_id}/reserve/equipment/{equipment_id}")
def reserve_equipment(event_id: str, equipment_id: int, reservation: EventReserveEquipment):
    try:
        #read existing data from JSON file
        if os.path.exists(events_json_file_path):
            with open(events_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #find the event by ID
        event = next((item for item in data if item['id'] == event_id), None)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #check if the equipment exists within the event's equipment list
        equipment = next((eq for eq in event.get('expenses', {}).get('equipment', []) if eq['id'] == equipment_id), None)
        if equipment is None:
            raise HTTPException(status_code=404, detail="Equipment not found")

        #check if the number of participants is less than the equipment's maxQuantity
        if len(equipment.get('participants', [])) >= equipment['maxQuantity']:
            raise HTTPException(status_code=400, detail="Equipment is fully booked")

        #add user to the 'equipment'[participants] list
        if not any(participant['id'] == reservation.participant.id for participant in equipment.get('participants', [])):
            equipment['participants'].append(reservation.participant.dict())
        else:
            raise HTTPException(status_code=400, detail="Participant already reserved in this equipment")

        #save changes to JSON file
        with open(events_json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return {"message": "Equipment reserved successfully"}

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


#reserve a new equipment inside event
@router.post("/event/id/{event_id}/reserve/equipment/{equipment_id}")
def reserve_equipment(event_id: str, equipment_id: int, event: EventReserveEquipment):
    try:
        #read the existing data from JSON file
        with open("events.json", "r") as file:
            data = json.load(file)
        
        #find the event by ID
        event = next((event for event in data["events"] if event["id"] == event_id), None)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        #find the equipment by ID
        equipment = next((equipment for equipment in event["equipment"] if equipment["id"] == equipment_id), None)
        if not equipment:
            raise HTTPException(status_code=404, detail="Equipment not found")
        
        #check if the participant is already in the equipment participants list
        if any(participant["id"] == event.participant.id for participant in equipment["participants"]):
            raise HTTPException(status_code=400, detail="Participant is already reserved in this equipment")
        
        #compare if the length of equipment['participants'] is less than the maxQuantity
        if len(equipment["participants"]) < equipment["maxQuantity"]:
            #add the participant to the 'equipment[participants]' list
            equipment["participants"].append(event.participant.dict())
        else:
            raise HTTPException(status_code=400, detail="Equipment is fully booked")
        
        #save changes back to the JSON file
        with open("events.json", "w") as file:
            json.dump(data, file, indent=4)
        
        return {"message": "Equipment reserved successfully"}
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


#adds vehicles to events given the event ID
@router.post("/event/id/{event_id}/add/vehicle")
def add_vehicle(event_id: str, vehicle: EventAddVehicle):
    try:
        #read existing data from JSON file
        if os.path.exists(events_json_file_path):
            with open(events_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #find the event by ID
        event = next((item for item in data if item['id'] == event_id), None)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #check if the vehicle with the same name and owner is already registered
        if any(v['name'] == vehicle.name and v['owner']['name'] == vehicle.owner.name for v in event.get('expenses', {}).get('transport', [])):
            return {"message": "Vehicle with the same name and owner is already registered"}

        #get the last element ID and increment this vehicle's ID
        existing_vehicle_ids = [v['id'] for v in event.get('expenses', {}).get('transport', [])]
        new_id = max(existing_vehicle_ids, default=0) + 1
        
        #adding the new value to the ID field 
        new_vehicle = {"id": new_id}
        new_vehicle.update(vehicle.dict())

        #add the vehicle to the 'expenses[transport]' list
        if 'expenses' not in event:
            event['expenses'] = {}
        if 'transport' not in event['expenses']:
            event['expenses']['transport'] = []
        
        event['expenses']['transport'].append(new_vehicle)

        #save changes to JSON file
        with open(events_json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return {"message": "New vehicle added to event"}

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


#adds an equipment to event given the event ID
@router.post("/event/id/{event_id}/add/equipment")
def add_event_equipment(event_id: str, equipment: EventAddEquipment):
    try:
        #read existing data from JSON file
        if os.path.exists(events_json_file_path):
            with open(events_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #find the event by ID
        event = next((item for item in data if item['id'] == event_id), None)
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        #check if the vehicle is already registered by the user (if yes, then inform)
        if any(e['name'] == equipment.name and e['owner']['name'] == equipment.owner.name for e in event.get('expenses', {}).get('equipment', [])):
            return {"message": "Equipment with the same name and author is already in the event"}

        #get the last element ID increment this object ID
        existing_equipment_ids = [e['id'] for e in event.get('expenses', {}).get('equipment', [])]
        new_id = max(existing_equipment_ids, default=0) + 1
        
        #adding the new value to ID field 
        new_equipment = {"id": new_id}
        new_equipment.update(equipment.dict())

        #adds equipment to 'expenses[equipment] list'
        if 'expenses' not in event:
            event['expenses'] = {}
        if 'equipment' not in event['expenses']:
            event['expenses']['equipment'] = []
        
        event['expenses']['equipment'].append(new_equipment)

        #add changes to json
        with open(events_json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return {"message": "New equipment added to event"}

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

