<template>
  <v-container fluid class="mt-3">

    <chat-item
      v-for="chat in chats"
      :key="chat.id"
      :chat="chat"
      :isOwner="chat.isOwner"
    ></chat-item>

    <chat-input></chat-input>

  </v-container>
</template>

<script>
import ChatItem from '../../components/ChatItem'
import ChatInput from '../../components/ChatInput'
import SocketSample from '../../components/SocketSample'

export default {
  name: 'chat',
  components: {
    ChatItem,
    ChatInput,
    SocketSample
  },
  data: () => ({
    chats: [
      {id: 1, content: 'Hello guys!', isOwner: false, time: '7:15 PM'},
      {id: 2, content: 'Oh hello, welcome', isOwner: true, time: '7:20 PM'},
      {id: 3, content: 'Hello man, nice to meet you', isOwner: false, time: '11:30 PM'},
    ]
  })
}
</script>
