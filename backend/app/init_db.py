from sqlalchemy.orm import Session
from . import models, crud, schemas
from .database import engine, SessionLocal

def init_database():
    # Create all tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin = crud.get_user_by_username(db, "admin")
        if not admin:
            # Create admin user
            admin_user = schemas.UserCreate(
                username="admin",
                email="admin@quiz.com",
                password="admin123"
            )
            admin = crud.create_user(db, admin_user)
            admin.is_admin = 1
            db.commit()
            print("Admin user created: username=admin, password=admin123")
        
        # Check if sample questions exist
        existing_questions = crud.get_questions(db, limit=1)
        if not existing_questions:
            # Add sample questions
            sample_questions = [
                {
                    "question_text": "What is the capital of France?",
                    "option_a": "London",
                    "option_b": "Berlin",
                    "option_c": "Paris",
                    "option_d": "Madrid",
                    "correct_answer": "C",
                    "difficulty": "easy",
                    "category": "Geography"
                },
                {
                    "question_text": "Which planet is known as the Red Planet?",
                    "option_a": "Venus",
                    "option_b": "Mars",
                    "option_c": "Jupiter",
                    "option_d": "Saturn",
                    "correct_answer": "B",
                    "difficulty": "easy",
                    "category": "Science"
                },
                {
                    "question_text": "What is 2 + 2?",
                    "option_a": "3",
                    "option_b": "4",
                    "option_c": "5",
                    "option_d": "6",
                    "correct_answer": "B",
                    "difficulty": "easy",
                    "category": "Math"
                },
                {
                    "question_text": "Who wrote 'Romeo and Juliet'?",
                    "option_a": "Charles Dickens",
                    "option_b": "Mark Twain",
                    "option_c": "William Shakespeare",
                    "option_d": "Jane Austen",
                    "correct_answer": "C",
                    "difficulty": "medium",
                    "category": "Literature"
                },
                {
                    "question_text": "What is the largest ocean on Earth?",
                    "option_a": "Atlantic Ocean",
                    "option_b": "Indian Ocean",
                    "option_c": "Arctic Ocean",
                    "option_d": "Pacific Ocean",
                    "correct_answer": "D",
                    "difficulty": "medium",
                    "category": "Geography"
                },
                {
                    "question_text": "In what year did World War II end?",
                    "option_a": "1943",
                    "option_b": "1944",
                    "option_c": "1945",
                    "option_d": "1946",
                    "correct_answer": "C",
                    "difficulty": "medium",
                    "category": "History"
                },
                {
                    "question_text": "What is the chemical symbol for gold?",
                    "option_a": "Go",
                    "option_b": "Au",
                    "option_c": "Gd",
                    "option_d": "Ag",
                    "correct_answer": "B",
                    "difficulty": "hard",
                    "category": "Science"
                },
                {
                    "question_text": "Which programming language is known as the 'language of the web'?",
                    "option_a": "Python",
                    "option_b": "Java",
                    "option_c": "JavaScript",
                    "option_d": "C++",
                    "correct_answer": "C",
                    "difficulty": "easy",
                    "category": "Technology"
                },
                {
                    "question_text": "What is the speed of light in vacuum?",
                    "option_a": "299,792,458 m/s",
                    "option_b": "150,000,000 m/s",
                    "option_c": "400,000,000 m/s",
                    "option_d": "500,000,000 m/s",
                    "correct_answer": "A",
                    "difficulty": "hard",
                    "category": "Physics"
                },
                {
                    "question_text": "Who painted the Mona Lisa?",
                    "option_a": "Vincent van Gogh",
                    "option_b": "Pablo Picasso",
                    "option_c": "Leonardo da Vinci",
                    "option_d": "Michelangelo",
                    "correct_answer": "C",
                    "difficulty": "easy",
                    "category": "Art"
                }
            ]
            
            for q_data in sample_questions:
                question = schemas.QuestionCreate(**q_data)
                crud.create_question(db, question)
            
            print(f"Added {len(sample_questions)} sample questions")
    finally:
        db.close()
