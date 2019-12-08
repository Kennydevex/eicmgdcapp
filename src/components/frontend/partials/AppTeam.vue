
<template>
  <v-container grid-list-xs>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center" justify="center" class>
        <h3 class="text-uppercase font-weight-light text--primary">Corpo Diretivo</h3>
      </v-col>
    </v-row>

    <v-divider
      inset
      data-aos="fade-in"
      data-aos-duration="4000"
      data-aos-delay="1000"
    ></v-divider>

    <v-row
      class="my-2"
      data-aos="fade-down"
      data-aos-duration="2000"
      align="center"
      justify="center"
    >
      <v-col cols="12" md="2" align="center" justify="center">
        <v-avatar size="120" class="team_avatar" color="primary">
          <img :src="require('@/assets/app/logo.png')" alt="alt" />
        </v-avatar>
      </v-col>
      <v-col cols="12" md="2" align="center" justify="center">
        <v-avatar size="120" color="primary">
          <img :src="require('@/assets/app/logo.png')" alt="alt" />
        </v-avatar>
      </v-col>

      <v-col cols="12" md="2" align="center" justify="center">
        <v-avatar size="120" color="primary">
          <img :src="require('@/assets/app/logo.png')" alt="alt" />
        </v-avatar>
      </v-col>

      <v-col cols="12" md="2" align="center" justify="center">
        <v-avatar size="120" color="primary">
          <img :src="require('@/assets/app/logo.png')" alt="alt" />
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.team_avatar {
  cursor: pointer;
}
</style>

