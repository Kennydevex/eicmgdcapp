<template>
  <v-card v-if="course">
    <v-card-title primary-title>
      <small class="font-weight-light text-capitalize">
        <v-icon>mdi-pencil</v-icon>
        <small>&emsp;Editar Informações do Curso</small>
      </small>
    </v-card-title>
    <v-card-text>
      <course-form :formData="course" :update_form="true"></course-form>
    </v-card-text>
  </v-card>
</template>

 
<script>
import CourseForm from "@/forms/CourseForm";

import { getDatas, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [getDatas, deleteData],

  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    this.getAll(this.courses, "getCourses");
  },

  computed: {
    courses: function() {
      return this.$store.getters.courses;
    },
    course: function() {
      return this.$store.getters.course(this.slug);
    }
  },

  methods: {
    onUpdateCourse() {
      window.getApp.$emit("APP_UPDATE_COURSE");
    }
  },

  components: {
    CourseForm
  }
};
</script>