from fastapi import APIRouter, HTTPException
import json
from typing import List
from models.posts_models import PostsJsonFields, EventCreatePost
from utils.json_utils import posts_json_file_path
import os

router = APIRouter()

#returns all posts inside the community
@router.get("/posts/all", response_model=List[PostsJsonFields])
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


#creates a new post in community mural
@router.post("/posts/create", response_model=PostsJsonFields)
def create_mural_post(event: EventCreatePost):
    try:
        # Read existing data from JSON file
        if os.path.exists(posts_json_file_path):
            with open(posts_json_file_path, 'r') as file:
                data = json.load(file)
        else:
            data = []

        #new post ID
        new_id = max([post['id'] for post in data], default=0) + 1
        
        #create the new post
        new_post = {
            "id": new_id,
            "author": event.author,
            "post": event.post
        }

        #append the new post to the data list
        data.append(new_post)

        #add in json
        with open(posts_json_file_path, 'w') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

        return PostsJsonFields(**new_post)
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="JSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

