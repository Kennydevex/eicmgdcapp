
<template>
  <v-container grid-list-xs mb-0>
    <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Cursos Em Destaques</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>
    <v-row
      data-aos="fade-in"
      data-aos-duration="2000"
      class="fill-height"
      align="start"
      justify="center"
    >
      <template v-for="(course, i) in formations">
        <v-col :key="i" cols="12" :md="formations.length==1?'12':formations.length==2?'6':'4'">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" tile>
              <v-img
                max-height="300"
                :aspect-ratio="16/9"
                :src="`${apiUrl}/images/app/courses/covers/${course.cover}`"
              >
                <v-expand-transition>
                  <div
                    :style="{backgroundColor: course.color}"
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-1 white--text text-capitalize"
                    style="height: 100%;"
                  >{{dateForHumanPresentation(course.release)}}</div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                <v-btn
                  @click="onView('course_info', course.slug)"
                  small
                  absolute
                  :color="course.color"
                  class="white--text"
                  fab
                  right
                  top
                >
                  <v-icon>mdi-book-open-page-variant</v-icon>
                </v-btn>
                <div
                  :style="{color: course.color}"
                  class="font-weight-light title mb-2 text-capitalize"
                  v-text="course.name"
                ></div>
                <!-- <h3 class="display-1 font-weight-light orange--text mb-2">QW cooking utensils</h3> -->
                <v-divider></v-divider>
                <div>
                  <p class="font-weight-light mb-2">{{course.description|truncate(100)}}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";
import { dateFormat } from "@/mixins/DateTime";
import moment from "moment";
moment.locale("pt-pt");

export default {
  mixins: [truncateFilter, viewAndUpdate, dateFormat],

  props: ["formations"],

  data: () => ({})

  // methods: {
  //   releaseDatePresentation(date) {
  //     return date ? moment(date).fromNow() : "";
  //   }
  // }
};
</script>


<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

