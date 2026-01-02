from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    is_admin: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Question Schemas
class QuestionBase(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    difficulty: Optional[str] = "medium"
    category: Optional[str] = "general"

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class QuestionResponse(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    difficulty: str
    category: str
    
    class Config:
        from_attributes = True

# Score Schemas
class ScoreCreate(BaseModel):
    score: float
    total_questions: int
    percentage: float

class Score(BaseModel):
    id: int
    user_id: int
    score: float
    total_questions: int
    percentage: float
    completed_at: datetime
    
    class Config:
        from_attributes = True

class ScoreWithUser(Score):
    user: User

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Quiz Submission
class QuizAnswer(BaseModel):
    question_id: int
    selected_answer: str

class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]
