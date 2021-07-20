<template>
  <div>
    <v-row class="mt-4" justify="space-around">

      <v-col cols="auto">

        <v-card class="pa-6">
          <v-form ref="form">
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Room Name"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-1" small @click="createRoom">
              Create Room
            </v-btn>
          </v-form>
        </v-card>

        <v-card min-width="500" class="pa-6 mt-3">
          <v-form ref="form">
            <v-text-field
              v-model="id"
              :rules="idRules"
              label="Room ID"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-1" small @click="joinRoomById">
              Join by ID
            </v-btn>
          </v-form>
        </v-card>

      </v-col>

      <v-col cols="auto">

        <v-card class="pa-5" min-width="500">
          <v-list dense>
            <v-subheader class="text-h5 font-weight-light justify-center mb-4">Joined Rooms</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="joinedRoom in joinedRooms"
                :key="joinedRoom.id">
                <v-list-item-content>
                  <!--                <v-list-item-title-->
                  <!--                  v-text="joinedRoom.name"-->
                  <!--                  @click="joinRoom(joinedRoom.id)"-->
                  <!--                ></v-list-item-title>-->
                  <v-btn link nuxt @click="joinRoom(joinedRoom.id)">
                    {{ joinedRoom.name }}
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-card class="pa-5" min-width="500">
          <v-list dense>
            <v-subheader class="text-h5 font-weight-light justify-center mb-4">Registered Rooms</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="registeredRoom in registeredRooms"
                :key="registeredRoom.id"
              >
                <v-list-item-content>
                  <!--              <v-list-item-title-->
                  <!--                v-text="registeredRoom.name"-->
                  <!--                @click="joinRoom(registeredRoom.id)"-->
                  <!--              ></v-list-item-title>-->
                  <v-btn link nuxt @click="joinRoom(registeredRoom.id)">
                    {{ registeredRoom.name }}
                  </v-btn>
                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import vuexStates from '../../../mixins/vuexStates'

export default {
  name: 'user',
  data: () => ({
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 10 characters'
    ],
    id: '',
    idRules: [v => !!v || 'ID is required'],
    joinedRooms: [],
    registeredRooms: []
  }),
  mixins: [vuexStates],
  methods: {
    joinRoom(roomId) {
      this.joinedRoomId = roomId
      this.$router.push('room/')
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
          name: this.name
        }, {
          headers: this.$store.getters.tokenHeader
        })
        await this.fetchRegisteredRooms()
      } catch (e) {
        console.log(e)
      }
    },
    async joinRoomById() {

    }
  },
  async mounted() {
    this.joinedRoomId = ''
    await this.fetchJoinedRooms()
    await this.fetchRegisteredRooms()
  }
}
</script>
