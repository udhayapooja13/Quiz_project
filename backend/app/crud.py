from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User CRUD
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# Question CRUD
def create_question(db: Session, question: schemas.QuestionCreate):
    db_question = models.Question(**question.model_dump())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def get_questions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Question).offset(skip).limit(limit).all()

def get_random_questions(db: Session, count: int = 10):
    all_questions = db.query(models.Question).all()
    if len(all_questions) <= count:
        return all_questions
    return random.sample(all_questions, count)

def get_question_by_id(db: Session, question_id: int):
    return db.query(models.Question).filter(models.Question.id == question_id).first()

# Score CRUD
def create_score(db: Session, score: schemas.ScoreCreate, user_id: int):
    db_score = models.Score(**score.model_dump(), user_id=user_id)
    db.add(db_score)
    db.commit()
    db.refresh(db_score)
    return db_score

def get_user_scores(db: Session, user_id: int):
    return db.query(models.Score).filter(models.Score.user_id == user_id).order_by(models.Score.completed_at.desc()).all()

def get_all_scores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Score).order_by(models.Score.percentage.desc()).offset(skip).limit(limit).all()
