import * as functions from 'firebase-functions'
import { SLACK_WEBHOOK_URI } from './slack.ts'
const request = require('request')

export const checkSensor = functions.runWith({ memory: '128MB', timeoutSeconds: 10 }).database.ref('/sensors/current/{time}')
  .onCreate((snapshot, context) => {
    const value = snapshot.val()
    const maxValue = Math.max(...value)
    if (maxValue >= 0.5) {
      const message = `【地震計】震度${maxValue} (${context.params.time})`
      const options = {
        url: SLACK_WEBHOOK_URI,
        form: `payload={ "text": "${message}" }`,
        json: true
      }
      request.post(options)
    }
    return 1
  })
