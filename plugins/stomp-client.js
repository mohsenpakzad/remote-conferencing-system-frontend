import Vue from 'vue'

import SockJs from 'sockjs-client'
import { Client } from '@stomp/stompjs'

export default ({ store, app }, inject) => {

  const stomp = new Client({
    connectHeaders: {
      token: store.state.authorization
    },
    onConnect: function (){
      console.log('************ Connected ***************')

      // join to room
      app.$stomp.publish({
        destination: `/app/room/${store.state.joinedRoomId}/joinRoom`
      })
    },
    onDisconnect: function (){
      console.log('************ Disconnected ***************')
    },
    debug: function (str) {
      console.log('STOMP: ' + str);
    },
  })
  stomp.webSocketFactory = function () {
    return new SockJs('http://localhost:8080/ws')// TODO: remove hardcoded code later
  }


  inject('stomp', Vue.observable(stomp))
}
