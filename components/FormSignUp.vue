<template>

  <v-form
    v-model="valid"
  >

    <card-form-error
      v-if="error"
      message="The input email has already been used."
    ></card-form-error>

    <v-text-field
      v-model="registerData.fullName"
      :counter="50"
      :rules="fullNameRules"
      label="Full name"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="registerData.email"
      :rules="emailRules"
      label="E-mail"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="registerData.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="showPassword ? 'text' : 'password'"
      counter
      label="Password"
      outlined
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-text-field
      v-model="repeatedPassword"
      :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordConfirmationRule]"

      :type="showRepeatedPassword ? 'text' : 'password'"
      counter
      label="Repeat Password"
      outlined
      @click:append="showRepeatedPassword = !showRepeatedPassword"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      :loading="loading"
      block
      class="mt-6"
      color="success"
      @click="signUp"
    >
      Sign up
    </v-btn>

  </v-form>

</template>

<script>
import CardFormError from './CardFormError'
import fieldRules from '../mixins/fieldRules'
import { mapActions } from 'vuex'

export default {
  name: 'FormSignUp',
  data: () => ({
    registerData: {
      fullName: '',
      email: '',
      password: '',
    },
    showPassword: false,
    repeatedPassword: '',
    showRepeatedPassword: false,
    valid: false,
    loading: false,
    error: false
  }),
  components: {
    CardFormError
  },
  computed: {
    passwordConfirmationRule() {
      return (this.registerData.password === this.repeatedPassword) || 'Password must match'
    },
  },
  mixins: [fieldRules],
  methods: {
    ...mapActions('userInformation', ['loginUser']),
    async signUp() {
      try {
        this.loading = true
        await this.$axios.post('/users/signup', this.registerData)

        const email = this.registerData.email
        const password = this.registerData.password

        await this.loginUser({email, password})
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
