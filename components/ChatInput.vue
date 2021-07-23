<template>
  <v-text-field
    class="chat_input"
    v-model="chat.content"
    label="Message..."
    outlined
    :append-icon="chat.content.length > 0 ? 'mdi-send' : ''"
    @click:append="send"
  />
</template>

<script>

export default {
  data: () => ({
    chat:{
     content: ''
    }
  }),
  methods: {
    send() {
      console.log('send it!')
    },
  },
}
</script>

<style scoped>
.chat_input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
}
</style>
