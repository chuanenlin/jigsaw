from fastapi import APIRouter, File, UploadFile, HTTPException
import replicate
import boto3
import os
from config.settings import S3_BUCKET_NAME, MAX_FILE_SIZE
from utils.helpers import is_url, random_name
from models.schemas import (
    XCLIPRequest, RealBasicVSRRequest, RIFERequest, RobustVideoMattingRequest
)

router = APIRouter()

@router.post("/upload_video/")
async def upload_video(file: UploadFile = None):
    s3 = boto3.client('s3')
    if not file:
        raise HTTPException(status_code=400, detail="File not provided")
        
    file_content = await file.read()
    file_type = file.content_type
    
    if file_type not in ["video/mp4"]:
        raise HTTPException(status_code=400, detail="Invalid file type (must be .mp4)")
        
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

@router.post("/video2text/")
def video2text(request: XCLIPRequest):
    file = request.video if is_url(request.video) else open(request.video, "rb")
    output = replicate.run(
        "humanvideointeraction/x-clip:5d3cbf6eb687150cb5c06ca414d791f44b0688be9bf8374e49613a618d027204",
        input={
            "input_video": file,
            "prompts": "bicycle, car, cat"
        }
    )
    return {"text_output": output}

@router.post("/video2supervideo/")
def video2supervideo(request: RealBasicVSRRequest):
    file = request.video if is_url(request.video) else open(request.video, "rb")
    output = replicate.run(
        "pollinations/real-basicvsr-video-superresolution:005b4db1d719c1672c522b220db3bc899a81889986b5adc7a01b4f4cfb34e4a7",
        input={"video": file}
    )
    return {"video_output": output}

@router.post("/video2smoothvideo/")
def video2smoothvideo(request: RIFERequest):
    file = request.video if is_url(request.video) else open(request.video, "rb")
    output = replicate.run(
        "pollinations/rife-video-interpolation:245bd8a7c6179cee7ae745432e1d9e23c74b90232fbd835f9703c53bb372f031",
        input={
            "video": file,
            "interpolation_factor": request.interpolation_factor
        }
    )
    return {"video_output": output}

@router.post("/video2cutout/")
def video2cutout(request: RobustVideoMattingRequest):
    file = request.video if is_url(request.video) else open(request.video, "rb")
    output = replicate.run(
        "arielreplicate/robust_video_matting:73d2128a371922d5d1abf0712a1d974be0e4e2358cc1218e4e34714767232bac",
        input={
            "input_video": file,
            "output_type": "green-screen"
        }
    )
    return {"video_output": output} 