<template>
  <v-app>

    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list subheader>
        <v-subheader>Joined as username</v-subheader>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-toolbar-title>
        Room name | Room Id
      </v-toolbar-title>

      <v-spacer/>

      <v-btn
        icon
        class="mx-1"
        large
        outlined
        color="red"
        to="/user"
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background: #EEEEEE;">
      <nuxt-child/>
    </v-main>

    <v-bottom-navigation
      app
      color="purple"
      grow
      min-height="70"
    >
      <v-btn nuxt to="whiteboard">
        <span>Whiteboard</span>
        <v-icon>mdi-teach</v-icon>
      </v-btn>

      <v-btn nuxt to="chat">
        <span>Chat</span>
        <v-icon>mdi-chat</v-icon>
      </v-btn>

      <v-btn nuxt to="qa">
        <span>Q&A</span>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
export default {
  name: 'room',
  data: () => ({
    drawer: false,
  }),
}
</script>
