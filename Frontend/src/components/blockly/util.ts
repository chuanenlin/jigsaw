export const extractBlockRuntimeValueAndUnit = (inputString?: string) => {
  const defaultValue = { runtime: Number.MAX_SAFE_INTEGER, unit: 's' }

  if (!inputString) {
    return defaultValue
  }

  const pattern = /^(\d+)([smh])$/
  const match = inputString.match(pattern)

  if (match) {
    const runtime = parseInt(match[1])
    const unit = match[2]

    return { runtime, unit }
  }

  return defaultValue
}
