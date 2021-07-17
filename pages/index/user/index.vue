<template>
  <div>
    <p>User Page</p>
    <v-btn @click="fetchJoinedRooms">fetch Joined Rooms</v-btn>
    <v-btn @click="fetchRegisteredRooms">fetch Registered Rooms</v-btn>
  </div>
</template>

<script>
import vuexStates from '../../../mixins/vuexStates'

export default {
  name: 'user',
  mixins: [vuexStates],
  methods:{
    async fetchJoinedRooms(){
      try{
        const {data} = await this.$axios.get(`/api/users/joined-rooms`, {
          headers: this.$store.getters.tokenHeader
        })
        console.log(data)
      } catch (e){
        console.log(e)
      }
    },
    async fetchRegisteredRooms(){
      try{
        const {data} = await this.$axios.get(`/api/users/registered-rooms`, {
          headers: this.$store.getters.tokenHeader
        })
        console.log(data)
      } catch (e){
        console.log(e)
      }
    },
  },
}
</script>
