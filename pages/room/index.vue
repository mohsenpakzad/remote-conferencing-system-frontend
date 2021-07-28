<template>
  <v-container fluid class="mt-3 mb-13">

    <chat-item
      v-for="chat in chats"
      :key="chat.id"
      :chat="chat"
    ></chat-item>

  </v-container>
</template>

<script>
import ChatItem from '../../components/ChatItem'
import SocketSample from '../../components/SocketSample'
import vuexStates from '../../mixins/vuexStates'
import { v4 as newUuid } from 'uuid'

export default {
  name: 'chat',
  components: {
    ChatItem,
    SocketSample
  },
  mixins: [vuexStates],
  data: () => ({
    chats: [
      {id: 1, content: 'Hello guys!', isOwner: false, time: '7:15 PM', name: 'Ali'},
      {id: 2, content: 'Oh hello, welcome', isOwner: true, time: '7:20 PM', name: 'Mohsen'},
      {id: 3, content: 'Hello man, nice to meet you', isOwner: false, time: '11:30 PM', name: 'Majid'},
    ]
  }),
  methods: {
    async fetchChats() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/public-chats`, {
          headers: this.$store.getters.tokenHeader
        })
        this.chats = data
      } catch (e) {
        console.log(e)
      }
    },
    async fetchRoles() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/roles`, {
          headers: this.$store.getters.tokenHeader
        })
        this.roomRoles = data
      } catch (e) {
        console.log(e)
      }
    },
    subscribeChats() {
      this.$stomp.subscribe(`/topic/room/${this.joinedRoomId}/publicChats`, (payload) => {
        const publicChatEvent = JSON.parse(payload.body)
        console.log('**********Public chat event coming**********')
        console.log(publicChatEvent)

        if (publicChatEvent.type === 'CREATE') {
          this.chats.push(publicChatEvent.publicChat)
        } else if (publicChatEvent.type === 'UPDATE') {
          this.chats = this.chats.map(e => {
            if (e.id === publicChatEvent.publicChat.id) {
              return publicChatEvent.publicChat
            }
            return e
          })
        } else if (publicChatEvent.type === 'DELETE') {
          this.chats = this.chats.filter(e => e.id !== publicChatEvent.publicChatId)
        }
      })

    },
    subscribeUsers() {
      this.$stomp.subscribe(`/topic/room/${this.joinedRoomId}/users`, (payload) => {
        const userEntranceEvent = JSON.parse(payload.body)
        console.log('**********User entrance event coming**********')
        console.log(userEntranceEvent)

        if (userEntranceEvent.type === 'JOIN') {
          // add role to list
          this.roomRoles = this.roomRoles.map(e => {
            if (e.id === userEntranceEvent.role.id) {
              return {...e, isOnline: true}
            }
            return e
          })

          // create join message
          const joinMessage = {
            id: newUuid(),
            content: `${userEntranceEvent.role.user.username} joined the room`,
            type: 'SYSTEM',
          }
          this.chats.push(joinMessage)
        } else if (userEntranceEvent.type === 'LEAVE') {
          // remove role from list
          this.roomRoles = this.roomRoles.map(e => {
            if (e.id === userEntranceEvent.role.id) {
              return {...e, isOnline: false}
            }
            return e
          })

          // create join message
          const leaveMessage = {
            id: newUuid(),
            content: `${userEntranceEvent.role.user.username} left the room`,
            type: 'SYSTEM',
          }
          this.chats.push(leaveMessage)
        }
      })
    },
    subscribeRoles() {
      this.$stomp.subscribe(`/topic/room/${this.joinedRoomId}/roles`, (payload) => {
        const roleEvent = JSON.parse(payload.body)
        console.log('**********Role event coming**********')
        console.log(roleEvent)

        if (roleEvent.type === 'UPDATE') {
          this.roomRoles = this.roomRoles.map(e => {
            if (e.id === roleEvent.role.id) {

              if (roleEvent.role.userId === this.userId){ //update vuex state
                this.userRoleType = roleEvent.role.type
              }

              return roleEvent.role
            }
            return e
          })
        }
      })

    },
    connectToSocket() {
      return new Promise((resolve, reject) => {
        const headers = {
          token: this.$store.getters.apiToken
        }
        this.$stomp.connect(headers,
          (frame) => {
            resolve()
          }, () => {
            console.log('************ Disconnected -_- ***************')
            reject()
          })

      })
    },
    joinToRoom() {
      this.$stomp.send(`/app/room/${this.joinedRoomId}/joinRoom`, null, {})
    }
  },
  async mounted() {
    await this.connectToSocket()
    this.joinToRoom()

    await this.fetchRoles()
    const userRole = this.roomRoles.find(value => value.userId === this.userId) // store current user role
    this.userRoleType = userRole.type

    await this.fetchChats()


    this.subscribeChats()
    this.subscribeUsers()
    this.subscribeRoles()
  }
}
</script>
