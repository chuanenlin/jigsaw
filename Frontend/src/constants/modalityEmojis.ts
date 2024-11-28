import { Modality } from '../types'

export const modalityEmojis: Record<Modality, string> = {
  [Modality.Text]: '🔤',
  [Modality.Image]: '🖼️',
  [Modality.Video]: '🎞️',
  [Modality.ThreeDimentional]: '🧱',
  [Modality.Audio]: '🔊',
  [Modality.Sketch]: '🖌️',
  // [Modality.Prompts]: '#F5F5F5',
  [Modality.Custom]: '⚙️',
}
