from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router
from .init_db import init_database

app = FastAPI(title="Quiz API", version="1.0.0")

# CORS configuration for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_database()
    print("Database initialized successfully!")

# Include API routes
app.include_router(router, prefix="/api", tags=["api"])

@app.get("/")
def read_root():
    return {"message": "Quiz API is running", "docs": "/docs"}
