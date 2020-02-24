<template>
  <v-card tile flat mt-0 pt-0>
    <swiper ref="mySwiper" :options="swiperOption">
      <template v-for="(slider, s) in sliders">
        <swiper-slide :key="'slider_'+s">
          <v-img
            class="white--text slide--igm"
            :src="`${apiUrl}/images/app/sliders/${slider.image}`"
            aspect-ratio="2.75"
            min-height="220"
          >
            <div class="appCard" :class="slider.position" :style="{color: slider.color}">
              <!-- :style="{color: slider.color, bottom: slider.position.bottom, left: slider.position.left}" -->

              <div
                class="appCard-header ani"
                :style="{background: slider.color}"
                swiper-animate-effect="fadeIn"
                swiper-animate-delay="3s"
                swiper-animate-duration="2s"
              >
                <div
                  class="title font-weight-light text-uppercase grey--text text--lighten-2"
                >{{slider.header}}</div>
              </div>

              <div
                class="appCard-content ani"
                swiper-animate-delay="1s"
                :swiper-animate-effect="slideEffect(slider.position)"
                swiper-animate-duration="2s"
              >
                <p class="font-weight-regular">{{slider.body|truncate(300)}}</p>
              </div>

              <div
                class="appCard-footer ani text-xs-right"
                :swiper-animate-effect="slideEffect(slider.position)"
                :style="{background: slider.color}"
                swiper-animate-delay="2s"
                swiper-animate-duration="3s"
              >
                <v-btn
                  small
                  outlined
                  color="grey lighten-3"
                  tile
                >{{slider.button_text?slider.button_text:"Ler"}}</v-btn>
              </div>
            </div>
          </v-img>
        </swiper-slide>
      </template>

      <div class="swiper-button-prev hidden-xs-only" slot="button-prev"></div>
      <div class="swiper-button-next hidden-xs-only" slot="button-next"></div>
    </swiper>
  </v-card>
</template>

<script>
import * as swiperAni from "@/plugins/swiper.animate.min.js";
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [truncateFilter],
  data() {
    return {
      sliders: [
        {
          id: 1,
          header: "Formação Profissional em Cabo Verde",
          body:
            "Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          button_text: "",
          image: "slide1.gif",
          link: "slug do artigo",
          type: 1,
          status: true,
          position: "topLeft",
          color: "rgba(221, 54, 118, 0.5)"
        },
        {
          id: 1,
          header: "O desafio da educação em Cabo Verde",
          body:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
          button_text: "Vert mais",
          image: "slide2.gif",
          link: "slug do artigo",
          type: 1,
          status: true,
          position: "topRight",
          color: "rgba(151, 103, 57, 0.5)"
        },
        {
          id: 1,
          header: "O futuro da nossa juventude",
          body:
            "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.",
          button_text: "Vert mais",
          image: "slide3.gif",
          link: "slug do artigo",
          type: 1,
          status: true,
          position: "bottomRight",
          color: "rgba(34, 140, 221, 0.5)"
        }
      ],

      swiperOption: {
        spaceBetween: 60,
        centeredSlides: true,
        autoplay: {
          delay: 5500,
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
      return this.$refs.mySwiper.swiper;
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
$background: rgba(34, 140, 221, 0.5);
$screen-xs: 600px;
$screen-sm: 600px;
$screen-md: 600px;

@mixin xs {
  @media only screen and (max-width: #{$screen-xs}) {
    @content;
  }
}

@mixin sm {
  @media only screen and (min-width: 600px) {
    @content;
  }
}

@mixin md {
  @media only screen and (min-width: 768px) {
    @content;
  }
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.topLeft {
  top: 0px;
  left: 0px;
  text-align: left;
}

.topRight {
  top: 0px;
  right: 0px;
  text-align: right;
}

.bottomLeft {
  bottom: 0px;
  left: 0px;
  text-align: left;
}

.bottomRight {
  bottom: 0px;
  right: 0px;
  text-align: right;
}

.appCard {
  margin: 10px;
  overflow: hidden;

  // top: 0;
  // right: 0;
  position: absolute;
  width: 70%;

  @include xs {
    width: 100%;
    font-size: 12px;
  }
  @include sm {
    width: 70%;
  }
  @include md {
    width: 50%;
  }

  &-header {
    display: block;
    box-sizing: border-box;
    background: $background;
    padding: 10px 20px;
  }
  &-content {
    padding: 40px;
    box-sizing: border-box;
    overflow: inherit;
    color: rgb(44, 44, 44);
    background: rgba(255, 255, 255, 0.7);
    @include xs {
      padding: 20px;
      background: transparent;
    }
    @include sm {
      padding: 20px;
    }
    @include md {
      padding: 10px 30px;
    }
  }

  &-footer {
    width: 25%;
    padding: 40px;
    // border-radius: 0 0 50px 0;
    box-sizing: border-box;
    color: #d1d0d0;
    background: $background;
    // width: 70px;
    @include xs {
      padding: 20px;
      background: transparent;
    }
    @include sm {
      padding: 20px;
    }
    @include md {
      padding: 10px 30px;
    }
  }
}
</style>