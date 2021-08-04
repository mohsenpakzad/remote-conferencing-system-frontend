<template>
  <v-text-field
    class="chat_input"
    v-model="chatInput"
    label="Message..."
    outlined
    :append-icon="chatInput.length > 0 ? 'mdi-send' : ''"
    @click:append="send"
  />
</template>

<script>
import vuexStates from '../mixins/vuexStates'

export default {
  data: () => ({
  }),
  mixins: [vuexStates],
  methods: {
    send() {
      const payload = {
        content: this.chatInput
      }
      this.$stomp.publish({
        destination: `/app/room/${this.joinedRoomId}/addPublicChat`,
        body: JSON.stringify(payload)
      })
      this.chatInput = ''
    },
  },
}
</script>

<style scoped>
.chat_input {
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
}
</style>
