import { Modality } from '../types'

export const modalityColors: Record<Modality, string> = {
  [Modality.Text]: '#D8FDDF',
  [Modality.Image]: '#E0FFFD',
  [Modality.Video]: '#D1D1FE',
  [Modality.ThreeDimentional]: '#F9DEFF',
  [Modality.Audio]: '#FFD1D1',
  [Modality.Sketch]: '#FBFFDF',
  // [Modality.Prompts]: '#F5F5F5',
  [Modality.Custom]: '#FFFFFF',
}
