<template>
  <v-container>
    <v-card
      class="ma-6 pa-6"
      outlined
    >

      <v-card-title
        class="mb-6"
      >
        <span class="headline">Sign in</span>
      </v-card-title>

      <v-card-text>
        <form-sign-in></form-sign-in>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
import FormSignIn from '../components/FormLogin'

export default {
  name: 'login',
  components: {
    FormSignIn
  }
}
</script>
