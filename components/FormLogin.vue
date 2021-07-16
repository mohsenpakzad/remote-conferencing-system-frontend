<template>
  <v-form
    v-model="valid"
  >

    <card-form-error
      v-if="error"
      message="Incorrect email or password."
    ></card-form-error>

    <v-text-field
      v-model="loginData.email"
      :rules="emailRules"
      label="Email"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="loginData.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="showPassword ? 'text' : 'password'"
      counter
      label="Password"
      outlined
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      :loading="loading"
      block
      class="mt-6"
      color="success"
      @click="login"
    >
      Sign in
    </v-btn>

  </v-form>

</template>

<script>
import CardFormError from './CardFormError'
import fieldRules from '../mixins/fieldRules'
import { mapActions } from 'vuex'

export default {
  name: 'FormSignIn',
  data: () => ({
    loginData: {
      email: '',
      password: '',
    },
    showPassword: false,
    valid: false,
    loading: false,
    error: false
  }),
  components: {
    CardFormError
  },
  mixins: [fieldRules],
  methods: {
    ...mapActions('userInformation', ['loginUser']),
    async login() {
      try {
        this.loading = true
        await this.loginUser(this.loginData)
      } catch (error) {
        this.error = true
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
