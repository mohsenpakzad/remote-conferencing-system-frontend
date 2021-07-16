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
        <v-icon large>mdi-school</v-icon>
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


    <v-row
      dense
      justify="end"
    >
      <v-col
        cols="auto"
      >
        <v-btn
          v-if="$route.path !== '/login'"
          nuxt
          text
          to="/login"
        >
          Login
        </v-btn>
      </v-col>

      <v-col
        cols="auto"
      >
        <v-btn
          v-if="$route.path !== '/signup'"
          nuxt
          outlined
          to="/signup"
        >
          Signup
        </v-btn>
      </v-col>

    </v-row>
  </v-app-bar>
</template>

<script>

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
}
</script>
