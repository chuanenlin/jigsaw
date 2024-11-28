import { OnlyImageParams, OnlyPromptParams, OnlyVideoParams } from '../constants/block-list/common'
import { Text2ImageParams } from '../constants/block-list/text2image/text2image.params'
import { Text2TextParams } from '../constants/block-list/text2text/text2text.params'
import { BlockProcessInputs, ProcessableBlock } from '../context/WorkspaceContext'
import { Modality } from '../types'
import { makeApiCall } from './api'
import { A3dResponse, AudioResponse, ImageResponse, TextResponse, VideoResponse } from './types'
import { Text2VideoParams } from '../constants/block-list/text2video/text2video.params'
import { Text23dParams } from '../constants/block-list/text23d/text23d.params'
import { Text2AudioParams } from '../constants/block-list/text2audio/text2audio.params'
import { Text2MusicParams } from '../constants/block-list/text2music/text2music.params'
import { OnlyAudioParams } from '../constants/block-list/common/OnlyAudio.params'
import { Endpoint } from '../constants'
import { TextAndPose2ImageParams } from '../constants/block-list/textandpose2image/textandpose2image.params'
import { TextAndSeg2ImageParams } from '../constants/block-list/textandseg2image/textandseg2image.params'
import { TextAndDepth2ImageParams } from '../constants/block-list/textanddepth2image/textanddepth2image.params'
import { TextAndNormal2ImageParams } from '../constants/block-list/textandnormal2image/textandnormal2image.params'
import { TextAndEdge2ImageParams } from '../constants/block-list/textandedge2image/textandedge2image.params'
import { TextAndSketch2ArtParams } from '../constants/block-list/textandsketch2art/textandsketch2art.params'
import { TextAndSketch2ImageParams } from '../constants/block-list/textandsketch2image/textandsketch2image.params'
import { Image2VideoParams } from '../constants/block-list/image2video/image2video.params'
import { Image23dParams } from '../constants/block-list/image23d/image23d.params'
import { ImageAndText2ImageParams } from '../constants/block-list/imageandtext2image/imageandtext2image.params'
import { Video2SmoothVideoParams } from '../constants/block-list/video2smoothVideo/video2smoothVideo.params'
import { SpeechSpeech2SpeechParams } from '../constants/block-list/speechSpeech2speech'
import { getOutputFromResponse } from '../components/input-output'
import { Face2TalkingHeadParams } from '../constants/block-list/face2TalkingHead'
import { uploadFile } from './upload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blockRequestProcessors = {
  [Endpoint.Text2Text]: async (params: Text2TextParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Text2Text, params),
  [Endpoint.Text2Img]: async (params: Text2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Text2Img, params),
  [Endpoint.Text2Video]: async (params: Text2VideoParams): Promise<VideoResponse> =>
    makeApiCall(Endpoint.Text2Video, params),
  [Endpoint.Text23D]: async (params: Text23dParams): Promise<A3dResponse> =>
    makeApiCall(Endpoint.Text23D, params),
  [Endpoint.Text2Audio]: async (params: Text2AudioParams): Promise<AudioResponse> =>
    makeApiCall(Endpoint.Text2Audio, params),
  [Endpoint.Text2Music]: async (params: Text2MusicParams): Promise<AudioResponse> =>
    makeApiCall(Endpoint.Text2Music, params),
  [Endpoint.Image2Text]: async (params: OnlyImageParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Image2Text, params),
  [Endpoint.Image2SuperImage]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2SuperImage, params),
  [Endpoint.Image2GoodFaceImage]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2GoodFaceImage, params),
  [Endpoint.ImageGray2ImageColor]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.ImageGray2ImageColor, params),
  [Endpoint.Image2Cutout]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Cutout, params),
  [Endpoint.Image2Box]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Box, params),
  [Endpoint.Image2Video]: async (params: Image2VideoParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Video, params),
  [Endpoint.Music2Text]: async (params: OnlyAudioParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Music2Text, params),
  [Endpoint.Speech2Text]: async (params: OnlyAudioParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Speech2Text, params),
  [Endpoint.Text2Speech]: async (params: OnlyPromptParams): Promise<AudioResponse> =>
    makeApiCall(Endpoint.Text2Speech, params),
  [Endpoint.TextAndPose2Image]: async (params: TextAndPose2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.TextAndPose2Image, params),
  [Endpoint.TextAndSeg2Image]: async (params: TextAndSeg2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.TextAndSeg2Image, params),
  [Endpoint.TextAndDepth2Image]: async (params: TextAndDepth2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.TextAndDepth2Image, params),
  [Endpoint.TextAndNormal2Image]: async (
    params: TextAndNormal2ImageParams,
  ): Promise<ImageResponse> => makeApiCall(Endpoint.TextAndNormal2Image, params),
  [Endpoint.TextAndEdge2Image]: async (params: TextAndEdge2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.TextAndEdge2Image, params),
  [Endpoint.TextAndSketch2Image]: async (
    params: TextAndSketch2ImageParams,
  ): Promise<ImageResponse> => makeApiCall(Endpoint.TextAndSketch2Image, params),
  [Endpoint.TextAndSketch2Art]: async (params: TextAndSketch2ArtParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.TextAndSketch2Art, params),
  [Endpoint.Image2Character]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Character, params),
  [Endpoint.Image2Tags]: async (params: OnlyImageParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Image2Tags, params),
  [Endpoint.Image2NoPeopleImage]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2NoPeopleImage, params),
  [Endpoint.Image2Pose]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Pose, params),
  [Endpoint.Image2Depth]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Depth, params),
  [Endpoint.Image2Normal]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Normal, params),
  [Endpoint.Image2Edge]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Edge, params),
  [Endpoint.Image2Seg]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.Image2Seg, params),
  [Endpoint.Image23d]: async (params: Image23dParams): Promise<A3dResponse> =>
    makeApiCall(Endpoint.Image23d, params),
  [Endpoint.ImageColor2ImageGray]: async (params: OnlyImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.ImageColor2ImageGray, params),
  [Endpoint.ImageAndText2Image]: async (params: ImageAndText2ImageParams): Promise<ImageResponse> =>
    makeApiCall(Endpoint.ImageAndText2Image, params),
  [Endpoint.Video2Text]: async (params: OnlyVideoParams): Promise<TextResponse> =>
    makeApiCall(Endpoint.Video2Text, params),
  [Endpoint.Video2SuperVideo]: async (params: OnlyVideoParams): Promise<VideoResponse> =>
    makeApiCall(Endpoint.Video2SuperVideo, params),
  [Endpoint.Video2SmoothVideo]: async (params: Video2SmoothVideoParams): Promise<VideoResponse> =>
    makeApiCall(Endpoint.Video2SmoothVideo, params),
  [Endpoint.Video2Cutout]: async (params: OnlyVideoParams): Promise<VideoResponse> =>
    makeApiCall(Endpoint.Video2Cutout, params),
  [Endpoint.SpeechSpeech2Speech]: async (
    params: SpeechSpeech2SpeechParams,
  ): Promise<AudioResponse> => makeApiCall(Endpoint.SpeechSpeech2Speech, params),
  [Endpoint.Face2TalkingHead]: async (params: Face2TalkingHeadParams): Promise<AudioResponse> =>
    makeApiCall(Endpoint.Face2TalkingHead, params),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFileUploadObject = (value: any) =>
  value.content && typeof value.content === 'string' && value.content.startsWith('blob:')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformParam = (value: any, key: string) => {
  if (isFileUploadObject(value)) {
    return uploadFile(value, value.type)
  }

  return value
}

/**
 * Generate the params for the block.
 * The params are generated based on the block's inputs and the blocks params itself.
 * This is required to get the input from the previous block and pass it to the current block.
 * For example, text2iage block requires the prompt from the text2text block but the prompt is not
 * part of the block's params.
 * @params block - The block to generate the params for
 * @returns -
 */
export const generateBlockParams = (block: ProcessableBlock) => {
  let params = { ...block.blockData.blockParameters?.model }
  if (block.inputs?.[Modality.Text]) {
    params = { ...params, prompt: (block.inputs[Modality.Text] as TextResponse).text_output }
  }

  if (block.inputs?.[Modality.Image]) {
    params = { ...params, image: (block.inputs[Modality.Image] as ImageResponse).image_output }
  }

  /**
   * Get inputs that have aliases (multiple inputs with same modality)
   */
  if (Object.keys(block.inputs ?? {}).some((key) => !Object.keys(Modality).includes(key))) {
    params = {
      ...params,
      ...getInputValues(block.inputs),
    }
  }

  // TODO: handle other modalities
  // ....

  // TODO: fix type issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return params as any
}

const getInputValues = (inputs?: BlockProcessInputs) => {
  const inputValues: Record<string, unknown> = {}
  Object.entries(inputs ?? {}).forEach(([key, value]) => {
    inputValues[key] = getOutputFromResponse(value)
  })

  return inputValues
}
