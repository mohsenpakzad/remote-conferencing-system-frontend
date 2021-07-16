import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  fullName: '',
  username: '',
  authorization: ''
})

export const getters = {
  getField
}

export const mutations = {
  updateField
}
