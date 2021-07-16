<template>
  <v-container>
    <v-card
      class="ma-6 pa-6"
      outlined
    >

      <v-card-title
        class="mb-6"
      >
        <span class="headline">Signup</span>
      </v-card-title>

      <v-card-text>
        <v-form
          v-model="valid"
        >
          <card-form-error
            v-if="error"
            message="The input email has already been used."
          ></card-form-error>

          <v-text-field
            v-model="userSignup.fullName"
            :counter="50"
            :rules="fullNameRules"
            label="Full name"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="userSignup.username"
            :rules="usernameRules"
            label="Username"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="userSignup.password"
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
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
import CardFormError from '../../components/CardFormError'
import fieldRules from '../../mixins/fieldRules'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'signup',
  data: () => ({
    userSignup: {
      fullName: '',
      username: '',
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
    ...mapFields([
      'isLoggedIn',
      'fullName',
      'username',
      'authorization'
    ]),
    passwordConfirmationRule() {
      return (this.userSignup.password === this.repeatedPassword) || 'Password must match'
    },
  },
  mixins: [fieldRules],
  methods: {
    async signUp() {
      try {
        this.loading = true

        const {headers} = await this.$axios.post('/api/v1/users/signup', this.userSignup)

        this.isLoggedIn = true
        this.fullName = this.userSignup.fullName
        this.username = this.userSignup.username
        this.authorization = headers.authorization

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
