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

    <v-btn class="mr-1" @click="join">Join</v-btn>
    <v-btn class="mr-1" @click="subscribe">Subscribe Events</v-btn>
    <v-btn @click="sendMessage">Add Message</v-btn>

  </v-container>
</template>

<script>

import { Client } from '@stomp/stompjs'
import Sockjs from 'sockjs-client'

let client

export default {
  name: 'SocketSample',
  data: () => ({
    roomId: '6100a7d140fb0616b9f01917', // !!!!!!!!FILL THIS WITH YOUR OWN ROOM ID!!!!!!!!
    message: {
      content: 'Hellllllooo',
    },
    chats: []
  }),
  methods: {
    sendMessage() {
      client.publish({
        destination:`/app/room/${this.roomId}/addPublicChat`,
        body: JSON.stringify(this.message)
      })
    },
    join() {
      client.publish({
        destination:`/app/room/${this.roomId}/joinRoom`
      })
    },
    subscribe() {
      client.subscribe(`/topic/room/${this.roomId}/publicChats`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('Public chat cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })
      client.subscribe(`/topic/room/${this.roomId}/users`, (payload) => {
        const message = JSON.parse(payload.body)
        console.log('User cuuuuuuuuuuuuuuuummmmmmmmmmmmming')
        console.log(message)
      })
    },
  },
  created() {
    // const socket = new Sockjs('http://localhost:8080/ws');
    // client = Stomp.over(socket)

    const connectHeaders = {
      token: this.$store.getters.apiToken
    }
    client = new Client({
      connectHeaders,
    })
    client.webSocketFactory = function () {
      return new Sockjs('http://localhost:8080/ws')
    };

    client.activate()
  }
}
</script>
