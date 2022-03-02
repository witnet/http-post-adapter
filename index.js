import 'dotenv/config'

import { URL } from 'url'

import got from 'got'
import micro, { createError } from 'micro'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const PORT = parseInt(process.env.PORT || '3000')
const REQUEST_PER_DURATION = parseInt(process.env.REQUEST_PER_DURATION || '3')
const RATE_LIMIT_DURATION = parseInt(process.env.RATE_LIMIT_DURATION || '1')

const rateLimiter = new RateLimiterMemory({
  points: REQUEST_PER_DURATION,
  duration: RATE_LIMIT_DURATION
})

const server = micro(async (req, res) => {
  const key = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  // Avoid multiple request from the same origin
  try {
    await rateLimiter.consume(key, 1)
  } catch (e) {
    throw createError(429, 'Rate limit exceeded')
  }

  // Parse URL parameters
  const url = new URL('http://localhost' + req.url)
  const endpoint = url.searchParams.get('endpoint')
  const dataParam = url.searchParams.get('data')
  if (!endpoint || !url) {
    const missingParams = []
    if (!endpoint) missingParams.push('endpoint')
    if (!dataParam) missingParams.push('data')
    throw createError(400, `the following params are missing: ${missingParams}`)
  }
  try {
    const { data } = await got
      .post(endpoint, {
        json: JSON.parse(dataParam)
      })
      .json()

    return data
  } catch (e) {
    throw createError(500, 'Error running your HTTP-POST request. Ensure that the provided params are valid')
  }
})

server.listen(PORT)
console.log(`Server listing on localhost:${PORT}`)
