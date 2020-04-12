<template>
  <v-footer class="appfooter" app absolute padless>
    <v-card tile width="100%" class="pa-0">
      <v-card-text class="cyan darken-4 white--text text-center">
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

      <v-card-text class="blue-grey darken-3 py-0">
        <v-container grid-list-xl>
          <!-- <v-row align="start" justify="center"> -->
          <v-row>
            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 pt-0 pb-3"
                  primary-title
                >Subscrição</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="py-0 px-4 mt-2 grey--text text--lighten-3 text-sm-left">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                        dark
                        filled
                        outlined
                        name="name"
                        label="Insira seu e-mail"
                        id="id"
                        hint="Subscreva e esteja em dia com as publicações da EICM-GDC"
                        persistent-hint
                        append-outer-icon="mdi-send"
                        @click:append-outer="test"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 pt-0 pb-3"
                  primary-title
                >Cursos técnicos</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="py-0 px-3 mt-2 grey--text text--lighten-3 text-right">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <ul type="none">
                        <li>
                          <a href="#">Artes Gráficas</a>
                        </li>
                        <li>
                          <a href="#">Construção Cívil</a>
                        </li>
                        <li>
                          <a href="#">Contabilidade Administrativa</a>
                        </li>
                        <li>
                          <a href="#">Eletrícidade</a>
                        </li>
                        <li>
                          <a href="#">Electrotecnia</a>
                        </li>
                        <li>
                          <a href="#">Informática de Gestão</a>
                        </li>
                        <li>
                          <a href="#">Mécânica</a>
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>

            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 pt-0 pb-3"
                  primary-title
                >Ligações Externas</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="py-0 px-3 mt-2 grey--text text--lighten-3 text-right">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <ul type="none">
                        <li>
                          <a href="#">Camara Municipal de São Vicente</a>
                        </li>
                        <li>
                          <a href="#">Ministério de Educação</a>
                        </li>
                        <li>
                          <a href="#">Universidade de Cabo Verde</a>
                        </li>
                        <li>
                          <a href="#">Instituto de Ensino e Formação Profissional</a>
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="blue-grey darken-4 grey--text text--darken-2">
        <span>Escola Comercial e Industrial do Mindelo - Guilherme dias Chantre - {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <small>Speeded by: <i>Decifra Code</i> </small>
      </v-card-actions>
      
    </v-card>
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
        //eslint-disable-next-line no-unused-vars
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      },
      {
        icon: "mdi-twitter",
        name: "teste",
        //eslint-disable-next-line no-unused-vars
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      },
      {
        icon: "mdi-linkedin",
        name: "teste",
        //eslint-disable-next-line no-unused-vars
        click: e => {
          this.$router.push({
            name: "teste"
          });
        }
      }
    ]
  }),
  methods: {
    test() {}
  }
};
</script>

<style lang="scss" scoped>
li {
  padding: 2px;
}
a {
  text-decoration: none;
}
a:hover {
  color: white;
}
</style>