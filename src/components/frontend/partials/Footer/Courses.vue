<template>
  <div>
    <v-row>
      <v-col cols="12" class="pa-0">
        <ul type="none">
          <template v-for="(course_link, i) in courses">
            <li :key="i" class="ma-0 pa-0">
              <v-btn
                :ripple="false"
                retain-focus-on-click
                color="grey lighten-1"
                class="py-1 ma-0 text-none font-weight-light"
                small
                text
                @click.stop="onView('course_info', course_link.slug)"
              >{{course_link.name}}</v-btn>
            </li>
          </template>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import { viewAndUpdate } from "@/mixins/Redirects";

export default {
  mixins: [getDatas, viewAndUpdate],

  data() {
    return {};
  },

  created: function() {
    this.getAll(this.courses, "getActivedCourses");
  },

  computed: {
    courses: function() {
      return this.$store.getters.cursos_via_tecnica;
    }
  },

  methods: {}
};
</script>