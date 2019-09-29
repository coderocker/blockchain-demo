const PubNub = require('pubnub')

const credentials = {
  publishKey: 'pub-c-031c2257-9b08-47a1-9873-007fd1655959',
  subscribeKey: 'sub-c-05dbb5ce-e2c7-11e9-afc7-46ac3f2c706c',
  secretKey: 'sec-c-ZjdjN2FiODItZTc3Ni00NjM0LTkwOTQtNzNhOGI4YTkwNjRh'
}

const CHANNELS = {
  TEST: 'TEST'
}

class PubSub {
  constructor () {
    this.pubnub = new PubNub(credentials)

    this.pubnub.subscribe({
      channels: Object.values(CHANNELS)
    })
    this.pubnub.addListener(this.listener)
  }

  listener () {
    return {
      message: messageObject => {
        const { channel, message } = messageObject
        console.log(
          `Message received. Channel: ${channel}, Message: ${message}`
        )
      }
    }
  }

  publish ({ channel, message }) {
    this.pubnub.publish({ channel, message })
  }
}
const testPubSub = new PubSub()
testPubSub.publish({ channel: CHANNELS.TEST, message: 'Hello Pubnub' })
module.exports = PubSub
