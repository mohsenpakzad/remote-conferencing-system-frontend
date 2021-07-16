<template>
  <v-container>
    <v-card
      class="ma-6 pa-6"
      outlined
    >

      <v-card-title
        class="mb-6"
      >
        <span class="headline">Login</span>
      </v-card-title>

      <v-card-text>
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
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
import CardFormError from '../../components/CardFormError'
import fieldRules from '../../mixins/fieldRules'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'login',
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
      'isLoggedIn',
      'fullName',
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
        this.isLoggedIn = true
        // this.fullName = this.userLogin.fullname // TODO
        this.username = this.userLogin.username
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
