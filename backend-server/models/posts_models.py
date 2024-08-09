from pydantic import BaseModel
from typing import List

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

class EventCreatePost(BaseModel):
    author: dict
    post: dict