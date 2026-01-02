# QuizMaster - Online Quiz System

A full-stack quiz application built with Next.js (TypeScript + Tailwind CSS) for the frontend and Python FastAPI with SQLite for the backend.

## Features

- **User Authentication**: Secure signup and login with JWT tokens and bcrypt password hashing
- **Quiz System**: Take quizzes with 10 random questions from the database
- **Score Tracking**: View your quiz history and performance statistics
- **Admin Panel**: Add new questions (admin access required)
- **Leaderboard**: See top scores from all users
- **Responsive UI**: Clean and modern interface built with Tailwind CSS and shadcn/ui

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components

### Backend
- Python FastAPI
- SQLite database
- SQLAlchemy ORM
- JWT authentication
- Bcrypt password hashing

## Project Structure

\`\`\`
my-quiz-app/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application
│   │   ├── api.py           # API routes
│   │   ├── models.py        # Database models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database configuration
│   │   └── init_db.py       # Database initialization
│   ├── requirements.txt
│   └── README.md
└── frontend/ (Next.js app)
    ├── app/
    │   ├── page.tsx         # Home page
    │   ├── login/           # Login page
    │   ├── signup/          # Signup page
    │   ├── dashboard/       # User dashboard
    │   ├── quiz/            # Quiz taking page
    │   ├── results/         # Quiz results
    │   └── admin/           # Admin panel
    ├── components/ui/       # UI components
    └── lib/                 # Utilities and API functions
\`\`\`

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install Python dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Run the FastAPI server:
\`\`\`bash
uvicorn app.main:app --reload --port 8000
\`\`\`

The backend will be available at **http://localhost:8000**

API documentation: **http://localhost:8000/docs**

### Frontend Setup

1. Open a new terminal and navigate to the project root (where package.json is)

2. Install dependencies (if not already installed):
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at **http://localhost:3000**

## Default Credentials

The database is automatically seeded with an admin account:

- **Username**: `admin`
- **Password**: `admin123`

You can use these credentials to log in as an admin and add new questions.

## Usage

### For Regular Users

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Access your account at `/login`
3. **Dashboard**: View your statistics and quiz history
4. **Take Quiz**: Start a new quiz with 10 random questions
5. **View Results**: See your score and performance after completing a quiz

### For Admins

1. **Login**: Use admin credentials
2. **Add Questions**: Navigate to "Add Question" from the dashboard
3. **Create Questions**: Fill in the question form with options and correct answer

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - Login user
- `GET /api/me` - Get current user info

### Questions
- `POST /api/questions` - Add question (admin only)
- `GET /api/questions/random?count=10` - Get random questions
- `GET /api/questions` - Get all questions (admin only)

### Quiz & Scores
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/scores/me` - Get user's scores
- `GET /api/scores/all` - Get leaderboard

## Environment Variables

Create a `.env.local` file in the frontend root if you want to change the API URL:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

## Database

The SQLite database (`quiz.db`) is automatically created in the backend directory on first run. It includes:

- **Users table**: Stores user accounts with hashed passwords
- **Questions table**: Contains quiz questions with 4 options and correct answer
- **Scores table**: Tracks quiz attempts and scores

The database is seeded with 10 sample questions covering various categories.

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- CORS configuration for secure cross-origin requests
- Admin-only endpoints for sensitive operations

## Development Notes

- The backend runs on port 8000
- The frontend runs on port 3000
- CORS is configured to allow requests from localhost:3000 and localhost:3001
- All API calls require authentication (except signup/login)
- Admin features are only accessible to users with `is_admin = 1`

## Future Enhancements

- Add question categories filter
- Timed quizzes
- Question difficulty selection
- User profile customization
- Social features and challenges
- Question editing and deletion
- Detailed analytics and insights

## License

MIT
\`\`\`
