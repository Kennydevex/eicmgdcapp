<template>
  <div>
    <v-card flat color="transparent">
      <v-card-text class="mx-0 px-0">
        <v-list two-line>
          <v-list-item @click="test">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-phone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>

          <!-- <v-list-item @click="test">
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(323) 555-6789</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->

          <!-- <v-divider inset></v-divider> -->

          <v-list-item @click="test">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-email</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>aliconnors@example.com</v-list-item-title>
              <v-list-item-subtitle>Personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item @click="test">
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>ali_connors@example.com</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->

          <!-- <v-divider inset></v-divider> -->

          <v-list-item @click="test">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-map-marker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>1400 Main Street</v-list-item-title>
              <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
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
    </v-dialog>-->
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

  methods: {
    test() {}
  }
};
</script>
