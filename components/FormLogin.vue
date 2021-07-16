<template>
  <v-form
    v-model="valid"
  >
    <card-form-error
      v-if="error"
      message="Incorrect email or password."
    ></card-form-error>

    <v-text-field
      v-model="userLogin.username"
      :rules="usernameRules"
      label="Username"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="userLogin.password"
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
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'FormSignIn',
  data: () => ({
    userLogin: {
      username: '',
      password: '',
    },
    showPassword: false,
    valid: false,
    loading: false,
    error: false
  }),
  computed: {
    ...mapFields([
      'username',
      'authorization'
    ])
  },
  components: {
    CardFormError
  },
  mixins: [fieldRules],
  methods: {
    async login() {
      try {
        this.loading = true

        const {headers} = await this.$axios.post('/api/v1/users/login', this.userLogin)
        this.authorization = headers.authorization
        this.username = this.userLogin.username

        await this.$router.push(`/user`)
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
