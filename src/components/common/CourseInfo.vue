<template>
  <div>
    <v-card :flat="flat">
      <v-img
        :contain="course.cover=='default.svg'"
        :src="`${apiUrl}/images/app/courses/covers/${course.cover}`"
        aspect-ratio="3.75"
      >
        <v-row class="ma-3">
          <v-col cols="10" justify="end" align="start">
            <h1 class="white--text font-weight-light">{{course.name}}</h1>
          </v-col>

          <v-col cols="2" align="right">
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-img>
      <v-card-title primary-title>{{course.name}}</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <small>Curso lançado em: {{course.release}}</small>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { cancelActions } from "@/mixins/Redirects";
import { deleteData } from "@/mixins/SendForm";

export default {
  mixins: [deleteData, cancelActions],
  props: ["course", "flat"]
};
</script>