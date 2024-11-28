from fastapi import APIRouter, File, UploadFile, HTTPException
import replicate
import boto3
import os
from config.settings import S3_BUCKET_NAME, MAX_FILE_SIZE
from utils.helpers import is_url, random_name
from models.schemas import (
    MusicClassificationRequest, WhisperSubtitlesRequest, FreeVCRequest
)

router = APIRouter()

@router.post("/upload_audio/")
async def upload_audio(file: UploadFile = None):
    s3 = boto3.client('s3')
    if not file:
        raise HTTPException(status_code=400, detail="File not provided")
        
    file_content = await file.read()
    file_type = file.content_type
    
    if file_type not in ["audio/mpeg", "audio/wav"]:
        raise HTTPException(status_code=400, detail="Invalid file type (must be .mp3 or .wav)")
        
    file_size = len(file_content)
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File size exceeds the limit ({MAX_FILE_SIZE/(1024*1024)} MB)")
        
    file_name = f"{random_name()}{os.path.splitext(file.filename)[1]}"
    
    try:
        s3.put_object(Bucket=S3_BUCKET_NAME, Key=file_name, Body=file_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    file_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_name}"
    return {"file_url": file_url}

@router.post("/music2text/")
def music2text(request: MusicClassificationRequest):
    file = request.audio if is_url(request.audio) else open(request.audio, "rb")
    output = replicate.run(
        "pengdaqian2020/music-label:49f93cef87608197b9b570db991794a19f064d3d301c7843e1c9537393ffe4e1",
        input={"audio_path": file}
    )
    return {"text_output": ', '.join(output)}

@router.post("/speech2text/")
async def speech2text(request: WhisperSubtitlesRequest):
    file = request.audio if is_url(request.audio) else open(request.audio, "rb")
    output = replicate.run(
        "m1guelpf/whisper-subtitles:7f686e243a96c7f6f0f481bcef24d688a1369ed3983cea348d1f43b879615766",
        input={"audio_path": file}
    )
    return {"text_output": output["text"].lstrip()}

@router.post("/speech_speech2speech/")
async def speech_speech2speech(request: FreeVCRequest):
    source_file = request.source_audio if is_url(request.source_audio) else open(request.source_audio, "rb")
    reference_file = request.reference_audio if is_url(request.reference_audio) else open(request.reference_audio, "rb")
    output = replicate.run(
        "jagilley/free-vc:e4f2ff8a1d3779a2411e119dfad7d451d5f3314a8cd7003a88f88ce4c3b18d95",
        input={
            "source_audio": source_file,
            "reference_audio": reference_file,
            "model_type": request.model_type
        }
    )
    return {"audio_output": output} 