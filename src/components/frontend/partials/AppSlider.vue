<template>
  <div>
    <v-card tile flat @mouseenter="pauseSlider" @mouseleave="startSlider">
      <swiper ref="sliderSwiper" :options="swiperOption">
        <template v-for="(slider, s) in sliders">
          <swiper-slide :key="'slider_'+s">
            <v-img
              class="white--text slide--igm"
              :src="`${apiUrl}/images/app/sliders/${slider.background}`"
              height="580"
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
                      class="elevation-6 text-none"
                      :color="slider.color"
                      dark
                      small
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
                  :swiper-animate-effect="slider.type==1?'slideInLeft':'fadeInUp'"
                  swiper-animate-delay="1s"
                  swiper-animate-duration="2s"
                >
                  <div
                    class="slider-title"
                    :class="slider.type==1?'course-slider-title':'post-slider-title'"
                  >
                    <h3
                      class="ani text-uppercase font-weight-light display-1"
                      swiper-animate-effect="flipInX"
                      swiper-animate-delay="3s"
                      swiper-animate-duration="2s"
                      :style="{color: slider.type==2?slider.color:'grey lighten-4'}"
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
                      :text="slider.btn_style==1&&slider.type==2?true:false"
                      dark
                      outlined
                      tile
                      :color="slider.type==1?'white':slider.color"
                      class="text-none"
                      course_info
                      @click="slider.type==1?onView('course_info', slider.slug):onView('read_article', slider.slug)"
                    >{{slider.btn_text}}</v-btn>
                  </div>
                </div>
              </div>
            </v-img>
          </swiper-slide>
        </template>

        <!-- <div class="swiper-button-prev hidden-xs-only" slot="button-prev"></div>
        <div class="swiper-button-next hidden-xs-only" slot="button-next"></div> -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </v-card>
  </div>
</template>

<script>
import * as swiperAni from "@/plugins/swiper.animate.min.js";
import { truncateFilter } from "@/mixins/Filters";
import { viewAndUpdate } from "@/mixins/Redirects";

export default {
  mixins: [truncateFilter, viewAndUpdate],
  props: ["sliders"],
  data() {
    return {
      swiperOption: {
        // spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          // dynamicBullets: true,
          clickable: true
        },

        centeredSlides: true,
        autoplay: {
          delay: 6500,
          disableOnInteraction: false
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
    pauseSlider() {
      this.swiper.autoplay.pause();
    },

    startSlider() {
      this.swiper.autoplay.run();
    }
  }
};
</script>

<style  scoped  lang="scss">
$xs-screen: 600px;
$sm-screen: 960px;
$md-screen: 1264px;
$lg-screen: 1904px;

// Mixins
@mixin xs {
  @media only screen and (max-width: #{$xs-screen}) {
    @content;
  }
}

@mixin sm {
  @media only screen and (min-width: #{$xs-screen}) and (max-width: #{$sm-screen}) {
    @content;
  }
}

@mixin md {
  @media only screen and (max-width: #{$md-screen}) and (min-width: #{$sm-screen}) {
    @content;
  }
}

@mixin lg {
  @media only screen and (max-width: #{$lg-screen}) {
    @content;
  }
}

.link-slider-container {
  display: flex;
  width: 100%;
  height: 580px;
  justify-content: center;
  align-items: center;
  height: 580px;
  width: 100%;
  text-align: center;
  // background-color: #5c5c5c44;
  box-sizing: border-box;
  transition: background-color 1s;
  @include xs {
    height: 440px;
  }

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

    @include xs {
      width: 100%;
      margin: 40px;
    }
    @include sm {
      width: 70%;
    }
    @include md {
      width: 35%;
    }
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
    // background-color: rgb(255, 255, 255);
    padding: 20px;
  }

  .slider-title {
    text-align: left;
    color: rgb(255, 255, 255);
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
    color: rgb(255, 255, 255);
  }
}

.post-slider-container {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 280px;
  width: 40%;
  background-color: rgba(62, 63, 149, 0.5);
  padding-right: 5px;

  @include xs {
    width: 100%;
    margin: 20px;
    height: 240px;
  }
  @include sm {
    width: 70%;
  }
  @include md {
    width: 45%;
  }

  .post-slider-body {
    color: rgb(80, 80, 80);
  }

  .post-slider-content {
    position: relative;
    left: -30px;
    // border-bottom: 2px solid;
    // border-left: 2px solid;
    background-color: rgb(255, 255, 255);
    transition: left 0.5s;
    z-index: 100;

    @include xs {
      left: 0;
      margin: 10px;
    }
    @include sm {
      left: 0;
    }
    @include md {
      right: 0;
      width: 100%;
      margin-right: 10px;
    }
  }

  .post-slider-content:hover {
    left: -15px;
    @include xs {
      width: 100%;
      left: 10px;
      margin: 10px;
    }
  }

  .post-slider-footer {
    text-align: left;
  }
}

.course-slider-container {
  height: 580px;
  width: 25%;
  padding: 0 15px 0 35px;
  transition: background-color 0.5s;

  // background-color: #1818188c;
  background-color: #3e3f9563;
  // background: linear-gradient(
  //   to right,
  //   #3e4095 0%,
  //   rgba(62, 64, 149, 0.738) 19%,
  //   rgba(62, 64, 149, 0.541) 34%,
  //   rgba(62, 64, 149, 0.382) 47%,
  //   rgba(62, 64, 149, 0.278) 56.5%,
  //   rgba(62, 64, 149, 0.194) 65%,
  //   rgba(62, 64, 149, 0.126) 73%,
  //   rgba(62, 64, 149, 0.075) 80.2%,
  //   rgba(62, 64, 149, 0.042) 86.1%,
  //   rgba(62, 64, 149, 0.021) 91%,
  //   rgba(62, 64, 149, 0.008) 95.2%,
  //   rgba(62, 64, 149, 0.002) 98.2%,
  //   transparent 100%
  // );

  @include xs {
    width: 95%;
    padding: 10px;
    margin: 20px;
    height: 62%;
    background-color: rgba(62, 64, 149, 0.3);
  }
  @include sm {
    width: 70%;
  }
  @include md {
    width: 30%;
  }

  .course-slider-content {
    width: 100%;
    // background-color: rgb(255, 255, 255);
    padding: 20px;
  }
  // @include xs {
  //   left: 0;
  //   margin: 10px;
  // }
  // @include sm {
  //   left: 0;
  // }
  // @include md {
  //   right: 0;
  //   width: 100%;
  //   margin-right: 10px;
  // }

  .course-slider-footer {
    text-align: left;
  }
}

.course-slider-container:hover {
  background-color: #3e3f95a4;
}
</style>