from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import openai # type: ignore
from sqlalchemy import create_engine, Column, Integer, String, Sequence # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from sqlalchemy.orm import sessionmaker # type: ignore

# Database setup
DATABASE_URL = "sqlite:///./test.db"  # Use your database URL here
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# OpenAI API Key
openai.api_key = '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'

# Models
class UserInput(Base):
    __tablename__ = 'user_inputs'
    id = Column(Integer, Sequence('user_input_id_seq'), primary_key=True)
    project_type = Column(String)
    location = Column(String)
    zip_code = Column(String)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    service_id = Column(Integer)

Base.metadata.create_all(bind=engine)

# FastAPI instance
app = FastAPI()

# Pydantic model
class UserInputCreate(BaseModel):
    project_type: str
    location: str
    zip_code: str
    name: str
    email: str
    phone: str
    service_id: int

# API endpoints
@app.post("/chatbot/input/")
def create_user_input(user_input: UserInputCreate):
    db = SessionLocal()
    db_input = UserInput(**user_input.dict())
    db.add(db_input)
    db.commit()
    db.refresh(db_input)
    db.close()
    return db_input

@app.post("/chatbot/ask/")
async def ask_gpt(prompt: str):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"response": response.choices[0].message['content']}