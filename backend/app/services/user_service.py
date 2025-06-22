from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.jwt_auth import hash_password, verify_password, create_access_token
from datetime import timedelta
from app.schemas.user_schema import UserSchema

def register_user(db: Session, user_data: UserSchema):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        return {"error": "User already exists"}
    
    new_user = User(
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": str(new_user.id)}

def authenticate_user(db: Session, login_data: UserSchema):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        return None

    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}
