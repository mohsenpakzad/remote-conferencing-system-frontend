<template>
  <div>
    <p>Room main page</p>
    <socket-sample></socket-sample>
  </div>
</template>

<script>
import SocketSample from '../../components/SocketSample'
export default {
  name: 'index',
  components: {SocketSample}
}
</script>
