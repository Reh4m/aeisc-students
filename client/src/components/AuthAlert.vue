<template lang="html">
  <v-alert
    type="error"
    text
    dismissible
    :value="true"
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: { message: String }
}
</script>