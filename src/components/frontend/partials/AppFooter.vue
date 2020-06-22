<template>
  <v-footer class="appfooter" app absolute padless>
    <v-card tile width="100%" class="pa-0 overflow-scroll" max-height="400">
      <v-card-text class="blue-grey darken-3 white--text text-center">
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
                      <small>Subscreva com o seu email para estar em dia com as nossas publicações</small>
                    </v-col>
                    <v-col cols="12" class="px-0">
                      <v-text-field
                        dense
                        solo
                        hide-details
                        name="name"
                        label="Insira o seu e-mail"
                        id="id"
                        persistent-hint
                      >
                        <template v-slot:append>
                          <v-btn icon>
                            <v-icon>mdi-send</v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
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
                <v-card-text class="py-0 px-3 mt-2 text-center">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <ul type="none">
                        <template v-for="(course_link, i) in item_courses">
                          <li :key="i" class="ma-0 pa-0">
                            <!-- <a class="grey--text lighten-3" href="#">{{course_link}}</a> -->
                            <v-btn
                              exact
                              :ripple="false"
                              retain-focus-on-click
                              href="#"
                              target="_blank"
                              color="grey lighten-1"
                              class="py-1 ma-0 text-none font-weight-light"
                              small
                              text
                            >{{course_link}}</v-btn>
                          </li>
                        </template>
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
                <v-card-text
                  class="py-0 px-3 mt-2 grey--text text--lighten-3 text-md-right text-center"
                >
                  <v-row>
                    <v-col cols="12">
                      <ul type="none">
                        <template v-for="(external_link, i) in external_links">
                          <li :key="i" class="ma-0 pa-0">
                            <!-- <a class="grey--text lighten-3" href="#">{{course_link}}</a> -->
                            <v-btn
                              exact
                              :ripple="false"
                              retain-focus-on-click
                              href="#"
                              target="_blank"
                              color="grey lighten-1"
                              class="py-1 ma-0 text-none font-weight-light no-text-transform"
                              small
                              text
                            >{{external_link}}</v-btn>
                          </li>
                        </template>
                      </ul>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- <v-divider dark></v-divider> -->

      <v-card-actions class="blue-grey darken-3 grey--text text--darken-2">
        <span>Escola Comercial e Industrial do Mindelo - Guilherme dias Chantre - {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <small>
          Speeded by:
          <i>Decifra Code</i>
        </small>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-account-tie", "mdi-briefcase"],
    item_courses: [
      "Artes Gráficas",
      "Construção Cívil",
      "Contabilidade Administrativa",
      "Eletrícidade",
      "Electrotecnia",
      "Informática de Gestão",
      "Mécânica"
    ],
    external_links: ["CMSV", "Ministério de Educação", "Uni-CV", "IEFP"],
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
  methods: {}
};
</script>

<style lang="scss" scoped>
li {
  padding: 5px;
}
a {
  text-decoration: none;
  transition: color 0.6s;
  color: aliceblue;
}
a:hover {
  color: white;
}
</style>