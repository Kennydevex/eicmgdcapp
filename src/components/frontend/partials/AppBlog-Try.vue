
<template>
  <v-container grid-list-xs mb-8>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-btn large rounded class="text-uppercase font-weight-regular" text>EICM Blog</v-btn>
      </v-col>
      <!-- <v-col cols="12" align="center" justify="center">
        <h3 class="text-uppercase font-weight-light text--primary">Formações em Destaques</h3>
      </v-col>-->
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div
          @mouseenter="$refs.swiperRef.swiper.autoplay.stop()"
          @mouseleave="$refs.swiperRef.swiper.autoplay.start()"
        >
          <swiper :options="swiperOption" ref="swiperRef">
            <template v-for="article in published_articles">
              <swiper-slide :key="'artigo_'+article.id">
                <v-card>
                  <v-img
                    :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                    height="150px"
                    aspect-ratio="2.75"
                  ></v-img>

                  <v-card-text>
                    <small>Há 10 dias</small>
                    <br />
                    <span class="grey--text text--darken-4">
                      <span>{{article.summary|truncate(100)}}</span>
                    </span>
                  </v-card-text>

                  <v-card-actions class="pb-3 pt-0 pl-2">
                    <v-btn
                      color="primary"
                      rounded
                      text
                      small
                      @click="onView('read_article', article.slug)"
                      class="text-none"
                    >Ler</v-btn>
                  </v-card-actions>
                </v-card>
              </swiper-slide>
            </template>
          </swiper>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { truncateFilter } from "@/mixins/Filters";
import { viewAndUpdate } from "@/mixins/Redirects";
import { actionAlert } from "@/mixins/AppAlerts";
export default {
  props: ["published_articles"],

  mixins: [truncateFilter, actionAlert, viewAndUpdate],

  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        // loop: true,
        loopFillGroupWithBlank: true,

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        autoplay: {
          delay: 3000
        },

        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    };
  }
};
</script>

