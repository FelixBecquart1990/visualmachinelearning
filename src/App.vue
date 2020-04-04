<template>
  <v-app>
    <v-app-bar app color="transparent" dark src="https://i.imgur.com/qWFL7Xk.jpg">
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
            class="ml-4"
            color="transparent"
            @click="toggleVisor()"
          >
            <v-icon>mdi-chart-line</v-icon>
          </v-btn>
        </template>
        <span>Charts</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            depressed
            small
            class="ml-2"
            color="transparent"
            @click="openInformationDialog()"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>Information</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <snackbar />
    <informationDialog />
    <addStarOnGithubDialog />

    <v-footer padless>
      <v-col class="text-center py-2" cols="12">
        Designed with ❤️ by
        <a
          target="_blank"
          href="https://github.com/FelixBecquart1990"
          style="text-decoration: none;"
        >Félix Becquart</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar";
import InformationDialog from "./components/InformationDialog";
import AddStarOnGithubDialog from "./components/AddStarOnGithubDialog";

import * as tfvis from "@tensorflow/tfjs-vis";
export default {
  name: "App",
  components: {
    Snackbar,
    InformationDialog,
    AddStarOnGithubDialog
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
