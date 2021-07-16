<!--<template>-->
<!--  <v-container>-->
<!--    <v-card-->
<!--      class="ma-6 pa-6"-->
<!--      outlined-->
<!--    >-->
<!--      <v-card-title-->
<!--        class="mb-6"-->
<!--      >-->
<!--        <v-row-->
<!--          justify="center"-->
<!--          justify-md="start"-->
<!--        >-->
<!--          <span class="text-h4 text-md-h3 mzb-4">Personal Information</span>-->
<!--        </v-row>-->

<!--        <v-row-->
<!--          justify="center"-->
<!--          justify-md="end"-->
<!--        >-->
<!--          &lt;!&ndash;  TODO: create avatar picker&ndash;&gt;-->
<!--          <v-avatar-->
<!--            class="grey lighten-2"-->
<!--            size="170"-->
<!--          >-->
<!--            <v-img-->
<!--              :src="getUserProfile"-->
<!--              aspect-ratio="2"-->
<!--              @click="updateProfile"-->
<!--            ></v-img>-->
<!--          </v-avatar>-->
<!--        </v-row>-->
<!--      </v-card-title>-->

<!--      <v-card-text>-->
<!--        <form-user-settings></form-user-settings>-->
<!--      </v-card-text>-->

<!--    </v-card>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script>-->
<!--import { mapActions, mapGetters } from 'vuex'-->
<!--import FormUserSettings from '../components/FormUserSettings'-->

<!--export default {-->
<!--  name: 'settings',-->
<!--  components: {-->
<!--    FormUserSettings-->
<!--  },-->
<!--  computed: mapGetters('userInformation', ['getUserProfile']),-->
<!--  methods: {-->
<!--    ...mapActions('userInformation', ['updateUserProfile']),-->
<!--    updateProfile() {-->
<!--      this.updateUserProfile()-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->
