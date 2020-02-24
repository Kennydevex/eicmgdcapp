<template lang="html">
    <v-container grid-list-xs>
          <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Contactos</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>
        
          <!-- <v-divider></v-divider> -->

         <v-row>
            <v-col cols="12" sm="6">
                <!-- <contacts :contacts="schoolContacts"></contacts> -->
                <contacts></contacts>
            </v-col>

            <v-col cols="12" sm="6">
                <to-contact></to-contact>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Contacts from "../partials/Contactos/Contacts";
import ToContact from "../partials/Contactos/ToContact";
export default {
  //   props: ["schoolContacts"],
  components: {
    Contacts,
    ToContact
  }
};
</script>
<style lang="scss" scoped>
</style>
