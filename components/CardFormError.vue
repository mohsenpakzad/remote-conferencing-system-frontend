<template>
  <v-card
    class="mt-4 mb-6"
    color="error lighten-5"
    flat
  >

    <v-card-text>
      {{ message }}
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'CardFormError',
  props: {
    message: String
  }
}
</script>
