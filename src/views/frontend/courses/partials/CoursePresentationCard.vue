<template>
  <div>
    <v-row>
      <template v-for="(course, c) in courses">
        <v-col
          :key="'coourse_cvt_'+c"
          cols="12"
          md="4"
          sm="6"
          v-if="course.type==type"
          class="pa-2"
        >

          <v-card tile>
            <v-img height="130" :src="`${apiUrl}/images/app/courses/covers/${course.cover}`">
              <v-row>
                <v-col aling="end">
                  <v-icon>mdi-alert-decagram</v-icon>
                </v-col>
              </v-row>
            </v-img>

            <v-card-title class="font-weight-regular">{{course.name}}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                <div class="grey--text ml-4">4.5 (413)</div>
              </v-row>

              <div
                class="my-1 grey--text text-capitalize"
              >{{dateForHumanPresentation(course.release)}}</div>

              <div>{{course.description|truncate(100)}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn class="text-none" @click="onView('course_info', course.slug)" color="primary" text>Detalhes</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { dateFormat } from "@/mixins/DateTime";
import { truncateFilter } from "@/mixins/Filters";
import { viewAndUpdate } from "@/mixins/Redirects";

export default {
  mixins: [truncateFilter, viewAndUpdate, dateFormat],

  props: ["courses", "type"]
};
</script>