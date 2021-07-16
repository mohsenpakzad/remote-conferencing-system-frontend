import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  username: '',
  authorization: ''
})

export const getters = {
  getField
}

export const mutations = {
  updateField
}
