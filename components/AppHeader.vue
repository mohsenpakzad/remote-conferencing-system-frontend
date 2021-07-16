<template>
  <v-app-bar
    app
    clipped-right
    color="primary"
    dark
    flat
  >
    <v-toolbar-title
      class="mr-2"
    >
      <v-btn
        icon
        nuxt
        to="/"
      >
        <v-icon large>mdi-access-point</v-icon>
      </v-btn>

    </v-toolbar-title>

    <v-row
      dense
      justify="start"
    >
      <v-col
        v-for="(headerButton, i) in headerButtons"
        v-bind:key="i"
      >
        <v-btn
          class="mr-2"
          nuxt
          text
          v-bind:to="headerButton.link"
        >
          {{ headerButton.name }}
        </v-btn>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>

    <template
      v-if="!$route.path.startsWith('/user')"
    >
      <v-row
        justify="end"
        dense
      >
        <v-col
          cols="auto"
        >
          <v-btn
            text
            nuxt
            to="/login"
            v-if="$route.path !== '/login'"
          >
            Login
          </v-btn>
        </v-col>

        <v-col
          cols="auto"
        >
          <v-btn
            outlined
            nuxt
            to="/signup"
            v-if="$route.path !== '/signup'"
          >
            Signup
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <template
      v-else
    >
      <v-btn
        outlined
        @click="logout"
      >
        Logout
        <v-icon
          right
        >
          mdi-logout-variant
        </v-icon>
      </v-btn>
    </template>

  </v-app-bar>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'AppHeader',
  data: () => ({
    headerButtons: [
      {
        name: 'About Us',
        link: '/about'
      },
    ],
  }),
  computed: {
    ...mapFields([
      'fullName',
      'username',
      'authorization'
    ])
  },
  methods:{
    logout(){
      this.fullName = ''
      this.username = ''
      this.authorization = ''

      this.$router.push(`/`)
    }
  }
}
</script>
