<template>
  <span>
    <v-file-input
      outlined
      accept="image/png, image/jpeg, image/bmp"
      :label="label"
      :placeholder="placeholder"
      :prepend-icon="icon"
      :rules="rules"
      @change="onFileSelected"
    ></v-file-input>
  </span>
</template>
<script>
export default {
  props: {
    label: { type: String, default: "Imagem" },
    placeholder: { type: String, default: "Carregar uma imagem" },
    icon: { type: String, default: "mdi-camera" },
    rules: { type: Array }
  },

  methods: {
    onFileSelected(e) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(e);
      fileReader.onload = event => {
        this.$emit("handleFileUpload", event.target.result);
      };
    }
  }
};
</script>