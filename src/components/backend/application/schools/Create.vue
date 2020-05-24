<template>
  <v-container grid-list-xs fluid ma-0 pa-0>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text class="ma-0 pa-0">
            <v-subheader>Registo da instituição</v-subheader>
            <school-form :formData="formData" :updating="false"></school-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SchoolForm from "@/forms/SchoolForm";

export default {
  data() {
    return {
      formData: {
        name: "",
        abbr: "",
        description: "",
        slogan: "",
        logo: "",
        cover: "",
        primary_color: "",
        secundary_color: "",
        opning: new Date().toISOString().substr(0, 10),

        contacts: [
          {
            type: '1',
            contact: "",
            description: ""
          }
        ],

        address: {
          country: "Cabo Verde",
          state: "",
          city: "",
          zone: "",
          street: "",
          post_code: "",
          location: {
            lat: "22",
            lng: "29"
          }
        }
      }
    };
  },

  components: {
    SchoolForm
  }
};
</script>