<template>
  <div>
    <p>User Page</p>
<!--    <v-btn @click="fetchJoinedRooms">fetch Joined Rooms</v-btn>-->
<!--    <v-btn @click="fetchRegisteredRooms">fetch Registered Rooms</v-btn>-->
    <div v-for="joinedRoom in joinedRooms" :key="joinedRoom.id">
      <v-btn nuxt link to="room/">{{ joinedRoom.name }}</v-btn>
    </div>
    <div v-for="joinedRoom in joinedRooms" :key="joinedRoom.id">
      <v-btn nuxt link to="room/">{{ joinedRoom.name }}</v-btn>
    </div>
  </div>
</template>

<script>
import vuexStates from '../../../mixins/vuexStates'

export default {
  name: 'user',
  data: () => ({
    joinedRooms: [],
    registeredRoom: []
  }),
  mixins: [vuexStates],
  methods: {
    async fetchJoinedRooms() {
      try {
        const {data} = await this.$axios.get(`/api/users/joined-rooms`, {
          headers: this.$store.getters.tokenHeader
        })
        console.log(data)
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
        console.log(data)
        this.registeredRoom = data
      } catch (e) {
        console.log(e)
      }
    },
  },
  async mounted() {
    await this.fetchJoinedRooms()
    await this.fetchRegisteredRooms()
  }
}
</script>
