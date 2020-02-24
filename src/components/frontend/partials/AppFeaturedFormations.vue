
<template>
  <v-container grid-list-xs mb-8>
    <v-row>
      <v-col cols="12" align="left" justify="center">
        <h4 class="text-uppercase font-weight-light">Formações Em Destaque</h4>
        <div class="title-divider"></div>
      </v-col>
    </v-row>
    <!-- <v-row justify="center">
      <template v-for="(formation, f) in formations">
        <v-col cols="12" md="4" align="center" justify="center" :key="'formacao_em_d_'+f">
          <v-card @click="teste()" tile :data-aos="formation.efect" data-aos-duration="2000">
            <v-img :src="require('@/assets/app/sliders/slide1.gif')">
              <v-layout column fill-height>
                <v-spacer></v-spacer>
                <v-card-title class="white--text">
                  <div class="font-weight-light">{{formation.name}}</div>
                </v-card-title>
              </v-layout>
            </v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>-->

    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card
              @click="teste"
              class="pa-2"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img :src="item.img" height="225px">
                <v-card-title class="title white--text ma-2">
                  <v-row class="fill-height flex-column" justify="space-between">
                    <p class="mt-2 subheading text-left">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-regular text-left">{{ item.text }}</p>
                      <p class="caption font-weight-medium font-italic text-left"><v-icon dark small>mdi-clock</v-icon> {{ item.subtext }}</p>
                    </div>
                  </v-row>
                </v-card-title>

                <v-card-actions>
                  <v-btn
                    v-for="(icon, index) in icons"
                    :key="index"
                    :class="{ 'show-btns': hover }"
                    color="transparent"
                    icon
                  >
                    <v-icon :class="{ 'show-btns': hover }" color="transparent">{{ icon }}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["formations"],

  data: () => ({
    icons: ["mdi-share-variant"],
    items: [
      {
        title: "Informatica de Gestao",
        text: "It's New Release Friday",
        subtext: "Ha 10 dias",
        img: "http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg"
      },
      {
        title: "Mecanica",
        text: "Greatest Rock Hits",
        subtext: "Ha 2 anos",
        img:
          "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
      },
      {
        title: "Eletricidade",
        text: "Ambient Bass",
        subtext: "Chill beats to mellow you out.",
        img: "http://lorempixel.com/output/abstract-q-c-640-480-6.jpg"
      }
    ],
    transparent: "rgba(255, 255, 255, 0)"
  }),

  methods: {
    teste() {
      // eslint-disable-next-line no-console
      console.log("testando ");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>


