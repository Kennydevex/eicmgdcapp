<template>
  <v-footer class="appfooter" app absolute padless>
    <v-card tile width="100%" class="pa-0 overflow-scroll" max-height="400">
      <v-card-text class="blue-grey darken-3 white--text text-center">
        <v-btn target="_blank" href="https://www.facebook.com" dark class="mx-4" icon>
          <v-icon size="24px">mdi-facebook</v-icon>
        </v-btn>

        <v-btn target="_blank" href="https://www.twitter.com" dark class="mx-4" icon>
          <v-icon size="24px">mdi-twitter</v-icon>
        </v-btn>

        <v-btn target="_blank" href="https://www.linkedin.com" dark class="mx-4" icon>
          <v-icon size="24px">mdi-linkedin</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="blue-grey darken-3 py-0">
        <v-container grid-list-xl>
          <v-row>
            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 my-5 pt-0 pb-3"
                  primary-title
                >Subscrição</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="py-0 px-4 mt-2 grey--text text--lighten-3 text-sm-left">
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <small>Subscreva com o seu email para estar em dia com as nossas publicações</small>
                    <subscribe></subscribe>
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 my-5 pt-0 pb-3"
                  primary-title
                >Cursos técnicos</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="py-0 px-3 mt-2 text-center">
                  <courses></courses>
                </v-card-text>
              </v-card-text>
            </v-col>

            <v-col cols="12" md="4" class="py-0">
              <v-card-text class="py-0">
                <v-card-title
                  class="font-weight-light justify-center grey--text text--lighten-3 my-5 pt-0 pb-3"
                  primary-title
                >Ligações Externas</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text
                  class="py-0 px-3 mt-2 grey--text text--lighten-3 text-md-right text-center"
                >
                  <v-row>
                    <v-col cols="12">
                      <ul type="none">
                        <li class="ma-0 pa-0">
                          <v-btn
                            href="https://www.cmsv.cv"
                            :ripple="false"
                            retain-focus-on-click
                            target="_blank"
                            color="grey lighten-1"
                            class="py-1 ma-0 text-none font-weight-light no-text-transform"
                            small
                            text
                          >CMSV</v-btn>
                        </li>

                        <li class="ma-0 pa-0">
                          <v-btn
                            :ripple="false"
                            retain-focus-on-click
                            href="https://www.cmsv.cv"
                            target="_blank"
                            color="grey lighten-1"
                            class="py-1 ma-0 text-none font-weight-light no-text-transform"
                            small
                            text
                          >Ministério de Educação</v-btn>
                        </li>

                        <li class="ma-0 pa-0">
                          <v-btn
                            :ripple="false"
                            retain-focus-on-click
                            href="https://www.cmsv.cv"
                            target="_blank"
                            color="grey lighten-1"
                            class="py-1 ma-0 text-none font-weight-light no-text-transform"
                            small
                            text
                          >IEFP</v-btn>
                        </li>

                        <li class="ma-0 pa-0">
                          <v-btn
                            :ripple="false"
                            retain-focus-on-click
                            :href="'https://www.cmsv.cv'"
                            target="_blank"
                            color="grey lighten-1"
                            class="py-1 ma-0 text-none font-weight-light no-text-transform"
                            small
                            text
                          >Uni-CV</v-btn>
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

      <v-card-actions class="blue-grey darken-3 grey--text text--darken-2">
        <small>Escola Comercial e Industrial do Mindelo - Guilherme dias Chantre - {{ new Date().getFullYear() }}</small>
        <v-spacer></v-spacer>
        <small>
          Por:
          <i>DicifraKodigu</i>
        </small>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
import Subscribe from "./Footer/Subscribe";
import Courses from "./Footer/Courses";
export default {
  components: {
    Subscribe,
    Courses
  }
};
</script>
