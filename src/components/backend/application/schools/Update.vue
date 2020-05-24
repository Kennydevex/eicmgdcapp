<template>
  <v-container grid-list-xs fluid ma-0 pa-0>
    <v-row>
      <v-col>
        <v-skeleton-loader v-if="!school"  class="mx-auto" type="article, actions"></v-skeleton-loader>
        <v-card v-else>
          <v-card-text class="ma-0 pa-0">
            <v-subheader>Atualizar instituição</v-subheader>
            <school-form :formData="school" :update_form="true"></school-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SchoolForm from "@/forms/SchoolForm";
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [getDatas],
  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    this.getAll(this.schools, "getSchools");
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    },

    school: function() {
      return this.$store.getters.school(this.slug);
    }
  },

  components: {
    SchoolForm
  }
};
</script>