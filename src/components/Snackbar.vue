<template>
  <v-snackbar
    v-model="snackbar.active"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>

<style scoped></style>
