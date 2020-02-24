<template>
  <div>
    <v-parallax :src="require('@/assets/app/statics/Slide2.gif')" height="300">
      <v-layout
        data-aos="fade-down"
        data-aos-duration="2000"
        column
        align-center
        justify-center
        class="white--text"
      >
        <img :src="require('@/assets/app/logo.png')" alt="Percursu" height="100" />
        <h1 class="white--text display-1 text-center font-weight-thin">Nha Percursu</h1>
        <div
          class="subheading text-center mt-3 font-weight-light"
        >Projetar um perfil digno do meu percurso</div>
        <!-- <v-btn class="mt-3" color="blue lighten-2" dark href="/pre-made-themes">Criar Um Perfil</v-btn> -->
        <template>
          <div data-aos="zoom-out-up" data-aos-delay="300">
              <v-btn
                class="mt-3"
                color="primary"
                rounded
                dark
                href="/pre-made-themes"
              >Editar o Meu Perfil</v-btn>
             
          </div>
        </template>
      </v-layout>
    </v-parallax>
  </div>
</template>

