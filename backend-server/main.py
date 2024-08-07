from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from typing import List
import os

app = FastAPI()

# Path to the JSON file
json_file_path = "../src/data/events.json"

class Item(BaseModel):
    name: str
    value: str

# Ensure the JSON file exists
if not os.path.exists(json_file_path):
    with open(json_file_path, 'w') as file:
        json.dump([], file)

@app.get("/data", response_model=List[Item])
def read_data():
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    return data

@app.post("/data", response_model=Item)
def write_data(item: Item):
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    if any(existing_item['name'] == item.name for existing_item in data):
        raise HTTPException(status_code=400, detail="Item already exists")
    data.append(item.dict())
    with open(json_file_path, 'w') as file:
        json.dump(data, file, indent=4)
    return item

@app.get("/")
def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
