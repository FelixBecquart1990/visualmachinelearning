<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/giphy.webp"
          transition="scale-transition"
          width="40"
          height="50"
        />
      </div>
      <v-toolbar-title>Visual Machine Learning</v-toolbar-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            depressed
            small
            class="ml-2 mt-1"
            color="transparent"
            @click="openInformationDialog()"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>Information</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            depressed
            small
            class="mr-2"
            color="transparent"
            @click="toggleVisor()"
          >
            <v-icon>mdi-chart-line</v-icon>
          </v-btn>
        </template>
        <span>Charts</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <snackbar />
    <informationDialog />
    <footers />
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar";
import Footers from "./components/Footers";
import InformationDialog from "./components/InformationDialog";
import * as tfvis from "@tensorflow/tfjs-vis";
export default {
  name: "App",
  components: {
    Snackbar,
    InformationDialog,
    Footers
  },

  methods: {
    async toggleVisor() {
      tfvis.visor().toggle();
    },
    openInformationDialog() {
      this.$store.commit("setInformationDialog", true);
    }
  }
};
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 0px;
}
</style>
