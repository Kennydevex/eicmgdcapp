<template>
  <v-container grid-list-xs fluid ma-0 pa-0>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text class="ma-0 pa-0">
            <v-subheader>Registo da instituição</v-subheader>
            <course-form :formData="formData" :updating="false"></course-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CourseForm from "@/forms/CourseForm";

export default {
  data() {
    return {
      formData: {
        name: "",
        opning: ""
      }
    };
  },

  components: {
    CourseForm
  }
};
</script>