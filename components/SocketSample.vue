<template>
  <v-container align="center" justify="center">
    <div>
      <input v-model="roomId" placeholder="username" type="text"/>
    </div>
    <div>
      <input v-model="message.content" placeholder="content" type="text"/>
    </div>
    <v-btn @click="sendMessage">Add Message</v-btn>
    <div>{{ message }}</div>

    <v-btn @click="login">Login</v-btn>
    <!--    <button @click="connectToSocket">Try to Connect</button>-->
    <v-btn @click="join">Join</v-btn>
    <v-btn @click="subscribe">Subscribe</v-btn>
  </v-container>
</template>

<script>

export default {
  name: 'SocketSample',
  data: () => ({
    roomId: '60e48c3c3537533fe574565c',
    Authorization: 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2MGU0OGJjNDM1Mzc1MzNmZTU3NDU2NWIiLCJpYXQiOjE2MjU1OTA3NTJ9.a3XsGJy7tZp01RgLmEUQkQ1q60QTI2AJnFmYrdO9k7FOML2LI4aAxxoNnvip_q1g'
    , message: {
      content: 'hellloooooooo',
    },
    chats: []
  }),
  methods: {
    sendMessage() {
      this.$stomp.send(`/app/room/${this.roomId}/addPublicChat`, JSON.stringify(this.message), {})
    },
    login() {
      this.axios.post('http://localhost:8080/api/v1/users/login', {
        username: 'mohsen',
        password: '123'
      }).then(res => console.log(res))
        .catch(err => console.log(err))
    },
    join() {
      this.$stomp.send(`/app/room/${this.roomId}/joinRoom`, null, {})
    },
    subscribe() {
      // /channel/room/%s/publicChats
      this.$stomp.subscribe(`/topic/room/${this.roomId}/publicChats`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })

      this.$stomp.subscribe(`/topic/room/${this.roomId}/users`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })
    },
    connectToSocket() {

      const authorization = this.Authorization
      const headers = {
        token: authorization
      }
      this.$stomp.connect(headers, (frame) => {
        console.log('connected')

        console.log('Frame:')
        console.log(frame)

      }, () => console.log('************ Disconnected -_- ***************'))
    }
  },
  created() {
    this.connectToSocket()
  }
}
</script>
