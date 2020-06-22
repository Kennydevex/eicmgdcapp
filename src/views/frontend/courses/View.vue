<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        <course-info :course="course"></course-info>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import CourseInfo from "@/components/common/CourseInfo";

export default {
  mixins: [getDatas],
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

  components: {
    CourseInfo
  }
};
</script>