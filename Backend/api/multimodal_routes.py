from fastapi import APIRouter
import replicate
from utils.helpers import is_url
from models.schemas import (
    InstructPix2PixRequest, ControlNetPoseRequest, ControlNetSegRequest,
    ControlNetDepthRequest, ControlNetNormalRequest, ControlNetEdgeRequest,
    ControlNetSketchRequest, ScribbleStoriesRequest
)

router = APIRouter()

@router.post("/imgandtext2img/")
async def imgandtext2img(request: InstructPix2PixRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
        input={
            "image": file,
            "prompt": request.prompt,
            "num_inference_steps": request.num_inference_steps,
            "guidance_scale": request.guidance_scale,
            "seed": request.seed
        }
    )
    return {"image_output": output[0]}

@router.post("/textandpose2img/")
async def textandpose2img(request: ControlNetPoseRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "pose",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textandseg2img/")
async def textandseg2img(request: ControlNetSegRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "seg",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textanddepth2img/")
async def textanddepth2img(request: ControlNetDepthRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "depth",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textandnormal2img/")
async def textandnormal2img(request: ControlNetNormalRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "normal",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textandedge2img/")
async def textandedge2img(request: ControlNetEdgeRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "hed",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textandsketch2img/")
async def textandsketch2img(request: ControlNetSketchRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        input={
            "image": file,
            "prompt": request.prompt,
            "structure": "scribble",
            "return_reference_image": False,
            "seed": request.seed
        }
    )
    return {"image_output": output}

@router.post("/textandsketch2art/")
async def textandsketch2art(request: ScribbleStoriesRequest):
    file = request.image if is_url(request.image) else open(request.image, "rb")
    output = replicate.run(
        "nevernotsean/scribble-stories:c1f1f32ea543c5b6a8f3968f167ce02aff1e27cd25c1234f49c5bc15e556b19d",
        input={
            "image": file,
            "prompt": request.prompt,
            "num_inference_steps": request.num_inference_steps,
            "guidance_scale": request.guidance_scale,
            "seed": request.seed,
            "invert_colors": True,
            "remove_background": True
        }
    )
    return {"image_output": output} 