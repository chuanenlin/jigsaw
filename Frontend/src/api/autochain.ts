import { RequestHandler, makeApiCall } from './api'
import { AutoChainRequest, AutoChainResponse } from './types'
import { Endpoint } from '../constants'

export const makeAutoChainCall: RequestHandler<
  AutoChainRequest,
  { Autochain: { logs: Array<string>; json: string } }
> = async (requestBody) => makeApiCall('autochain', requestBody)

export const getAutoChain = async (task: string) => {
  // const { Autochain } = await makeAutoChainCall({ task })
  //
  // return {
  //   // eslint-disable-next-line camelcase
  //   autochain_output: {
  //     chain: JSON.parse(Autochain.json),
  //     parameters: {},
  //   },
  // }
  return getDummyAutoChain()
}

const getDummyAutoChain = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return dummyAutoChainResponse
}

const dummyAutoChainResponse: AutoChainResponse = {
  // eslint-disable-next-line camelcase
  autochain_output: {
    parameters: {},
    chain: [
      {
        id: 'block1',
        type: 'image_input',
      },
      {
        id: 'block2',
        type: Endpoint.Image2Text,
        inputs: {
          Image: 'block1',
        },
      },
      {
        id: 'block3',
        type: Endpoint.Text2Text,
        inputs: {
          Text: 'block2',
        },
      },
      {
        id: 'block4',
        type: Endpoint.Text2Audio,
        inputs: {
          Text: 'block3',
        },
      },
    ],
  },
}
