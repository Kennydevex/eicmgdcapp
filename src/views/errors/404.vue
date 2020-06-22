<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex text-center>
        <img :src="require('../../assets/logo.png')" alt="EICM-GDC" width="auto" height="180" />
        <h1 class="display-2 primary--text">Upsss, 404</h1>
        <p>A página indicada não foi encontrado, certifica-te do enderço inserido</p>

        <v-btn to="/" outlined color="primary">Ir para a Página inicial</v-btn>

        <!-- <v-btn to="/" outlined color="primary">Ir para a Página inicial</v-btn> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FourOhFour",
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  created() {
    this.$ssrContext && this.$ssrContext.res.status(404);
  }
};
</script>

