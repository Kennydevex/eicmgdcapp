<template>
  <div>
    <v-row>
      <!-- <template v-for="(slider, k) in sliders">
        <v-col cols="12" sm="6" md="4" :key="'slider'+k">
          <v-card>
            <v-card-title primary-title>{{slider.title}}</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="canRemove()"
                @click="onDelete('sliders', slider.id, 'APP_UPDATE_ALL_SLIDERS_DATA')"
                color="error"
                class="text-none"
                small
                tile
                depressed
              >Eliminar</v-btn>
              <v-btn
                v-if="canEdit()"
                @click="onUpdate('update_slider', slider.slug)"
                color="success"
                class="text-none"
                small
                tile
                depressed
              >Editar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>-->
      <template v-if="sliders.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem sliders registados para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  :to="{ name: 'add_slider'}"
                  v-if="canAdd()"
                  rounded
                  outlined
                  text
                  class="text-none"
                  color="primary"
                >Criar um slider</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader class="elevation-2" type="card, actions"></v-skeleton-loader>
        </v-col>

        <v-col cols="12" md="6">
          <v-skeleton-loader class="elevation-2" type="card, actions"></v-skeleton-loader>
        </v-col>
      </template>

      <v-card v-else>
        <v-card-title primary-title class="primary white--text">
          <v-icon dark>mdi-play-box-outline</v-icon>
          <span class="font-weight-light">Sliders Registados</span>
          <v-spacer></v-spacer>
          <v-btn small fab color="white" :to="{ name: 'add_slider'}" v-if="canAdd()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-3">
          <swiper class="swiper" :options="swiperOption">
            <template v-for="(slider, s) in sliders">
              <swiper-slide class="mb-1" :key="'slider_'+s">
                <v-card width="100%" height="100%" tile>
                  <v-img
                    :src="`${apiUrl}/images/app/sliders/${slider.background}`"
                    class="white--text align-end"
                    height="230px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                    <v-card-title class="font-weight-light" v-text="slider.title"></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-chip
                        label
                        small
                        :color="slider.color"
                        class="white--text"
                      >{{slider.type==1?'Curso':slider.type==2?'Artigo':'Link externa'}}</v-chip>
                    </v-card-text>
                  </v-img>
                  <v-card-actions>
                    <v-btn
                      outlined
                      x-small
                      :color="slider.status==true?'primary':'grey darken-2'"
                      @click="toggleStatus('toggleSliderStatus',slider.id, slider.status, 'Slider', 'getSliders')"
                    >{{slider.status==true?'ativo':'desativo'}}</v-btn>
                    <v-spacer></v-spacer>

                    <v-btn v-if="canEdit()" icon @click="onUpdate('update_slider', slider.slug)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="canRemove()"
                      icon
                      @click="onDelete('sliders', slider.id, 'APP_UPDATE_ALL_SLIDERS_DATA')"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </swiper-slide>
            </template>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success">text</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";

import {
  getDatas,
  getData,
  deleteData,
  handleActivation
} from "@/mixins/SendForm";
export default {
  mixins: [
    flashAlert,
    actionAlert,
    getDatas,
    getData,
    deleteData,
    handleActivation,
    viewAndUpdate
  ],
  data() {
    return {
      slider: [],

      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },

  created: function() {
    this.getAll(this.sliders, "getSliders");
    window.getApp.$on("APP_UPDATE_ALL_SLIDERS_DATA", () => {
      this.refresh("getSliders");
    });
  },

  computed: {
    sliders: function() {
      return this.$store.getters.sliders;
    }
  }
};
</script>


<style lang="scss" scoped>
.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    width: 300px;
    height: 300px;
  }
}
</style>