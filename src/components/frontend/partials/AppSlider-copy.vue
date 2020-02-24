<template>
  <v-card tile flat mt-0 pt-0>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <v-img
          class="white--text slide--igm"
          :src="require('@/assets/app/sliders/slide1.gif')"
          aspect-ratio="2.75"
          min-height="220"
        >
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="fadeIn"
              swiper-animate-duration="2s"
            >
              <div
                class="title font-weight-light text-uppercase grey--text text--lighten-2"
              >Fromação Profissional</div>
            </div>
<!-- 
            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
              inset
            ></v-divider> -->

            <div
              class="appCard-content ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <p class="font-weight-medium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.
              </p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="grey lighten-3" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>
      <swiper-slide>
        <v-img
          class="white--text slide--igm"
          :src="require('@/assets/app/sliders/slide2.gif')"
          aspect-ratio="2.75"
          min-height="220"
        >
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="fadeIn"
              swiper-animate-duration="2s"
            >
              <div
                class="title font-weight-light text-uppercase grey--text text--lighten-2"
              >Comunidade educativa</div>
            </div>

            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
              inset
            ></v-divider>

            <div
              class="appCard-content ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <p
                class="font-weight-medium"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.</p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="grey lighten-3" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>

      <swiper-slide>
        <v-img
          class="white--text slide--igm"
          :src="require('@/assets/app/sliders/slide3.gif')"
          aspect-ratio="2.75"
          min-height="220"
        >
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="fadeIn"
              swiper-animate-duration="2s"
            >
              <div
                class="title font-weight-light text-uppercase grey--text text--lighten-2"
              >Fromação Profissional</div>
            </div>
            <!-- <div class="header_divider"></div> -->

            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
              inset
            ></v-divider>

            <div
              class="appCard-content ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <p class="font-weight-medium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.
              </p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="grey lighten-3" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>

      <swiper-slide>
        <v-img
          class="white--text slide--igm"
          :src="require('@/assets/app/sliders/slide4.gif')"
          aspect-ratio="2.75"
          min-height="220"
        >
          <div class="appCard ani" swiper-animate-effect="fadeIn" swiper-animate-duration="4s">
            <div
              class="appCard-header ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="fadeIn"
              swiper-animate-duration="2s"
            >
              <div
                class="title font-weight-light text-uppercase grey--text text--lighten-2"
              >Fromação Profissional</div>
            </div>
            <!-- <div class="header_divider"></div> -->

            <v-divider
              class="ani ml-5"
              swiper-animate-delay="1s"
              swiper-animate-effect="rotateInDownRight"
              swiper-animate-duration="2s"
              inset
            ></v-divider>

            <div
              class="divider ani inset"
              swiper-animate-effect="rotateInUpRight"
              swiper-animate-duration="4s"
            ></div>
            <div
              class="appCard-content ani"
              swiper-animate-delay="1s"
              swiper-animate-effect="slideInRight"
              swiper-animate-duration="2s"
            >
              <p class="font-weight-medium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae accusamus quisquam provident natus.
              </p>
              <div
                class="appCard-footer ani text-xs-right"
                swiper-animate-effect="bounceInUp"
                swiper-animate-duration="3s"
              >
                <v-btn small outlined color="grey lighten-3" tile>Detalhes</v-btn>
              </div>
            </div>
          </div>
        </v-img>
      </swiper-slide>

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
  }
};
</script>


// rgb(34,140,221)
// #228cdd
<style  scoped  lang="scss">
$primary_background: rgb(34,140,221);
$background: linear-gradient(
  90deg,
  rgba(34, 140, 221, 1) 0%,
  rgba(34, 140, 221, 0.9) 10%,
  rgba(34, 140, 221, 0.8) 20%,
  rgba(34, 140, 221, 0.7) 30%,
  rgba(34, 140, 221, 0.6) 40%,
  rgba(34, 140, 221, 0.5) 50%,
  rgba(34, 140, 221, 0.4) 60%,
  rgba(34, 140, 221, 0.3) 70%,
  rgba(34, 140, 221, 0.2) 80%,
  rgba(34, 140, 221, 0.1) 90%,
  rgba(34, 140, 221, 0) 100%
);
$polign: polygon(0 0, 100% 0, 72% 94%, 0 100%);
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

.appCard {
  margin: 0;
  padding: 0px;
  height: 50%;
  overflow: hidden;
  left: 0px;
  top: 50%;
  position: absolute;
  background: $primary_background;
  background: $background;

  @include xs {
    width: 100%;
    font-size: 12px;
  }
  @include sm {
    width: 70%;
    // -webkit-clip-path: $polign;
    // clip-path: $polign;
  }
  @include md {
    width: 50%;
    // -webkit-clip-path: $polign;
    // clip-path: $polign;
  }

  &-header {
    width: 100%;
    padding: 10px 40px;
    display: block;
    box-sizing: border-box;
    @include xs {
      padding: 10px 20px;
    }
    @include sm {
      padding: 20px;
    }
  }
  &-content {
    width: 100%;
    height: auto;
    padding: 40px;
    display: block;
    box-sizing: border-box;
    justify-content: flex-end;
    overflow: inherit;
    color: #d1d0d0;
    background: rgb(245, 244, 244);
    @include xs {
      padding: 20px;
      background: transparent;
    }
    @include sm {
      padding: 10px 75px 10px 10px;
    }
    @include md {
      padding-left: 70px;
      padding-right: 70px;
    }
  }
  .divider {
    position: absolute;
    right: 40px;
    top: 30px;
    bottom: 10%;
    border-left: 1px solid #d3f3f3;
  }
}
</style>