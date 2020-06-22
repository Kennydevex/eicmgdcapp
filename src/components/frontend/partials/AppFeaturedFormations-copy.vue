
<template>
  <v-container grid-list-xs mb-0>
    <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Formações Em Destaque</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>

    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(course, i) in formations">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card
              @click="verFormacao"
              class="pa-2"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img  :src="`${apiUrl}/images/app/courses/covers/${course.cover}`" height="200">
              <div class="fill-height bottom-gradient"></div>
                <v-container grid-list-xs>
                  <v-row align="end" class="fill-height flex-column" justify="space-between">
                    <v-col>
                      <h3 class="subheading text-center white--text text-uppercase font-weight-light">{{ course.name }}</h3>

                      <div>
                        <p
                          class="ma-0 body-1 font-weight-regular text-justify"
                        >{{course.description|truncate(50)}}</p>
                        <v-divider></v-divider>
                        <span class="caption font-weight-regular text-left">
                          <v-icon dark small>mdi-clock</v-icon>
                          {{course.release}}
                        </span>
                      </div>
                      <div>
                        <v-btn @click="verFormacao" outlined small color="primary" dark>Ver...</v-btn>
                        <!-- <v-btn icon dark><v-icon>mdi-share-variant</v-icon></v-btn> -->
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [truncateFilter],

  props: ["formations"],

  data: () => ({}),

  methods: {
    verFormacao() {
      // eslint-disable-next-line no-console
      console.log("Viasualizar informações da formação ");
    }
  }
};
</script>


<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

   .bottom-gradient:hover {
    background-image: transtarent;
  }

</style>


