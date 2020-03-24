<template>
  <div class="text-center">
    <v-dialog v-model="informationDialog" width="500">
      <v-card @click="informationDialog = false">
        <v-card-title class="headline white--text info" primary-title
          >Information</v-card-title
        >
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text">mdi-handshake</v-icon
          >Source
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >This machine learning example has been inspired by
          <a
            href="https://www.justinemery.co.uk"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            >Justin Emery</a
          >
          's
          <a
            href="https://www.udemy.com/course/machine-learning-in-javascript-with-tensorflow-js"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            >Udemy course</a
          >
        </v-card-text>
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text"
            >mdi-format-list-text</v-icon
          >Improvements
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >Raise your two elbows above your shoulders.</v-card-text
        >
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text">mdi-lightbulb-on</v-icon
          >How to see saved results
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >Put your two wrists further to your right shoulder. To close this
          navigation drawer, put your two wrists further to your left
          shoulder.</v-card-text
        >
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    informationDialog: {
      get() {
        return this.$store.state.informationDialog;
      },
      set(val) {
        return this.$store.commit("setInformationDialog", val);
      }
    }
  }
};
</script>

<style scoped></style>
