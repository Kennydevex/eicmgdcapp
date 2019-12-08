<template>
  <div>
    <v-parallax :src="require('@/assets/app/statics/Slide2.gif')" height="300">
      <v-row
        data-aos="fade-down"
        data-aos-duration="2000"
        align="center"
        justify="center"
        class="white--text"
      >
        <v-col cols="12" md="4" align="center" justify="center">
          <v-col>
            <v-avatar size="100">
              <img :src="require('@/assets/app/logo.png')" alt="alt" />
            </v-avatar>
          </v-col>
        </v-col>

        <v-col cols="12" md="4"  align="center" justify="center">
          <v-col>
            <v-avatar size="100">
              <img :src="require('@/assets/app/logo.png')" alt="alt" />
            </v-avatar>
          </v-col>
        </v-col>

        <v-col cols="12" md="4" align="center" justify="center">
          <v-col>
            <v-avatar size="100">
              <img :src="require('@/assets/app/logo.png')" alt="alt" />
            </v-avatar>
          </v-col>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax>
  </div>
</template>

