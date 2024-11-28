import { RequestHandler, makeApiCall } from './api'
import { BlockSearchRequest, BlockSearchResponse } from './types'

export const makeBlockSearchCall: RequestHandler<BlockSearchRequest, BlockSearchResponse> = async (
  requestBody,
) => makeApiCall('semantic_search', requestBody)

export const getBlockSearchList = async (searchPhrase: string) =>
  makeBlockSearchCall({ task: searchPhrase })
