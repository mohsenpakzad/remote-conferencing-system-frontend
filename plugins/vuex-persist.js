import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'remote-conferencing',
    storage: window.localStorage
  }).plugin(store);
}
