<template>
  <div>
    <v-row>
      <template v-for="(school, s) in schools">
        <v-col cols="12" md="6" :key="'school_'+s" class="mt-0 pt-0">
          <v-card tile>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="require('@/assets/app/logo.png')"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{school.abbr}}</v-list-item-title>
                <v-list-item-subtitle>{{school.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn icon color="grey">
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </v-list-item>

            <v-img :src="require('@/assets/app/sliders/slide2.gif')" height="194"></v-img>

            <v-expand-transition>
              <div v-show="show_contact_info[school.id]">
                <v-divider></v-divider>
                <v-card-text>
                  <v-list two-line>
                    <template v-for="(contact, k) in school.contacts">
                      <div :key="'phone'+k">
                        <v-list-item v-if="contact.type==1">
                          <v-list-item-action>
                            <!-- <v-icon v-if="k == 0" color="primary">mdi-phone</v-icon> -->
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title v-text="contact.contact"></v-list-item-title>
                            <v-list-item-subtitle v-text="contact.description"></v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-icon>mdi-message-text</v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </div>
                    </template>

                    <v-divider></v-divider>

                    <template v-for="(contact, e) in school.contacts">
                      <div :key="'email'+e">
                        <v-list-item v-if="contact.type==2">
                          <v-list-item-action>
                            <!-- <v-icon v-if="e < e+1" color="primary">mdi-email</v-icon> -->
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title v-text="contact.contact"></v-list-item-title>
                            <v-list-item-subtitle v-text="contact.description"></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
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

            <v-card-actions>
              <v-btn icon @click="onView('view_school', school.slug)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon @click="onUpdate('update_school', school.slug)">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="onDelete('schools',school.id,'APP_UPDATE_ALL_SCHOOLS_DATA')">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="more_details(school.id)">
                <v-icon>{{ show_contact_info[school.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
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
import { viewAndUpdate } from "@/mixins/Redirects";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";

export default {
  mixins: [
    viewAndUpdate,
    getDatas,
    getData,
    deleteData,
    flashAlert,
    actionAlert
  ],
  data() {
    return {
      fab: false,
      // show_contact_info: false,
      show_contact_info: {}
    };
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    }

    // phone
  },

  created: function() {
    this.getAll(this.schools, "getSchools");
    window.getApp.$on("APP_UPDATE_ALL_SCHOOLS_DATA", () => {
      this.refresh("getSchools");
    });
  },

  methods: {
    more_details(id) {
      if (this.show_contact_info[id])
        this.$set(this.show_contact_info, id, false);
      else this.$set(this.show_contact_info, id, true);
    },
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