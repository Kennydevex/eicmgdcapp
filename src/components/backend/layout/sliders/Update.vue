<template>
  <v-card v-if="slider">
    <v-card-title primary-title class="grey">
      <span class="font-weight-light text-capitalize">
        <v-icon>mdi-play-box-outline</v-icon>
        <small>&emsp;Editar Slider</small>
      </span>
    </v-card-title>
    <v-card-text>
      <slider-form :formData="slider" :update_form="true"></slider-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onUpdateSlider()">Guadar Alteração</v-btn>
      <v-btn small text @click="redirectTo('list_sliders')">Terminar</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import SliderForm from "@/forms/SliderForm";
import { cancelActions } from "@/mixins/Redirects";
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [cancelActions, getDatas],
  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    this.getAll(this.sliders, "getSliders");
  },

  computed: {
    sliders: function() {
      return this.$store.getters.sliders;
    },
    slider: function() {
      return this.$store.getters.slider(this.slug);
    }
  },

  components: {
    SliderForm
  },

  methods: {
    onUpdateSlider() {
      window.getApp.$emit("APP_UPDATE_SLIDER");
    }
  }
};
</script>