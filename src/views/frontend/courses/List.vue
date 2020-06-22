<template>
  <v-container grid-list-xs py-2>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-card class="pa-0" tile flat>
          <v-tabs v-model="tab" background-color="transparent" color="primary" left>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-cvt">Cursos Via da Técnica</v-tab>
            <v-tab href="#tab-fp">Formações Profissionais</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- Cursos da Via Técnica -->
            <v-tab-item value="tab-cvt">
              <v-card flat>
                <v-card-text>
                  <course-presentation-card :courses="actived_courses" :type="1" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Formação Profissional -->
            <v-tab-item value="tab-fp">
              <v-card flat>
                <v-card-text>
                  <course-presentation-card :courses="actived_courses" :type="2" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import CoursePresentationCard from "./partials/CoursePresentationCard";

export default {
  mixins: [getDatas],

  data() {
    return {
      tab: null
    };
  },

  created: function() {
    this.getAll(this.actived_courses, "getActivedCourses");
  },

  computed: {
    actived_courses: function() {
      return this.$store.getters.actived_courses;
    }
  },

  components: {
    CoursePresentationCard
  }
};
</script>


