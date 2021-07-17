import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields([
      'isLoggedIn',
      'fullName',
      'username',
      'authorization'
    ])
  }
}
