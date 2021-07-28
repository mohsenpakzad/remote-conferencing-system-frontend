<template>
  <v-app>

    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list subheader>
        <v-subheader>Joined as {{ username }}</v-subheader>

<!--        <v-list-group-->
<!--          :value="true"-->
<!--          prepend-icon="mdi-account-circle"-->
<!--        >-->
<!--          <template v-slot:activator>-->
<!--            <v-list-item-title>Users</v-list-item-title>-->
<!--          </template>-->



<!--            <v-list-item-->
<!--              v-for="role in roles"-->
<!--              :key="role.id"-->
<!--              link-->
<!--            >-->
<!--              <v-list-item-title v-text="role.user.username"></v-list-item-title>-->

<!--            </v-list-item>-->

<!--        </v-list-group>-->

        <v-list-group
          no-action
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="role in roles"
            :key="role.id"
            link
          >
            <v-list-item-title v-text="role.user.username"></v-list-item-title>
            <v-list-item-subtitle v-text="capitalize(role.type)"></v-list-item-subtitle>

            <v-list-item-icon>
              <v-icon v-if="role.type === 'OWNER'">mdi-crown</v-icon>
              <v-icon v-else-if="role.type === 'HOST'">mdi-account-star</v-icon>
              <v-icon v-else-if="role.type === 'PARTICIPANT'">mdi-account</v-icon>
            </v-list-item-icon>

          </v-list-item>
        </v-list-group>

        <v-list-item @click="exportChats">
          <v-list-item-avatar>
            <v-icon>mdi-file-export</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Export Chats</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-toolbar-title>
        Room name: {{  }} | Room Id: {{ joinedRoomId }}
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
    drawer: false,
    roles: []
  }),
  mixins: [vuexStates],
  methods:{
    capitalize(input){
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    },
    leaveRoom(){
      this.$stomp.disconnect()
      this.$router.push('/user/')
    },
    async exportChats(){
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/public-chats`, {
          headers: this.$store.getters.tokenHeader
        })

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", `room_${this.joinedRoomId}_chats.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

      } catch (e) {
        console.log(e)
      }
    },
    async fetchRoles() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/roles`, {
          headers: this.$store.getters.tokenHeader
        })
        this.roles = data
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    await this.fetchRoles()
  }
}
</script>
