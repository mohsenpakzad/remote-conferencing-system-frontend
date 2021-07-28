import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  isLoggedIn: false,
  fullName: '',
  username: '',
  authorization: '',
  joinedRoomId: '',
  joinedRoomName: '',
  chatInput: ''
})

export const getters = {
  getField,
  apiToken: (state) => state.authorization,
  tokenHeader: (state) => ({
    Authorization: state.authorization
  }),
}

export const mutations = {
  updateField
}
