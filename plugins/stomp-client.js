import Vue from 'vue'

import Sockjs from 'sockjs-client'
import Stomp from 'webstomp-client'

const socket = new Sockjs('http://localhost:8080/ws');

export default ({ app }, inject) => {
  inject('socket', Vue.observable(Stomp.over(socket)))
}
