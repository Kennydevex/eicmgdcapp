<template>
  <v-footer app absolute padless>
    <v-card-text flat tile width="100%" class="pa-0 text-center">
      <v-card-text class="cyan darken-4 white--text">
        <v-btn
          dark
          v-for="item in items"
          :key="item.icon"
          :to="{ name: item.name }"
          class="mx-4"
          icon
        >
          <v-icon size="24px">{{ item.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-text class="blue-grey darken-3 white--text">
        <v-container grid-list-xl>
          <v-row align="start" justify="center">
            <v-col cols="12" md="4">
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Subscrição</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        dark
                        filled
                        outlined
                        name="name"
                        label="Insira seu e-mail"
                        id="id"
                        hint="Subscreva para receber notificações em primeira mão"
                        persistent-hint
                        append-outer-icon="mdi-send"
                        @click:append-outer="test"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Serviços</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-layout row wrap>
                    <v-flex xs12>Lista de serviços e recursos da plataforma</v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
            </v-col>

            <v-col cols="12" md="4">
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Ligações</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-row>
                    <v-col cols="12">Ligações com outras empresas ou instituições</v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text class="blue-grey darken-4 white--text">
        {{ new Date().getFullYear() }} —
        <strong>EICM - GDC</strong>
      </v-card-text>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-account-tie", "mdi-briefcase"],
    items: [
      {
        icon: "mdi-facebook",
        name: "teste",
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      },
      {
        icon: "mdi-twitter",
        name: "teste",
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      },
      {
        icon: "mdi-linkedin",
        name: "teste",
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      }
    ]
  }),
  methods: {
    test() {
      console.log("teste de tese");
    }
  }
};
</script>