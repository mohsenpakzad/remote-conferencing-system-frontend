<template>
  <v-app>

    <v-navigation-drawer
      app
      v-model="drawer"
      width="350"
    >
      <v-list>
        <v-subheader>Joined as {{ username }}</v-subheader>

        <v-list-group
          :value="true"
          no-action
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </template>

          <template
            v-for="role in roomRoles"
          >

            <v-list-group
              v-if="role.isOnline === true && userRoleType === 'OWNER' && role.type !== 'OWNER'"
              sub-group
            >

              <template v-slot:activator v-if="role.user">

                  <v-list-item-title v-text="role.user.username"></v-list-item-title>
                  <v-list-item-subtitle v-text="capitalize(role.type)"></v-list-item-subtitle>

                  <v-list-item-icon>
                    <v-icon v-if="role.type === 'OWNER'">mdi-crown</v-icon>
                    <v-icon v-else-if="role.type === 'HOST'">mdi-account-star</v-icon>
                    <v-icon v-else-if="role.type === 'PARTICIPANT'">mdi-account</v-icon>
                  </v-list-item-icon>

              </template>

              <v-list-item
                v-if="role.type === 'PARTICIPANT'"
                @click="promoteToHost(role)"
              >
                <v-list-item-title>Promote to Host</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-else-if="role.type === 'HOST'"
                @click="demoteToParticipant(role)"
              >
                <v-list-item-title>Demote to Participant</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-item
              v-else-if="role.user"
              :disabled="!role.isOnline"
            >

              <v-list-item-title v-text="role.user.username"></v-list-item-title>
              <v-list-item-subtitle v-text="capitalize(role.type)"></v-list-item-subtitle>

              <v-list-item-icon>
                <v-icon v-if="role.type === 'OWNER'">mdi-crown</v-icon>
                <v-icon v-else-if="role.type === 'HOST'">mdi-account-star</v-icon>
                <v-icon v-else-if="role.type === 'PARTICIPANT'">mdi-account</v-icon>
              </v-list-item-icon>

            </v-list-item>

          </template>


        </v-list-group>

        <v-list-item @click="exportChats">
          <v-list-item-avatar>
            <v-icon>mdi-file-export</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Export Chats</v-list-item-title>
        </v-list-item>


        <!--TODO: userRoleType == 'OWNER' ||  userRoleType == 'HOST' won't work! -->
        <v-list-item v-if="userRoleType !== 'PARTICIPANT'" @click="exportUsersActivities">
          <v-list-item-avatar>
            <v-icon>mdi-account-clock</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Export Users Activities</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-toolbar-title>
        {{ joinedRoomName }} | {{ joinedRoomId }}
      </v-toolbar-title>

      <v-spacer/>

      <v-btn
        icon
        class="mx-1"
        large
        outlined
        color="red"
        @click="leaveRoom"
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background: #EEEEEE;">
      <nuxt-child/>
    </v-main>

    <v-footer v-if="$route.path === '/room/'" app inset>
      <chat-input></chat-input>
    </v-footer>

    <v-bottom-navigation
      app
      color="primary"
      grow
      min-height="70"
      class="pa-1"
    >
      <v-btn nuxt to="/room/whiteboard">
        <span>Whiteboard</span>
        <v-icon large>mdi-teach</v-icon>
      </v-btn>

      <v-btn nuxt exact to="/room/">
        <span>Chat</span>
        <v-icon large>mdi-chat</v-icon>
      </v-btn>

      <v-btn nuxt to="/room/qa">
        <span>Q&A</span>
        <v-icon large>mdi-help-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
import ChatInput from '../components/ChatInput'
import vuexStates from '../mixins/vuexStates'

export default {
  name: 'room',
  components: {
    ChatInput
  },
  data: () => ({
    drawer: false
  }),
  mixins: [vuexStates],
  methods: {
    promoteToHost(role) {
      const payload = {
        type: 'HOST'
      }
      this.$stomp.publish({
        destination:`/app/role/${role.id}/updateRole`,
        body: JSON.stringify(payload)
      })
    },
    demoteToParticipant(role) {
      const payload = {
        type: 'PARTICIPANT'
      }
      this.$stomp.publish({
        destination:`/app/role/${role.id}/updateRole`,
        body: JSON.stringify(payload)
      })
    },
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    },
    async leaveRoom() {
      await this.$stomp.deactivate()
      await this.$router.push('/user/')
    },
    downloadObjectAsJson(exportObj, exportName){
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", `${exportName}.json`);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    async exportChats() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/public-chats`, {
          headers: this.$store.getters.tokenHeader
        })
        this.downloadObjectAsJson(data, `room_${this.joinedRoomId}_chats`)
      } catch (e) {
        console.log(e)
      }
    },
    async exportUsersActivities(){
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/roles-activities`, {
          headers: this.$store.getters.tokenHeader
        })
        this.downloadObjectAsJson(data, `room_${this.joinedRoomId}_users_activities`)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchRoomInfo() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}`, {
          headers: this.$store.getters.tokenHeader
        })
        this.joinedRoomName = data.name
      } catch (e) {
        console.log(e)
      }
    },
  },
  async mounted() {
    await this.fetchRoomInfo()
  }
}
</script>
