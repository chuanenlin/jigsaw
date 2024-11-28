from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from config.settings import (
    CORS_ORIGINS, APP_TITLE, APP_DESCRIPTION, APP_VERSION
)
from api import (
    text_routes,
    image_routes,
    video_routes,
    audio_routes,
    multimodal_routes,
    chain_routes
)

app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    swagger_ui_parameters={"displayRequestDuration": True}
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(text_routes.router, tags=["Text"])
app.include_router(image_routes.router, tags=["Image"])
app.include_router(video_routes.router, tags=["Video"])
app.include_router(audio_routes.router, tags=["Audio"])
app.include_router(multimodal_routes.router, tags=["Multimodal"])
app.include_router(chain_routes.router, tags=["Chain"])

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
