<template>
  <div>
    <v-skeleton-loader class="mx-auto" width="100%" type="card" v-if="sliders.length==0"></v-skeleton-loader>
    <v-card tile flat mt-0 pt-0 v-else>
      <swiper ref="sliderSwiper" :options="swiperOption">
        <template v-for="(slider, s) in sliders">
          <swiper-slide :key="'slider_'+s">
            <v-img
              class="white--text slide--igm"
              :src="`${apiUrl}/images/app/sliders/${slider.background}`"
              height="500"
            >
              <div v-if="slider.type==3" class="link-slider-container">
                <div
                  class="link-slider-content ani"
                  swiper-animate-effect="fadeIn"
                  swiper-animate-delay="2s"
                  swiper-animate-duration="1s"
                >
                  <div class="link-slider-title">
                    <h3
                      class="ani font-weight-light"
                      swiper-animate-effect="flipInX"
                      swiper-animate-delay="2s"
                      swiper-animate-duration="1s"
                    >
                      <b>{{slider.title}}</b>
                    </h3>
                    <div
                      class="link-slide-title-underline"
                      :style="{ backgroundColor: slider.color}"
                    ></div>
                  </div>

                  <div class="link-slider-btn">
                    <v-btn
                      :href="slider.link"
                      target="_blank"
                      class="elevation-6"
                      :color="slider.color"
                      dark
                      tile
                    >{{slider.btn_text}}</v-btn>
                  </div>
                </div>
              </div>

              <div
                v-if="slider.type==1 || slider.type==2"
                class="ani slider-container"
                :class="slider.type==1?'course-slider-container':'post-slider-container'"
                :swiper-animate-effect="slider.type==1?'slideInLeft':'fadeIn'"
                swiper-animate-duration="2s"
                :swiper-animate-delay="slider.type==2?'1s':''"
              >
                <div
                  class="slider-content ani"
                  :class="slider.type==1?'course-slider-content':'post-slider-content'"
                  :style="slider.type==2?{ borderBottomColor:slider.color, borderLeftColor:slider.color}:{}"
                  :swiper-animate-effect="slider.type==1?'slideInLeft':'fadeInUp'"
                  swiper-animate-delay="1s"
                  swiper-animate-duration="2s"
                >
                  <div
                    class="slider-title"
                    :class="slider.type==1?'course-slider-title':'post-slider-title'"
                  >
                    <h3
                      class="ani text-uppercase font-weight-light"
                      swiper-animate-effect="flipInX"
                      swiper-animate-delay="3s"
                      swiper-animate-duration="2s"
                      :style="{color: slider.color}"
                    >
                      <b>{{slider.title}}</b>
                    </h3>
                    <div class="slide-title-underline" :style="{ backgroundColor: slider.color}"></div>
                  </div>

                  <div
                    class="ani slider-body"
                    :class="slider.type==1?'course-slider-body':'post-slider-body'"
                    swiper-animate-effect="zoomIn"
                    swiper-animate-delay="2s"
                    swiper-animate-duration="1s"
                  >
                    <p>{{slider.summary|truncate(150)}}</p>
                  </div>

                  <v-divider
                    class="pa-1 ani"
                    :swiper-animate-effect="slider.type==1?'rotateInDownLeft':'rotateInDownRight'"
                    swiper-animate-delay="3s"
                    swiper-animate-duration="2s"
                  ></v-divider>

                  <div
                    class="slider-footer ani"
                    :class="slider.type==1?'course-slider-footer':'post-slider-footer'"
                    :swiper-animate-effect="slider.type==1?'fadeInRight':'fadeInLeft'"
                    swiper-animate-delay="2s"
                    swiper-animate-duration="3s"
                  >
                    <v-btn
                      :text="slider.btn_style"
                      small
                      dark
                      outlined
                      tile
                      :color="slider.color"
                      class="text-none"
                      :to="{name: slider.link}"
                    >{{slider.btn_text}}</v-btn>
                  </div>
                </div>
              </div>

              <!-- <div
              class="ani slider-container"
              :swiper-animate-effect="slider.type==1?'slideInLeft':'slideInLeft'"
              swiper-animate-duration="3s"
            >
              <div
                class="slider-content ani"
                swiper-animate-effect="slideInLeft"
                swiper-animate-delay="1s"
                swiper-animate-duration="3s"
              >
                <div class="slider-title">
                  <h3
                    class="ani text-uppercase font-weight-light"
                    swiper-animate-effect="flipInX"
                    swiper-animate-delay="3s"
                    swiper-animate-duration="2s"
                    :style="{color: slider.color}"
                  >
                    <b>{{slider.title}}</b>
                  </h3>
                  <div class="slide-title-underline" :style="{ backgroundColor: slider.color}"></div>
                </div>

                <div
                  class="ani slider-body"
                  swiper-animate-effect="zoomIn"
                  swiper-animate-delay="2s"
                  swiper-animate-duration="1s"
                >
                  <p>{{slider.summary|truncate(150)}}</p>
                </div>

                <v-divider
                  class="pa-1 ani"
                  swiper-animate-effect="rotateInDownRight"
                  swiper-animate-delay="3s"
                  swiper-animate-duration="2s"
                ></v-divider>

                <div
                  class="slider-footer ani"
                  swiper-animate-effect="fadeInLeft"
                  swiper-animate-delay="2s"
                  swiper-animate-duration="3s"
                >
                  <v-btn
                    :text="slider.btn_style"
                    small
                    dark
                    outlined
                    tile
                    :color="slider.color"
                    class="text-none"
                    :to="{name: slider.link}"
                  >{{slider.btn_text}}</v-btn>
                </div>
              </div>
              </div>-->
            </v-img>
          </swiper-slide>
        </template>

        <div class="swiper-button-prev hidden-xs-only" slot="button-prev"></div>
        <div class="swiper-button-next hidden-xs-only" slot="button-next"></div>
      </swiper>
    </v-card>
  </div>
</template>

<script>
import * as swiperAni from "@/plugins/swiper.animate.min.js";
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [truncateFilter],
  props: ["sliders"],
  data() {
    return {
      swiperOption: {
        // spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 6500,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        zoom: true,

        effect: "fade",

        on: {
          slideChange: function() {
            swiperAni.swiperAnimate(this);
          }
        }
      }
    };
  },

  computed: {
    swiper() {
      return this.$refs.sliderSwiper.swiper;
    }
  },

  methods: {
    slideEffect(position) {
      if (position == "topRight" || position == "bottomRight") {
        return "slideInRight";
      }
      if (position == "topLeft" || position == "bottomLeft") {
        return "slideInLeft";
      }
    }
  }
};
</script>

<style  scoped  lang="scss">
.link-slider-container {
  display: flex;
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  text-align: center;
  background-color: #5c5c5c44;
  box-sizing: border-box;
  transition: background-color 1s;

  .link-slider-title {
    padding: 20px;
    .link-slide-title-underline {
      width: 40%;
      height: 2px;
      text-align: center;
      margin: auto;
      margin-top: 5px;
    }
  }

  .link-slider-content {
    padding: 30px;
    width: 25%;
    border: 2px rgba(255, 255, 255, 0.5) solid;
    border-radius: 35px 0px;
    transition: border-color 1s, border-radius 2s;
  }

  .link-slider-content:hover {
    border-color: rgb(255, 255, 255);
    border-radius: 0px;
  }
}

.link-slider-container:hover {
  background-color: #ffffff00;
}

.slider-container {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;

  .slider-content {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 20px;
  }

  .slider-title {
    text-align: left;
    color: rgb(50, 50, 50);
    padding-bottom: 20px;
    .slide-title-underline {
      width: 30%;
      height: 2px;
      text-align: left;
      margin-top: 10px;
    }
  }

  .slider-body {
    margin-bottom: 10px;
    text-align: justify;
    color: rgb(75, 75, 75);
  }
}

.post-slider-container {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 325px;
  width: 40%;
  background-color: #6464648c;
  padding-right: 5px;

  .post-slider-content {
    position: relative;
    left: -30px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transition: left 1s;
  }

  .post-slider-content:hover {
    left: -15px;
  }

  .post-slider-footer {
    text-align: left;
  }
}

.course-slider-container {
  height: 500px;
  width: 25%;
  padding: 0 15px 0 35px;
  transition: background-color 1s;

  background-color: #c3caff8c;
  background: linear-gradient(
    to right,
    black 0%,
    rgba(0, 0, 0, 0.738) 19%,
    rgba(0, 0, 0, 0.541) 34%,
    rgba(0, 0, 0, 0.382) 47%,
    rgba(0, 0, 0, 0.278) 56.5%,
    rgba(0, 0, 0, 0.194) 65%,
    rgba(0, 0, 0, 0.126) 73%,
    rgba(0, 0, 0, 0.075) 80.2%,
    rgba(0, 0, 0, 0.042) 86.1%,
    rgba(0, 0, 0, 0.021) 91%,
    rgba(0, 0, 0, 0.008) 95.2%,
    rgba(0, 0, 0, 0.002) 98.2%,
    transparent 100%
  );

  .course-slider-content {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 20px;
  }

  .course-slider-footer {
    text-align: right;
  }
}

.course-slider-container:hover {
  background-color: #5c5c5c44;
}
</style>