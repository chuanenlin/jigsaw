from fastapi import APIRouter, File, UploadFile, HTTPException
import replicate
import boto3
from config.settings import S3_BUCKET_NAME, MAX_FILE_SIZE
from utils.helpers import is_url, random_name
from models.schemas import (
    BLIPRequest, RAMGroundedSAM, StableVideoDiffusion, RealESRGANRequest,
    GFPGANRequest, BigColorRequest, GrayscaleRequest, PyTesseractRequest,
    RembgRequest, PeopleRemoval, YOLOXRequest, DeticRequest, ImageMiscRequest,
    ShapeEImgRequest, RMNRequest, StyleCLIPRequest, SadTalkerRequest
)

router = APIRouter()

@router.post("/upload_image/")
async def upload_image(file: UploadFile = None):
    s3 = boto3.client('s3')
    if not file:
        raise HTTPException(status_code=400, detail="File not provided")
        
    file_content = await file.read()
    file_type = file.content_type
    
    if file_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type (must be .jpeg or .png)")
        
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

@router.post("/img2text/")
def img2text(request: BLIPRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        input={"image": file}
    )
    return {"text_output": output.replace("Caption: ", "")}

@router.post("/img2tags/")
def img2tags(request: RAMGroundedSAM):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "idea-research/ram-grounded-sam:80a2aede4cf8e3c9f26e96c308d45b23c350dd36f1c381de790715007f1ac0ad",
        input={"input_image": file}
    )
    return {"text_output": output["tags"]}

@router.post("/img2video/")
def img2video(request: StableVideoDiffusion):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        input={"input_image": file}
    )
    return {"video_output": output}

@router.post("/img2superimg/")
def img2superimg(request: RealESRGANRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "daanelson/real-esrgan-a100:499940604f95b416c3939423df5c64a5c95cfd32b464d755dacfe2192a2de7ef",
        input={
            "image": file,
            "scale": request.scale,
            "face_enhance": request.face_enhance
        }
    )
    return {"image_output": output}

@router.post("/img2goodfaceimg/")
def img2goodfaceimg(request: GFPGANRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        input={
            "img": file,
            "version": request.version,
            "scale": request.scale
        }
    )
    return {"image_output": output}

@router.post("/imggray2imgcolor/")
def imggray2imgcolor(request: BigColorRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "cjwbw/bigcolor:9451bfbf652b21a9bccc741e5c7046540faa5586cfa3aa45abc7dbb46151a4f7",
        input={"image": file}
    )
    return {"image_output": output[0]["image"]}

@router.post("/img2cutout/")
def img2cutout(request: RembgRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        input={"image": file}
    )
    return {"image_output": output}

@router.post("/img2nopeopleimg/")
def img2nopeopleimg(request: PeopleRemoval):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "sujaykhandekar/object-removal:153b0087c2576ad30d8cbddb35275b387d1a6bf986bda5499948f843f6460faf",
        input={
            "image_path": file,
            "objects_to_remove:": "person"
        }
    )
    return {"image_output": output}

@router.post("/img2box/")
def img2box(request: DeticRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "facebookresearch/detic:37fbaca39b3185aa297903062fcab7248cada248ddd0c70bf01622dffc8d16bb",
        input={"image": file}
    )
    return {"image_output": output}

@router.post("/img2pose/")
async def img2pose(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "pose",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img2depth/")
async def img2depth(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "depth",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img2normal/")
async def img2normal(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "normal",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img2edge/")
async def img2edge(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "hed",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img2seg/")
async def img2seg(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "seg",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img2sketch/")
async def img2sketch(request: ImageMiscRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": "",
            "structure": "scribble",
            "return_reference_image": True,
            "steps": 1
        }
    )
    return {"image_output": output[0]}

@router.post("/img23d/")
def img23d(request: ShapeEImgRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "cjwbw/shap-e:5957069d5c509126a73c7cb68abcddbb985aeefa4d318e7c63ec1352ce6da68c",
        input={
            "image": file,
            "guidance_scale": request.guidance_scale,
            "save_mesh": True
        }
    )
    return {"3d_output": output[1]}

@router.post("/face2emotion/")
async def face2emotion(request: RMNRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "phamquiluan/facial-expression-recognition:b16694d5bfed43612f1bfad7015cf2b7883b732651c383fe174d4b7783775ff5",
        input={"input_path": file}
    )
    return {"text_output": output[0]["emo_label"]}

@router.post("/face2stylizedface/")
async def face2stylizedface(request: StyleCLIPRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "orpatashnik/styleclip:7af9a66f36f97fee2fece7dcc927551a951f0022cbdd23747b9212f23fc17021",
        input={
            "input": file,
            "neutral": "a face",
            "target": request.prompt,
            "manipulation_strength": request.manipulation_strength
        }
    )
    return {"image_output": output}

@router.post("/face2talkinghead/")
async def face2talkinghead(request: SadTalkerRequest):
    image_file = request.source_image if is_url(request.source_image) else open(request.source_image, "rb")
    audio_file = request.driven_audio if is_url(request.driven_audio) else open(request.driven_audio, "rb")
    output = replicate.run(
        "cjwbw/sadtalker:3aa3dac9353cc4d6bd62a8f95957bd844003b401ca4e4a9b33baa574c549d376",
        input={
            "source_image": image_file,
            "driven_audio": audio_file,
            "still": True
        }
    )
    return {"video_output": output} 