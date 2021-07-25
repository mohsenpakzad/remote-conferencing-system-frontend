export default {
  data: () => ({
    fullNameRules: [
      v => !!v || 'Full name is required',
      v => (v && v.length <= 50) || 'Full name must be less than or equal to 50 characters',
    ],
    usernameRules: [
      v => !!v || 'Username is required',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    roomNameRules: [
      v => !!v || 'Room name is required',
    ],
    roomIdRules: [
      v => !!v || 'Room ID is required',
    ],
  })
}
