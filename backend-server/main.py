from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import event, posts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(event.router)
app.include_router(posts.router)

@app.get("/ping")
def root():
    return {"message": "Pong!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
