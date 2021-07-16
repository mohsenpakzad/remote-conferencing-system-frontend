import Vue from 'vue'

import Sockjs from 'sockjs-client'
import Stomp from 'webstomp-client'

const socket = new Sockjs('http://localhost:8080/ws'); // TODO: remove hardcoded code later

export default ({ app }, inject) => {
  inject('stomp', Vue.observable(Stomp.over(socket)))
}
