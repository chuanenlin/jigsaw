import { Block, Modality } from '../../types'
import { image2BoxBlock } from './image2box'
import { image2VideoBlock } from './image2video'
import { image2CutoutBlock } from './image2cutout'
import { image2GoodFaceImageBlock } from './image2goodFace'
import { image2SuperImageBlock } from './image2superImage'
import { image2TextBlock } from './image2text'
import { imageGray2ImageColorBlock } from './imageGray2imageColor'
import { music2TextBlock } from './music2text'
import { speech2TextBlock } from './speech2text'
import { text23dBlock } from './text23d'
import { text2AudioBlock } from './text2audio'
import { text2ImageBlock } from './text2image'
import { text2MusicBlock } from './text2music'
import { text2TextBlock } from './text2text'
import { text2VideoBlock } from './text2video'
import { text2SpeechBlock } from './text2speech'
import { image2TagsBlock } from './image2tags'
import { imageColor2ImageGrayBlock } from './imageColor2imageGray'
import { image2CharacterBlock } from './image2character'
import { image2NoPeopleImageBlock } from './image2noPeopleImage'
import { image2PoseBlock } from './image2pose'
import { image2DepthBlock } from './image2depth'
import { image2NormalBlock } from './image2normal'
import { image2EdgeBlock } from './image2edge'
import { image2SegBlock } from './image2seg'
import { image23dBlock } from './image23d'
import { video2TextBlock } from './video2text'
import { video2SuperVideoBlock } from './video2superVideo'
import { video2SmoothVideoBlock } from './video2smoothVideo'
import { video2CutoutBlock } from './video2cutout'
import { imageandText2ImageBlock } from './imageandtext2image'
import { textandPose2ImageBlock } from './textandpose2image'
import { textAndSeg2ImageBlock } from './textandseg2image'
import { textAndDepth2ImageBlock } from './textanddepth2image'
import { textAndNormal2ImageBlock } from './textandnormal2image'
import { textAndEdge2ImageBlock } from './textandedge2image'
import { textAndSketch2ImageBlock } from './textandsketch2image'
import { textAndSketch2ArtBlock } from './textandsketch2art'
import { OnlyAudioParams } from './common/OnlyAudio.params'
import { OnlyImageParams, OnlyPromptParams, OnlyVideoParams } from './common'
import { Text2TextParams } from './text2text/text2text.params'
import { Text2ImageParams } from './text2image/text2image.params'
import { Text2VideoParams } from './text2video/text2video.params'
import { Text23dParams } from './text23d/text23d.params'
import { Text2AudioParams } from './text2audio/text2audio.params'
import { Text2MusicParams } from './text2music/text2music.params'
import { Image2SuperImageParams } from './image2superImage/image2superImage.params'
import { Image2GoodFaceImageParams } from './image2goodFace/image2goodFaceImage.params'
import { Image2BoxParams } from './image2box/image2box.params'
import { Image2VideoParams } from './image2video/image2video.params'
import { Music2TextParams } from './music2text/music2text.params'
import { Speech2TextParams } from './speech2text/speech2text.params'
import { Image23dParams } from './image23d/image23d.params'
import { Video2SmoothVideoParams } from './video2smoothVideo/video2smoothVideo.params'
import { ImageAndText2ImageParams } from './imageandtext2image/imageandtext2image.params'
import { TextAndPose2ImageParams } from './textandpose2image/textandpose2image.params'
import { TextAndSeg2ImageParams } from './textandseg2image/textandseg2image.params'
import { TextAndDepth2ImageParams } from './textanddepth2image/textanddepth2image.params'
import { TextAndNormal2ImageParams } from './textandnormal2image/textandnormal2image.params'
import { TextAndEdge2ImageParams } from './textandedge2image/textandedge2image.params'
import { TextAndSketch2ImageParams } from './textandsketch2image/textandsketch2image.params'
import { TextAndSketch2ArtParams } from './textandsketch2art/textandsketch2art.params'
import { makeNameSuitableForCss } from '../../utils'
import { speechSpeech2SpeechBlock } from './speechSpeech2speech'
import { face2TalkingHeadBlock } from './face2TalkingHead'

const getModalityInputName = (modality: Modality): string => {
  switch (modality) {
    case Modality.Audio:
      return 'Upload audio'
    case Modality.Custom:
      return 'Custom'
    case Modality.Image:
      return 'Upload image'
    case Modality.Sketch:
      return 'Draw doodle'
    case Modality.Text:
      return 'Write text'
    case Modality.ThreeDimentional:
      return 'Upload 3D model'
    case Modality.Video:
      return 'Upload video'
    default:
      return ''
  }
}

export const inputBlocks: Array<Block> = Object.values(Modality).map((modality) => ({
  id: `${makeNameSuitableForCss(modality)}-input`,
  name: getModalityInputName(modality),
  inputModality: [{ modality }],
  outputModality: modality,
  blockType: 'input',
}))

export const outputBlocks: Array<Block> = Object.values(Modality).map((modality) => ({
  id: `${modality}-output`,
  name: `${modality} output`,
  inputModality: [{ modality }],
  outputModality: modality,
  blockType: 'output',
}))

export type BlockParams =
  | OnlyAudioParams
  | OnlyImageParams
  | OnlyPromptParams
  | OnlyVideoParams
  | Text2TextParams
  | Text2ImageParams
  | Text2VideoParams
  | Text23dParams
  | Text2AudioParams
  | Text2MusicParams
  | Image2SuperImageParams
  | Image2GoodFaceImageParams
  | Image2BoxParams
  | Image2VideoParams
  | Music2TextParams
  | Speech2TextParams
  | Image23dParams
  | Video2SmoothVideoParams
  | ImageAndText2ImageParams
  | TextAndPose2ImageParams
  | TextAndSeg2ImageParams
  | TextAndDepth2ImageParams
  | TextAndNormal2ImageParams
  | TextAndEdge2ImageParams
  | TextAndSketch2ImageParams
  | TextAndSketch2ArtParams

export const blocksList: Array<Block> = [
  ...inputBlocks,
  // ...outputBlocks, // for some reason cannot hide the output nudge
  text2TextBlock,
  text2ImageBlock,
  text2VideoBlock,
  text23dBlock,
  text2AudioBlock,
  text2MusicBlock,
  image2TextBlock,
  image2SuperImageBlock,
  image2GoodFaceImageBlock,
  imageGray2ImageColorBlock,
  image2CutoutBlock,
  image2BoxBlock,
  image2VideoBlock,
  music2TextBlock,
  speech2TextBlock,
  text2SpeechBlock,
  image2TagsBlock,
  imageColor2ImageGrayBlock,
  image2CharacterBlock,
  image2NoPeopleImageBlock,
  image2PoseBlock,
  image2DepthBlock,
  image2NormalBlock,
  image2EdgeBlock,
  image2SegBlock,
  image23dBlock,
  video2TextBlock,
  video2SuperVideoBlock,
  video2SmoothVideoBlock,
  video2CutoutBlock,
  imageandText2ImageBlock,
  textandPose2ImageBlock,
  textAndSeg2ImageBlock,
  textAndDepth2ImageBlock,
  textAndNormal2ImageBlock,
  textAndEdge2ImageBlock,
  textAndSketch2ImageBlock,
  textAndSketch2ArtBlock,
  speechSpeech2SpeechBlock,
  face2TalkingHeadBlock,
]
