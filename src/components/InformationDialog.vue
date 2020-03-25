<template>
  <div class="text-center">
    <v-dialog v-model="informationDialog" width="500">
      <v-card>
        <v-card-title class="headline white--text info" primary-title
          >Information<v-spacer></v-spacer
          ><v-btn
            v-if="$vuetify.breakpoint.smAndDown"
            icon
            dark
            @click="informationDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn></v-card-title
        >
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text">mdi-handshake</v-icon
          >Source
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >This machine learning example is based on
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
          >.
        </v-card-text>
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text"
            >mdi-format-list-text</v-icon
          >Improvements
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >These following features will be added if the
          <a
            href="https://github.com/FelixBecquart1990/visualmachinelearning"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            >Github repository</a
          >
          of this project reachs enough stars:
          <br />
          - binary classification example<br />
          - multi-class classification example<br />
          - save/load model on Local Storage<br /><small
            >features still based on Justin Emery's course
          </small></v-card-text
        >
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text">mdi-cog</v-icon
          >Technologies
        </v-card-title>
        <v-card-text class="pb-5 grey--text"
          >-
          <a
            href="https://www.tensorflow.org/js/"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            ><v-icon color="black" left class="grey--text">mdi-robot</v-icon
            >Tensorflow.js</a
          >
          ~ machine learning<br />-
          <a
            href="https://vuejs.org/"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            ><v-icon color="black" left class="grey--text">mdi-vuejs</v-icon
            >Vue.js</a
          >
          ~ front-end framework<br />-
          <v-icon color="black" left class="grey--text">mdi-vuetify</v-icon
          ><a
            href="https://vuetifyjs.com/"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            >Vuetify.js</a
          >
          ~ material design library<br />-
          <v-icon color="black" left class="grey--text">mdi-firebase</v-icon
          ><a
            href="https://firebase.google.com/"
            target="_blank"
            class="text--info"
            style="text-decoration: none;"
            >Firebase</a
          >
          ~ hosting</v-card-text
        >
        <v-card-title class="grey--text">
          <v-icon color="black" left class="grey--text">mdi-account</v-icon
          >Author
        </v-card-title>
        <v-card-text class="grey--text"
          >My name is Félix and I have been learning <b>front-end</b> from 2016
          and <b>machine learning</b> from 2019. I like to combine technologies
          to create innovative projects.
        </v-card-text>
        <v-card-text class="grey--text pb-0"
          ><b>My other projects:</b></v-card-text
        >
        <v-slide-group active-class="success" show-arrows>
          <v-slide-item v-for="(project, index) in projects" :key="index">
            <!-- <v-card
              class="ma-4"
              height="200"
              width="100"
              :href="project.url"
              target="_blank"
            >
              <v-row class="fill-height" align="center" justify="center">
              </v-row>
            </v-card> -->
            <v-card
              class="ma-4"
              width="190"
              :href="project.url"
              target="_blank"
            >
              <v-img :src="project.image" height="100px"></v-img>

              <v-card-title>
                {{ project.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ project.subtitle }}
              </v-card-subtitle>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    projects: [
      {
        title: "Vote recognition",
        subtitle: "Made with machine learning",
        image: "https://i.imgur.com/eFFzcxG.jpg",
        url: "http://vote-recognition.web.app/"
      },
      {
        title: "Firewords",
        subtitle: "Translation quiz",
        image: "https://i.imgur.com/ajwP67T.jpg",
        url: "https://playmoretolearn.web.app/"
      },
      {
        title: "Word by word",
        subtitle: "Vocabulary reminder",
        image: "https://i.imgur.com/nruIYL1.jpg",
        url: "https://wordbywordapp.web.app/"
      }
    ]
  }),
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
