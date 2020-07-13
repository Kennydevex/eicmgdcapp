<template lang="html">
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Contactos</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="schoolData.length!=0" cols="12" md="5">
        <contacts :contacts="schoolData[0].contacts" :address="schoolData[0].address"></contacts>
      </v-col>

      <v-col data-aos="fade-left" data-aos-duration="2000"  cols="12" md="7">
        <to-contact></to-contact>
      </v-col>
      </v-row>
    </v-container>
</template>

<script>
import Contacts from "../partials/Contactos/Contacts";
import ToContact from "../partials/Contactos/ToContact";

export default {
  props: ["schoolData"],
  components: {
    Contacts,
    ToContact
  }
};
</script>
<style lang="scss" scoped>
</style>
