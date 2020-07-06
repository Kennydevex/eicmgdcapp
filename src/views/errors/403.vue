<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-row align="center">
      <v-col align="center">
        <v-card class="elevation-5 pa-5">
          <img
            :src="require('../../assets/logos/principal_logo.svg')"
            alt="EICM-GDC"
            width="250"
            height="auto"
          />

          <v-card-text>
            <h1 class="display-2 primary--text">403</h1>
            <p>Agradecemos a sua preferência e pedimos desculpas caso for falha do sistema, mas, por agora não tens permissão para acessar esta página</p>
            <p>
              <small>Reinicie a sua sessão, caso for engano, contacte o sdministrador</small>
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn @click.stop="onView('home_page')" outlined large text color="primary">
              <v-icon x-large>mdi-home</v-icon>Página Principal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { viewAndUpdate, cancelActions } from "@/mixins/Redirects";

export default {
  name: "FourOhThree",
  mixins: [cancelActions, viewAndUpdate],

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

