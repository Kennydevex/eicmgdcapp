<template lang="html">
  <v-card color="white" flat tile mr-5>
    <v-container fluid grid-list-xs,sm,md,lg,xl>
        <v-row>
            <v-col cols="12" align="center" justify="center">
                <h3 class="text-uppercase font-weight-light text--primary">Contactos</h3>
            </v-col>
        </v-row>

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
  </v-card>
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
