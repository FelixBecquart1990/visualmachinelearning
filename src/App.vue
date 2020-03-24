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
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            depressed
            small
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
    <v-footer dark padless>
      <v-card class="flex " flat tile>
        <v-card-title class="info pa-1">
          <v-spacer></v-spacer>
          <v-btn
            v-for="(social, index) in socials"
            :key="index"
            class="mx-4"
            dark
            icon
            :href="social.url"
            target="_blank"
          >
            <v-icon size="24px">{{ social.icon }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar";
import InformationDialog from "./components/InformationDialog";
import * as tfvis from "@tensorflow/tfjs-vis";
export default {
  name: "App",
  components: {
    Snackbar,
    InformationDialog
  },
  data: () => ({
    socials: [
      { icon: "mdi-github", url: "https://github.com/FelixBecquart1990" },
      {
        icon: "mdi-linkedin",
        url: "https://www.linkedin.com/in/félix-becquart-8a5a46a6"
      },
      {
        icon: "mdi-facebook",
        url: "https://www.facebook.com/felix.becquart"
      }
    ]
  }),
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
