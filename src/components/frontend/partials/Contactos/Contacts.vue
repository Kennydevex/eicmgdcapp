<template>
  <div class="mb-5">
    <v-card flat color="transparent">
      <v-card-text class="ma-0 pa-0">
        <v-list two-line color="transparent">
          <template v-for="(contact, c) in contacts">
            <v-list-item @click="()=>{}" :key="'f_contact'+c">
              <v-list-item-icon>
                <v-icon color="indigo">{{contact.type==1?'mdi-phone':'mdi-email'}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{contact.contact}}</v-list-item-title>
                <v-list-item-subtitle>{{contact.description}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider inset></v-divider>

          <v-list-item @click="()=>{this.showLocationDialog= true}">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-map-marker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{address.zone}} - {{address.street}}</v-list-item-title>
              <v-list-item-subtitle>{{address.country}} - {{address.state}} - {{address.city}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showLocationDialog" max-width="890">
      <v-card pa-1>
        <v-card-text>
          yes
          <!-- <eicm-location></eicm-location> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import EicmLocation from '@util/maps/EicmLocation.vue'
export default {
  props: ["contacts", "address"],
  data: () => ({
    showLocationDialog: false
  }),
  components: {
    // EicmLocation
  },

  
};
</script>
