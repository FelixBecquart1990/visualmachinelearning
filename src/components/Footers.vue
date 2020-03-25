<template>
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
</template>

<script>
export default {
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
  })
};
</script>

<style scoped></style>
