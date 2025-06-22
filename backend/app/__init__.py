import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from whitenoise import WhiteNoise
from dotenv import load_dotenv
from app.routes.trade_route import trade_router
from app.routes.risk_setting_route import risk_setting_router
from app.routes.user_route import user_router
from app.routes.analytics_route import analytics_router
from app.routes.websocket_route import websocket_router

# Load environment variables
load_dotenv()

# Read ALLOWED_HOSTS & CORS settings from .env
allowed_hosts = os.getenv("ALLOWED_HOSTS", "localhost").split(",")
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")

app = FastAPI(title="Trade Manager API", version="1.0")

# Enable CORS (restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Restrict allowed hosts 
app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=allowed_hosts
)

# Ensure 'static' directory exists
STATIC_DIR = "static"
EXPORTS_DIR = os.path.join(STATIC_DIR, "exports")
os.makedirs(EXPORTS_DIR, exist_ok=True)

# Mount static files with FastAPI
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Whitenoise Middleware for serving static files efficiently
app.add_middleware(
    WhiteNoise,
    root=STATIC_DIR,
    prefix="static/"
)

# Define API prefix
api_prefix = "/api/v1"

# List of routers
routers = [
    user_router,
    trade_router,
    risk_setting_router,
    analytics_router,
    websocket_router
]

# Register routers with the API prefix
for router in routers:
    app.include_router(router, prefix=api_prefix)

@app.get("/")
def root():
    return {"message": "Welcome to the Trade Manager API"}
