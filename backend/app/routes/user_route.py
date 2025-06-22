from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.user_service import register_user, authenticate_user
from app.schemas.user_schema import UserSchema

user_router = APIRouter(prefix="/users", tags=["Users"])

@user_router.post("/register")
def register(user: UserSchema, db: Session = Depends(get_db)):
    response = register_user(db, user)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@user_router.post("/login")
def login(user: UserSchema, db: Session = Depends(get_db)):
    token = authenticate_user(db, user)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return token
