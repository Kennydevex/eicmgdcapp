<template>
  <v-row>
    <v-col
      cols="12"
      class="ma-0 pt-0 pb-5"
      v-if="!actived_sliders.length && !actived_sliders.length && !featured_employees.length && !featured_courses.length && !murals.length && !schools.length"
    >
      <v-container grid-list-xs>
        <v-row>
          <template v-if="!actived_sliders.length">
            <v-col cols="12" class="pt-0 mb-5">
              <v-skeleton-loader boilerplate type="image"></v-skeleton-loader>
            </v-col>
          </template>

          <template>
            <v-col cols="4" align="center">
              <v-skeleton-loader boilerplate type="avatar"></v-skeleton-loader>
            </v-col>
            <v-col cols="4" align="center">
              <v-skeleton-loader boilerplate type="avatar"></v-skeleton-loader>
            </v-col>
            <v-col cols="4" align="center">
              <v-skeleton-loader boilerplate type="avatar"></v-skeleton-loader>
            </v-col>
          </template>

          <template>
            <v-col cols="12" md="6">
              <v-skeleton-loader boilerplate type="list-item-three-line"></v-skeleton-loader>
            </v-col>
            <v-col cols="12" md="6">
              <v-skeleton-loader boilerplate type="list-item-three-line"></v-skeleton-loader>
            </v-col>
          </template>

          <template>
            <v-col cols="12" md="4">
              <v-skeleton-loader boilerplate type="image"></v-skeleton-loader>
            </v-col>
            <v-col cols="12" md="4">
              <v-skeleton-loader boilerplate type="image"></v-skeleton-loader>
            </v-col>

            <v-col cols="12" md="4">
              <v-skeleton-loader boilerplate type="image"></v-skeleton-loader>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="12" class="ma-0 pa-0">
      <section v-if="actived_sliders.length">
        <app-slider :sliders="actived_sliders"></app-slider>
      </section>

      <section v-if="murals.length">
        <app-murals :murals="murals"></app-murals>
      </section>

      <section v-if="featured_employees.length" class="grey lighten-3">
        <app-team :teams="featured_employees"></app-team>
      </section>

      <section v-if="featured_courses.length">
        <app-featured-formations :formations="featured_courses"></app-featured-formations>
      </section>

      <section v-if="featured_articles.length" class="white">
        <v-container grid-list-xs>
          <v-row>
            <v-col cols="12" align="left" justify="center">
              <h4 class="text-uppercase font-weight-light">EICM Blog</h4>
              <div class="title-divider"></div>
            </v-col>
          </v-row>
        </v-container>
        <app-blog :featured_articles="featured_articles"></app-blog>
      </section>

      <section class="grey lighten-3" v-if="schools.length">
        <app-contacts :schoolData="schools"></app-contacts>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import AppSlider from "@/components/frontend/partials/AppSlider";
import AppBlog from "@/components/frontend/partials/AppBlog";
import AppMurals from "@/components/frontend/partials/AppMurals";
import AppTeam from "@/components/frontend/partials/AppTeam";
import AppFeaturedFormations from "@/components/frontend/partials/AppFeaturedFormations";
import AppContacts from "@/components/frontend/partials/AppContacts";

export default {
  mixins: [getDatas],

  data() {
    return {
      formations: [
        {
          id: 1,
          name: "Electricidade",
          efect: "slide-right"
        },
        {
          id: 2,
          name: "Meccanica",
          efect: "slide-up"
        },
        {
          id: 3,
          name: "Contabilidade",
          efect: "slide-left"
        }
      ]
    };
  },

  components: {
    AppSlider,
    AppBlog,
    AppMurals,
    AppTeam,
    AppFeaturedFormations,
    AppContacts
  },

  created: function() {
    this.getAll(this.featured_courses, "getActivedCourses");
    this.getAll(this.teams, "getTeams");
    this.getAll(this.published_articles, "getPublishedArticles");
    this.getAll(this.murals, "getMurals");
    this.getAll(this.actived_sliders, "getActivedSliders");
    this.getAll(this.schools, "getSchools");
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    },
    published_articles: function() {
      return this.$store.getters.published_articles;
    },

    teams: function() {
      return this.$store.getters.teams;
    },

    actived_sliders: function() {
      return this.$store.getters.actived_sliders;
    },

    murals: function() {
      return this.$store.getters.murals;
    },

    featured_courses: function() {
      return this.$store.getters.featured_courses;
    },

    featured_employees: function() {
      return this.$store.getters.featured_employees;
    },

    featured_articles: function() {
      return this.$store.getters.featured_articles;
    }
  }
};
</script>