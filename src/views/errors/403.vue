<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex text-center>
        <img :src="require('../../assets/logo.png')" alt="EICM-GDC" width="250" height="auto" />
        <h1 class="display-2 primary--text">Upsss, 403</h1>
        <p>Agradecemos a sua preferência e pedimos desculpas caso for falha do sistema, mas, por agora não tens permissão para acessar esta página</p>
        <p>
          
          <small>Reinicie a sua sessão, caso for engano, contacte o sdministrador</small>
        </p>
        <!-- <v-btn to="/" outlined color="primary">Ir para a Página inicial</v-btn> -->
        <v-btn x-large text icon to="/" outlined color="primary"><v-icon x-large>mdi-home</v-icon></v-btn>

        <!-- <v-btn to="/" outlined color="primary">Ir para a Página inicial</v-btn> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FourOhThree",
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  created() {
    this.$ssrContext && this.$ssrContext.res.status(403);
  }
};
</script>

