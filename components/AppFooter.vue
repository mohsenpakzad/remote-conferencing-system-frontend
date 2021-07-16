<template>
  <v-footer
    color="primary lighten-1"
    dark
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        class="my-2"
        rounded
        text
      >
        {{ link }}
      </v-btn>

      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        Built with
        <v-icon color="red">mdi-heart</v-icon>
      </v-col>

    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ]
    }
  }
}
</script>
