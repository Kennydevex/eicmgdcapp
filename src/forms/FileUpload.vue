<template>
  <v-file-input
    :accept="accept"
    :label="label"
    :outlined="outlined"
    :rounded="rounded"
    :placeholder="placeholder"
    :prepend-icon="icon"
    :rules="rules"
    v-model="formD"
    show-size
    autofocus
    @change="onLogoSelected"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template></v-file-input>
</template>
<script>
export default {
  props: {
    formD: { type: String },
    accept: { type: String },
    label: { type: String },
    outlined: { type: Boolean },
    rounded: { type: Boolean },
    chips: { type: Boolean },
    placeholder: { type: String },
    icon: { type: String, default: "mdi-camera" },
    rules: { type: Array },
  },

  methods: {
    onLogoSelected(e) {
      try {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        fileReader.onload = event => {
          this.$emit("handleFileUpload", event.target.result);
        };
      } catch (error) {
          console.log("Cuidado!! Operação cancelada no momento crítico!!!");
      }
    }
  }
};
</script>