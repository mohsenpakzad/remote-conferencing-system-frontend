<template>
  <v-container fluid>

    <p class="my-8 text-h3 font-weight-light text-center text-capitalize">Welcome {{ this.username }}</p>

    <v-row class="mt-4" justify="space-around">

      <v-col cols="auto">

        <v-card outlined class="pa-6">

          <p class="text-h5 font-weight-light">
            Create Room
          </p>

          <v-form ref="form">
            <v-text-field
              v-model="roomName"
              :rules="roomNameRules"
              label="Room Name"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-1 mt-1" small @click="createRoom">
              Create Room
            </v-btn>
          </v-form>
        </v-card>

        <v-card outlined min-width="500" class="pa-6 mt-3">

          <p class="text-h5 font-weight-light">
            Join Room
          </p>

          <v-form ref="form">
            <v-text-field
              v-model="roomId"
              :rules="roomIdRules"
              label="Room ID"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-1 mt-1" small @click="joinRoomById">
              Join by ID
            </v-btn>
          </v-form>
        </v-card>

      </v-col>

      <v-col cols="auto">

        <v-list outlined class="pa-5" min-width="500">
          <v-subheader class="text-h5 font-weight-light justify-center mb-4">
            <v-icon>mdi-location-enter</v-icon>
            Joined Rooms
          </v-subheader>

          <template v-if="registeredRooms.length > 0">

            <v-list-item
              v-for="joinedRoom in joinedRooms"
              :key="joinedRoom.id"
            >

              <v-list-item-content>
                <v-list-item-title class="text-capitalize" v-text="joinedRoom.name"></v-list-item-title>

                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-subtitle
                      v-bind="attrs"
                      @click="copyText(joinedRoom.id)"
                      v-on="on"
                      v-text="joinedRoom.id"
                    ></v-list-item-subtitle>

                  </template>
                  <span>Click to copy ID to clipboard</span>
                </v-tooltip>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn dark rounded color="deep-purple accent-4" nuxt @click="joinRoom(joinedRoom.id)">
                  Join
                </v-btn>
              </v-list-item-action>

            </v-list-item>
          </template>

          <template v-else>
            You aren't joined in any room yet
          </template>

        </v-list>

      </v-col>

      <v-col cols="auto">

        <v-list outlined class="pa-5" min-width="500">
          <v-subheader class="text-h5 font-weight-light justify-center mb-4">
            <v-icon>mdi-registered-trademark</v-icon>
            Registered Rooms
          </v-subheader>

          <template v-if="registeredRooms.length > 0">

            <v-list-item
              v-for="registeredRoom in registeredRooms"
              :key="registeredRoom.id"
            >

              <v-list-item-content>
                <v-list-item-title class="text-capitalize" v-text="registeredRoom.name"></v-list-item-title>

                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-subtitle
                      v-bind="attrs"
                      @click="copyText(registeredRoom.id)"
                      v-on="on"
                      v-text="registeredRoom.id"
                    ></v-list-item-subtitle>

                  </template>
                  <span>Click to copy ID to clipboard</span>
                </v-tooltip>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn dark rounded color="deep-purple accent-4" nuxt @click="joinRoom(registeredRoom.id)">
                  Join
                </v-btn>
              </v-list-item-action>

            </v-list-item>
          </template>

          <template v-else>
            You aren't registered in any room yet
          </template>

        </v-list>

      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      shaped
    >
      ID copied to clipboard

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import vuexStates from '../../../mixins/vuexStates'
import fieldRules from '../../../mixins/fieldRules'

export default {
  name: 'user',
  data: () => ({
    snackbar: false,
    snackbarTimeout: 2000,
    roomName: '',
    roomId: '',
    joinedRooms: [],
    registeredRooms: []
  }),
  mixins: [vuexStates, fieldRules],
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text)
      this.snackbar = true
    },
    joinRoom(roomId) {
      this.joinedRoomId = roomId
      this.$router.push('/room/')
    },
    joinRoomById() {
      this.joinedRoomId = this.roomId
      this.$router.push('/room/')
    },
    async fetchJoinedRooms() {
      try {
        const {data} = await this.$axios.get(`/api/users/joined-rooms`, {
          headers: this.$store.getters.tokenHeader
        })
        this.joinedRooms = data
      } catch (e) {
        console.log(e)
      }
    },
    async fetchRegisteredRooms() {
      try {
        const {data} = await this.$axios.get(`/api/users/registered-rooms`, {
          headers: this.$store.getters.tokenHeader
        })
        this.registeredRooms = data
      } catch (e) {
        console.log(e)
      }
    },
    async createRoom() {
      try {
        const {data} = await this.$axios.post(`/api/rooms`, {
          name: this.roomName
        }, {
          headers: this.$store.getters.tokenHeader
        })
        await this.fetchRegisteredRooms()
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    this.joinedRoomId = ''
    await this.fetchJoinedRooms()
    await this.fetchRegisteredRooms()
  }
}
</script>
