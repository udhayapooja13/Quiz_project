# Quiz System Backend

FastAPI backend for the Online Quiz System with SQLite database.

## Setup

1. Install Python dependencies:
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

2. Run the server:
\`\`\`bash
uvicorn app.main:app --reload --port 8000
\`\`\`

The server will start at http://localhost:8000

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database

The SQLite database (`quiz.db`) is automatically created and seeded with sample data on first run.

## API Endpoints

### Authentication
- POST `/api/signup` - Register new user
- POST `/api/login` - Login user
- GET `/api/me` - Get current user

### Questions
- POST `/api/questions` - Add question (admin only)
- GET `/api/questions/random?count=10` - Get random questions for quiz
- GET `/api/questions` - Get all questions (admin only)

### Quiz
- POST `/api/quiz/submit` - Submit quiz answers

### Scores
- GET `/api/scores/me` - Get current user's scores
- GET `/api/scores/all` - Get leaderboard
