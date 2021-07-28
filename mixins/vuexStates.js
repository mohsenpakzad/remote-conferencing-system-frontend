import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields([
      'isLoggedIn',
      'userId',
      'fullName',
      'username',
      'authorization',

      'joinedRoomId',
      'joinedRoomName',

      'chatInput',

      'userRoleType',
      'roomRoles'
    ])
  }
}
