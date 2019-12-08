<template>
  <div>
    <v-card color="transparent" flat>
      <!-- <v-list two-line v-for="contact in contacts" :key="contact.id"> -->
      <v-list two-line>

        <!-- <template v-for="(phone, index) in contact.phones"> -->
        <template>
          <!-- <v-list-tile @click="" :key="index+'phone'"> -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <!-- <v-icon color="indigo" v-if="index==0">phone</v-icon> -->
              <v-icon color="indigo">mdi-phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <!-- <v-list-tile-title>{{phone.number}}</v-list-tile-title> -->
              <v-list-tile-title>+238 9178599</v-list-tile-title>
              <!-- <v-list-tile-sub-title>{{phone.description}}</v-list-tile-sub-title> -->
              <v-list-tile-sub-title>Telefone de casa</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-divider inset></v-divider>

        <!-- <template v-for="(email, index) in contact.emails"> -->
        <template>
          <!-- <v-list-tile @click="" :key="index+'email'"> -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <!-- <v-icon color="indigo" v-if="index==0">email</v-icon> -->
              <v-icon color="indigo">mdi-email</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <!-- <v-list-tile-title>{{email.email}}</v-list-tile-title> -->
              <v-list-tile-title>eicm-gdc@gmail.com</v-list-tile-title>
              <v-list-tile-sub-title>Email da escola</v-list-tile-sub-title>
              <!-- <v-list-tile-sub-title>{{email.description}}</v-list-tile-sub-title> -->
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider inset></v-divider>

        <!-- <v-list-tile @click="showLocationDialog=true">
          <v-list-tile-action>
            <v-icon color="indigo">location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{contact.address.street}}</v-list-tile-title>
            <v-list-tile-sub-title>{{contact.address.country}}, {{contact.address.state}}, {{contact.address.city}}, {{contact.address.zone}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-card>

    <!-- <v-dialog
    v-model="showLocationDialog"
    max-width="890"
    >
    <v-card pa-1>
      <v-card-text>
        <eicm-location></eicm-location>
      </v-card-text>
    </v-card>
  </v-dialog> -->
</div>


</template>

<script>
// import EicmLocation from '@util/maps/EicmLocation.vue'
export default {
//   props: ['contacts'],
  data: () => ({
    // showLocationDialog: false,
  }),
  components: {
    // EicmLocation
  },
}
</script>
