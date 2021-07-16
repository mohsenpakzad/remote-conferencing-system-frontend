<template>
  <v-container>
    <v-card
      class="ma-6 pa-6"
      outlined
    >
      <v-card-title
        class="mb-16"
      >
        <v-row
          justify="center"
        >
          <span class="text-h4 text-md-h3 mzb-4">Personal Information</span>
        </v-row>

      </v-card-title>

      <v-card-text>
        <v-form
          v-model="valid"
        >
          <v-text-field
            v-model="user.fullName"
            label="Full Name"
            outlined
            :rules="fullNameRules"
          ></v-text-field>

          <v-text-field
            v-model="user.username"
            label="Username"
            outlined
            :rules="usernameRules"
          ></v-text-field>

          <!-- TODO: show dialog on success or failed -->
          <v-btn
            :disabled="!valid"
            :loading="loading"
            color="success"
            block
            class="mt-6"
            @click="update"
          >
            Update profile
          </v-btn>

        </v-form>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
import fieldRules from '../../../mixins/fieldRules'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'settings',
  data: () => ({
    user: {
      fullName: '',
      username: '',
    },
    valid: false,
    loading: false
  }),
  computed: {
    ...mapFields([
      'fullName',
      'username'
    ])
  },
  methods: {
    async update() {
      try {
        this.loading = true
        // todo: send update request
        this.fullName = this.user.fullName
        this.username = this.user.username
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
  mixins: [fieldRules],
}
</script>
