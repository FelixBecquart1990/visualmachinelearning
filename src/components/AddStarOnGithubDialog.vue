<template>
  <div class="text-center">
    <v-dialog v-model="addStarOnGithubDialog" width="500">
      <v-card>
        <v-card-title class="headline white--text primary text-center" primary-title>
          <v-spacer></v-spacer>&#127882; Congratulation &#127882;
          <v-spacer></v-spacer>
          <v-btn
            v-if="$vuetify.breakpoint.smAndDown"
            icon
            dark
            @click="addStarOnGithubDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- <v-img src="https://media.giphy.com/media/zWeOJDQuJOg7e/giphy.gif" aspect-ratio="2.2"></v-img> -->
        <v-img
          src="https://media.giphy.com/media/zWeOJDQuJOg7e/giphy.gif"
          lazy-src="https://i.imgur.com/7RaSl6w.jpg"
          aspect-ratio="2.2"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div class="body-1 ma-5">Congratulation, you have successfully completed this tutorial!</div>

        <div
          class="body-1 mx-5 mt-5 pb-5"
        >Did you enjoy it &#128582;? Please consider adding a star &#127775; on the Github repository:</div>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=FelixBecquart1990&repo=visualmachinelearning&type=star&count=true&size=large"
          frameborder="0"
          scrolling="0"
          width="160px"
          height="30px"
          class="mx-5 mb-5"
        ></iframe>
        <v-card class="flex" flat tile>
          <v-card-title class="primary pa-1">
            <v-spacer></v-spacer>
            <v-btn dark icon @click="openInformationDialog()">
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    openInformationDialog() {
      this.$store.commit("setInformationDialog", true);
    }
  },
  computed: {
    addStarOnGithubDialog: {
      get() {
        return this.$store.state.addStarOnGithubDialog;
      },
      set(val) {
        return this.$store.commit("setAddStarOnGithubDialog", val);
      }
    }
  }
};
</script>

