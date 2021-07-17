<template>
  <v-container fluid>

    <v-text-field
      v-model="roomId"
      type="text"
      label="Room Id"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="message.content"
      type="text"
      label="Message Content"
      outlined
    ></v-text-field>

    <p>Message: {{ message }}</p>

    <v-btn class="mr-1" @click="join">Join And Subscribe</v-btn>
    <v-btn @click="sendMessage">Add Message</v-btn>

  </v-container>
</template>

<script>

export default {
  name: 'SocketSample',
  data: () => ({
    roomId: '60e48c3c3537533fe574565c', // !!!!!!!!FILL THIS WITH YOUR OWN ROOM ID!!!!!!!!
    message: {
      content: 'Hellllllooo',
    },
    chats: []
  }),
  methods: {
    sendMessage() {
      this.$stomp.send(`/app/room/${this.roomId}/addPublicChat`, JSON.stringify(this.message), {})
    },
    join() {
      this.$stomp.send(`/app/room/${this.roomId}/joinRoom`, null, {})
      this.subscribe()
    },
    subscribe() {
      this.$stomp.subscribe(`/topic/room/${this.roomId}/publicChats`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('Public chat cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })
      this.$stomp.subscribe(`/topic/room/${this.roomId}/users`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('User cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })
    },
    connectToSocket() {
      const headers = {
        token: this.$store.getters.apiToken
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
