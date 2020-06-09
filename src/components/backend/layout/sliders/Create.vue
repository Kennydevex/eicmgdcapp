<template>
  <v-card tile>
    <v-card-title primary-title class="grey">
      <span class="font-weight-light text-capitalize">
        <v-icon>mdi-play-box-outline</v-icon>
        <small>&emsp;Criar Slider</small>
      </span>
    </v-card-title>
    <v-card-text>
      <slider-form :formData="formData" :updating="false"></slider-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onAddSlider(false)">Guardar</v-btn>
      <!-- <v-btn color="primary" small text @click="onAddSlider(false)">Guardar e Sair</v-btn> -->
      <v-btn small text @click="back2('list_sliders')">Sair</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SliderForm from "@/forms/SliderForm";
import { cancelActions } from "@/mixins/Redirects";

export default {
  mixins: [cancelActions],
  data() {
    return {
      addSliderModal: false,
      formData: {
        title: "",
        summary: "",
        link: "",
        btn_text: "Ler Mais",
        btn_style: "1",
        background: null,
        background_type: "1",
        color: "#000000ff",
        type: "3",
        status: false
      }
    };
  },

  created() {
    window.getApp.$on("APP_CANCEL_ADD_SLIDER", () => {
      this.back();
    });
  },

  methods: {
    resetFormData() {
      this.formData = {
        title: "",
        summary: "",
        link: "",
        btn_text: "Ler Mais",
        btn_style: "1",
        background: null,
        background_type: "1",
        color: "#000000ff",
        type: "",
        status: false
      };
    },

    onAddSlider(add_new) {
      window.getApp.$emit("APP_VALIDATE_DATE");
      window.getApp.$emit("APP_ADD_SLIDER", add_new);
      // this.resetFormData();
    }
  },

  components: {
    SliderForm
  }
};
</script>