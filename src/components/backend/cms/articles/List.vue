<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title primary-title>
            Artigos
            <v-spacer></v-spacer>

            <v-text-field name="name" label="Procurar" id="search" outlined></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-card>
                  <v-list-item>
                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Estefanio Silva</v-list-item-title>
                      <v-list-item-subtitle>Escrito por: Estefanio Silva</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

                  <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

                  <v-card-actions>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card>
                  <v-list-item>
                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Estefanio Silva</v-list-item-title>
                      <v-list-item-subtitle>Escrito por: Estefanio Silva</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

                  <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

                  <v-card-actions>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card>
                  <v-list-item>
                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Estefanio Silva</v-list-item-title>
                      <v-list-item-subtitle>Escrito por: Estefanio Silva</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

                  <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

                  <v-card-actions>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn text color="primary" icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>Botons de next e mais</v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card id="articles-action">
          <v-speed-dial
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn :to="{ name: 'add_article'}" v-if="canAdd()" fab dark small color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  }
};
</script>

<style lang="scss" scoped>
#articles-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#articles-action .v-btn--floating {
  position: relative;
}
</style>