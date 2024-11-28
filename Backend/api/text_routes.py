from fastapi import APIRouter
from openai import OpenAI
import replicate
from models.schemas import (
    GPTRequest, SDXLRequest, AnimateDiffRequest, ShapeERequest,
    AudiogenRequest, MusicGenRequest, BarkRequest
)

router = APIRouter()

@router.post("/text2text/")
def text2text(request: GPTRequest):
    client = OpenAI()
    if request.mode == "Translation":
        completion = client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Transform {request.prompt} into a prompt for DALL-E image generation."},
            ]
        )
        output = completion.choices[0].message.content
        output = output.removeprefix('"').removeprefix('Generate an image of ').removeprefix('Design an image of ').removesuffix('"').removesuffix('.')
    elif request.mode == "Ideation":
        completion = client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Generate an idea for {request.prompt} based on {request.task_detail}. Answer in one short sentence."},
            ]
        )
        output = completion.choices[0].message.content
    else:
        completion = client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Given {request.prompt}, {request.task_detail}. Answer in one short sentence."},
            ]
        )
        output = completion.choices[0].message.content
    return {"text_output": output}

@router.post("/text2img/")
def text2img(request: SDXLRequest):
    output = replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input={
            "prompt": request.prompt,
            "num_inference_steps": request.num_inference_steps,
            "guidance_scale": request.guidance_scale,
            "width": request.width,
            "height": request.height,
            "seed": request.seed,
            "apply_watermark": False,
            "refine": "expert_ensemble_refiner",
            "scheduler": "DDIM",
            "lora_scale": 0.6,
            "num_outputs": 1,
            "high_noise_frac": 0.8,
            "prompt_strength": 0.8
        }
    )
    return {"image_output": output[0]}

@router.post("/text2video/")
def text2video(request: AnimateDiffRequest):
    output = replicate.run(
        "lucataco/animate-diff:1531004ee4c98894ab11f8a4ce6206099e732c1da15121987a8eef54828f0663",
        input={
            "motion_module": "mm_sd_v15",
            "path": "lyriel_v16.safetensors",
            "prompt": request.prompt,
            "n_prompt": "badhandv4, easynegative, ng_deepnegative_v1_75t, verybadimagenegative_v1.3, bad-artist, bad_prompt_version2-neg",
            "steps": request.steps,
            "guidance_scale": request.guidance_scale,
            "seed": request.seed
        }
    )
    return {"video_output": output}

@router.post("/text23d/")
def text23d(request: ShapeERequest):
    output = replicate.run(
        "cjwbw/shap-e:5957069d5c509126a73c7cb68abcddbb985aeefa4d318e7c63ec1352ce6da68c",
        input={
            "prompt": request.prompt,
            "guidance_scale": request.guidance_scale,
            "save_mesh": True,
            "render_size": 64
        }
    )
    return {"3d_output": output[1]}

@router.post("/text2audio/")
def text2audio(request: AudiogenRequest):
    output = replicate.run(
        "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8",
        input={
            "prompt": request.prompt,
            "duration": request.duration,
            "classifier_free_guidance": request.guidance,
            "output_format": "mp3"
        }
    )
    return {"audio_output": output}

@router.post("/text2music/")
def text2music(request: MusicGenRequest):
    output = replicate.run(
        "facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
        input={
            "prompt": request.prompt,
            "model_version": request.model_version,
            "duration": request.duration,
            "output_format": "wav",
            "seed": request.seed
        }
    )
    return {"audio_output": output}

@router.post("/text2speech/")
def text2speech(request: BarkRequest):
    output = replicate.run(
        "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
        input={"prompt": request.prompt}
    )
    return {"audio_output": output["audio_out"]} 