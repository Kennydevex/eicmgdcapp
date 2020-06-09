
<template>
  <v-container grid-list-xs mb-0>
    <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Formações Em Destaque</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>

    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(course, i) in courses">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card
              @click="verFormacao"
              class="pa-2"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img :src="course.img" height="250">
                <v-card-title class="title white--text ma-4">
                  <v-row class="fill-height flex-column" justify="space-between">
                    <p class="mt-2 subheading text-center">{{ course.name }}</p>

                    <div>
                      <p
                        class="ma-0 body-1 font-weight-regular text-justify"
                      >{{course.presentation|truncate(100)}}</p>
                      <v-divider></v-divider>
                      <span class="caption font-weight-regular text-left">
                        <v-icon dark small>mdi-clock</v-icon>
                        {{course.start}}
                      </span>
                        
                    </div>
                    <div v-if="hover">
                      <v-btn @click="verFormacao" outlined small color="primary" dark>Ver...</v-btn>
                      <!-- <v-btn icon dark><v-icon>mdi-share-variant</v-icon></v-btn> -->
                    </div>
                  </v-row>
                </v-card-title>
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

  data: () => ({
    icons: ["mdi-share-variant"],
    courses: [
      {
        name: "Informatica de Gestao",
        presentation:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci possimus sapiente quidem laudantium voluptatum perferendis eaque sunt deleniti repellendus repellat.",
        start: "Ha 10 dias",
        img: "https://i.picsum.photos/id/1012/3973/2639.jpg"
      },
      {
        name: "Mecanica",
        presentation:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci possimus sapiente quidem laudantium voluptatum perferendis eaque sunt deleniti repellendus repellat.",
        start: "Ha 2 anos",
        img: "https://i.picsum.photos/id/1018/3914/2935.jpg"
      },
      {
        name: "Eletricidade",
        presentation:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci possimus sapiente quidem laudantium voluptatum perferendis eaque sunt deleniti repellendus repellat.",
        start: "Ha 1 Mês",
        img: "https://i.picsum.photos/id/1022/6000/3376.jpg"
      }
    ],
    transparent: "rgba(255, 255, 255, 0)"
  }),

  methods: {
     verFormacao() {
      // eslint-disable-next-line no-console
      console.log("Viasualizar informações da formação ");
    }
  }
};
</script>


