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
            <!-- ====================================== -->
            <section class="ani" swiper-animate-effect="slideInLeft" swiper-animate-duration="3s">
              <!-- <div id="slide-bg-diagonal"></div> -->
              <v-container grid-list-xs fluid class="ma-0 pa-0 slide-container">
                <v-row class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0">
                    <div class="slide-content-box">
                      <div class="slide-content-box-outer">
                        <div class="slide-content-box-inner">
                          <div class="slide-title">
                            <h3
                              class="ani text-uppercase"
                              swiper-animate-effect="flipInX"
                              swiper-animate-delay="3s"
                              swiper-animate-duration="2s"
                            >
                              <b>{{slider.header}}</b>
                            </h3>
                            <div class="slide-title-underline"></div>
                          </div>
                          <div
                            class="slide-descrition ani"
                            swiper-animate-effect="slideInLeft"
                            swiper-animate-delay="1s"
                            swiper-animate-duration="3s"
                          >
                            <p>{{slider.body|truncate(300)}}</p>
                          </div>

                          <div
                            class="slide-read-more ani"
                            swiper-animate-effect="fadeInLeft"
                            swiper-animate-delay="2s"
                            swiper-animate-duration="3s"
                          >
                            <!-- <a href class="text-center btn">Nosso Trabalho</a> -->
                            <v-btn
                              class="ma-0 px-5"
                              outlined
                              color="indigo"
                            >{{slider.button_text?slider.button_text:'Ler Mais'}}</v-btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </section>

            <!-- ====================================== -->
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
.slide-container {
  height: 50%;
  width: 50%;
  background: rgba(255, 255, 255, 1);
  background: linear-gradient(
    to right,
    black 0%,
    rgba(	0,0,0, 0.738) 19%,
    rgba(	0,0,0, 0.541) 34%,
    rgba(	0,0,0, 0.382) 47%,
    rgba(	0,0,0, 0.278) 56.5%,
    rgba(	0,0,0, 0.194) 65%,
    rgba(	0,0,0, 0.126) 73%,
    rgba(	0,0,0, 0.075) 80.2%,
    rgba(	0,0,0, 0.042) 86.1%,
    rgba(	0,0,0, 0.021) 91%,
    rgba(	0,0,0, 0.008) 95.2%,
    rgba(	0,0,0, 0.002) 98.2%,
    transparent 100%
  );
}
.slide-content-box {
  float: left;
  height: 700px;
}

.slide-content-box-outer {
  width: 50%;
  height: 100%;
  display: table;
  padding: 45px;
}

.slide-content-box-inner {
  display: table-cell;
  vertical-align: middle;
  padding: 20px;
}

.slide-title h3 {
  text-align: left;
  color: rgb(235, 235, 235);
}

.slide-title-underline {
  width: 70px;
  height: 2px;
  background-color: rgb(80, 89, 212);
  text-align: left;
  margin-top: 10px;
}

.slide-descrition p {
  margin-top: 20px;
  text-align: justify;
  color: rgb(209, 209, 209);
}

.slide-read-more {
  margin-top: 20px;
}
</style>