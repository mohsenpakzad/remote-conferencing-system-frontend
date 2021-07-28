<template>
  <v-app>
    <v-container
      class="ma-3"
      fluid
    >
      <v-row
        justify="center"
      >
        <h1
          class="font-weight-light display-3"
        >
          {{ error.message }}
        </h1>
      </v-row>

      <v-row
        class="mt-6"
        justify="center"
      >
        <v-btn
          class="justify-center"
          outlined
          @click="$router.back()"
        >
          Back
        </v-btn>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    pageNotFound: '404 Not Found',
    otherError: 'An error occurred'
  }),
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    }
  }
}
</script>
