<template>
  <div>
    <v-row>
      <template v-for="(school, s) in schools">
        <v-col :key="'school_'+s" class="mt-0 pt-0">
          <v-card tile>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="require('@/assets/app/logo.png')"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{school.abbreviation}}</v-list-item-title>
                <v-list-item-subtitle>{{school.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
               <v-btn icon color="grey">
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </v-list-item>

            <v-img :src="require('@/assets/app/sliders/slide2.gif')" height="194"></v-img>

            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
               <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show_contact_info = !show_contact_info">
                <v-icon>{{ show_contact_info ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show_contact_info">
                <v-divider></v-divider>
                <v-card-text>
                  <v-list two-line>
                    <template v-for="(phone, k) in school.phones">
                      <v-list-item :key="k+'sphone'">
                        <v-list-item-action>
                          <v-icon v-if="k == 0" color="primary">mdi-phone</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title v-text="phone.number"></v-list-item-title>
                          <v-list-item-subtitle v-text="phone.description"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon>mdi-message-text</v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </template>

                    <v-divider></v-divider>
                    <template v-for="(email, k) in school.emails">
                      <v-list-item :key="k+'semail'">
                        <v-list-item-action>
                          <v-icon v-if="k == 0" color="primary">mdi-email</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title v-text="email.email"></v-list-item-title>
                          <v-list-item-subtitle v-text="email.description"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <v-divider></v-divider>

                    <v-list-item @click="testes">
                      <v-list-item-action>
                        <v-icon color="primary">mdi-map-marker</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="school.address.street"></v-list-item-title>
                        <v-list-item-subtitle>{{school.address.country}}, {{school.address.state}}, {{school.address.city}}, {{school.address.zone}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col>
        <v-card id="sliders-action">
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
            <v-btn :to="{ name: 'add_school'}" v-if="canAdd()" fab dark small color="primary">
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
      fab: false,
      show_contact_info: false,
      schools: [
        {
          id: 1,
          name: "Escola Industrial e Comercial do Mindelo",
          abbreviation: "EICM-GDC",
          description: "Escola técnica do Mindelo",
          slogan: "Educação para crescer",
          logo: "",
          cover: "",
          primary_color: "#00ff00",
          secundary_color: "#00ffaa",
          opning: "1989-03-03",
          phones: [
            {
              id: 1,
              number: "+238 2324563",
              description: "Telefone da secretaria"
            },
            {
              id: 2,
              number: "+238 2324564",
              description: "Telefone da direção"
            }
          ],
          emails: [
            {
              id: 1,
              email: "eicmgdc@gmail.com",
              description: "Email da secretaria"
            },
            {
              id: 2,
              email: "eicm_gdcdir@gmail.com",
              description: "Email da direção"
            }
          ],
          address: {
            country: "Cabo Verde",
            state: "São Vicente",
            city: "Mindelo",
            zone: "Laginha",
            street: "faed",
            post_code: "7100",
            location: {
              lat: 27.876354,
              lng: 37.876354
            }
          }
        }
      ]
    };
  },
  methods: {
    testes() {
      // eslint-disable-next-line no-console
      console.log("teste");
    }
  }
};
</script>

<style lang="scss" scoped>
#sliders-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#sliders-action .v-btn--floating {
  position: relative;
}
</style>