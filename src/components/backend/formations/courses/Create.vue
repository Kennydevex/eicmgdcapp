<template>
  <v-container grid-list-xs fluid ma-0 pa-0>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text class="ma-0 pa-0">
            <v-subheader>Registo de novo curso</v-subheader>
            <course-form :formData="formData" :update_form="false"></course-form>
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
        id:'',
        name: "",
        description: "",
        release: "",
        requirement: "",
        duration_type: "1",
        duration: "2",
        status: false,
        featured: false,
        type: "",
        color: "#FFFFFFFF",
        cover: null,
        department_id: "",
        school_id: "",
        outcomes: [],
        teachers: [
          {
            coordination: {
              course_id: "",
              teacher_id: "",
              start_date: "",
              end_date: ""
            }
          }
        ],

        disciplines: []
      }
    };
  },

  components: {
    CourseForm
  }
};
</script>