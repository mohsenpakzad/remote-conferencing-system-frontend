<template>
  <v-row
    justify="center"
    no-gutters
  >

    <p
      v-if="chat.type === 'SYSTEM'"
      class="text-center font-italic system"
    >
      {{ chat.content }}
    </p>

    <v-col
      v-else
      class="msg-wrapper"
    >

        <v-row
          v-if="checkValidityOfChat"
          no-gutters
          justify="space-between"
          class="msg"
          :class="userId === chat.senderRole.user.id ? 'isOwner' : ''"
        >

          <v-col>
            <span v-if="checkValidityOfChat" class="font-weight-bold">{{ chat.senderRole.user.username }}</span>
            <p class="mb-0">
              {{ chat.content }}
            </p>
          </v-col>

          <v-col cols="auto">
            <span class="msg__date ml-3">{{ chat.createdDate }}</span>
          </v-col>
          <v-col v-if="checkValidityOfChat" cols="auto">
            <v-menu
              bottom
              open-on-click
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-dots-horizontal
                </v-icon>
              </template>

              <v-list>
                <v-list-item v-if="chatInput.length > 0" @click="editItem">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteItem">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-col>
        </v-row>
    </v-col>

  </v-row>
</template>

<script>
import vuexStates from '../mixins/vuexStates'

export default {
  props: {
    chat: {
      type: Object,
      default: () => ({
        createdDate: '',
        senderRole: {
          user: {
            username: ''
          }
        }
      }),
    },
  },
  mixins: [vuexStates],
  computed: {
    checkValidityOfChat() {
      return this.chat.senderRole && this.chat.senderRole.user
    },
  },
  methods:{
    editItem(){
      const payload = {
        content: this.chatInput
      }
      this.$stomp.publish({
        destination: `/app/public-chat/${this.chat.id}/updatePublicChat`,
        body: JSON.stringify(payload)
      })
      this.chatInput = ''
    },
    deleteItem(){
      this.$stomp.publish({
        destination: `/app/public-chat/${this.chat.id}/deletePublicChat`
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;

  p {
    margin-bottom: 1rem;
  }
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 5px;
  background: #fff;
  color: #000;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__date {
    text-decoration: underline;
  }
}

.isOwner {
  background: #effdde;
  color: #000;
  align-self: flex-end;
}

@media (max-width: 400px) {
  .msg {
    width: 90%;
  }
}
</style>
