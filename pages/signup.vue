<template>
  <v-container>
    <v-card
      class="ma-6 pa-6"
      outlined
    >

      <v-card-title
        class="mb-6"
      >
        <span class="headline">Sign up</span>
      </v-card-title>

      <v-card-text>
        <form-sign-up></form-sign-up>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
import FormSignUp from '../components/FormSignUp'

export default {
  name: 'signup',
  components: {
    FormSignUp
  }
}
</script>
