
<template>
  <v-parallax :src="require('@/assets/app/statics/parralax1.jpeg')" height="400">
    <v-container grid-list-xs>
      <v-row justify="center">
        <v-col cols="12">
          <div
            @mouseenter="$refs.swiperRef.swiper.autoplay.stop()"
            @mouseleave="$refs.swiperRef.swiper.autoplay.start()"
          >
            <swiper :options="swiperOption" ref="swiperRef">
              <template v-for="article in published_articles">
                <swiper-slide :key="'artigo_'+article.id">
                  <v-card tile  data-aos="slide-right" data-aos-duration="2000">
                    <v-img
                      :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                      height="120px"
                      aspect-ratio="2.75"
                      class="white--text align-end"
                    >
                      <v-card-title class="font-weight-light" v-text="article.title"></v-card-title>
                    </v-img>

                    <v-card-text>
                      <div class="text-capitalize">{{dateForHumanPresentation(article.start)}}</div>
                      <v-divider class="mr-7 py-1"></v-divider>
                      <div class="pr-5 grey--text text--darken-4 font-weight-regular">
                        <span>{{article.summary|truncate(80)}}</span>
                      </div>
                    </v-card-text>

                    <v-card-actions class="pb-3 pt-0 pl-2">
                      <v-btn
                        color="primary"
                        text
                        small
                        left
                        :ripple="false"
                        @click="onView('read_article', article.slug)"
                        class="font-weight-regular"
                      >Ler</v-btn>
                    </v-card-actions>
                  </v-card>
                </swiper-slide>
              </template>

              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import { truncateFilter } from "@/mixins/Filters";
import { viewAndUpdate } from "@/mixins/Redirects";
import { actionAlert } from "@/mixins/AppAlerts";
import { dateFormat } from "@/mixins/DateTime";

export default {
  props: ["published_articles"],

  mixins: [truncateFilter, actionAlert, viewAndUpdate, dateFormat],

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

  // created: function() {
  //   this.getAll(this.published_articles, "getPublishedArticles");
  // },

  // computed: {
  //   published_articles: function() {
  //     return this.$store.getters.published_articles;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.title-divider {
  width: 70px;
  height: 2px;
  background-color: rgb(80, 89, 212);
  text-align: left;
  margin-top: 10px;
}
</style>