<template>
  <v-dialog v-model="addTagModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
         <small class="font-weight-light text-capitalize">
        <v-icon>mdi-tag-plus</v-icon>
        <small>&emsp;Criar Marcador</small>
      </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <tag-form :formData="formData"></tag-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddTag(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddTag(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddTagModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import TagForm from "@/forms/TagForm";

export default {
  data() {
    return {
      addTagModal: false,
      formData: {
        name: "",
        description: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_TAG_MODAL", () => {
      this.handleAddTagModal();
    });
  },

  components: {
    TagForm
  },

  methods: {
    handleAddTagModal() {
      this.addTagModal = !this.addTagModal;
    },

    handleAddTag(add_new) {
      window.getApp.$emit("APP_ADD_TAG", add_new);
    }
  }
};
</script>