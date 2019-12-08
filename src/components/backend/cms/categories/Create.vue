<template>
  <v-dialog v-model="addCategoryModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
         <small class="font-weight-light text-capitalize">
        <v-icon>mdi-folder-plus-outline</v-icon>
        <small>&emsp;Criar Categoria</small>
      </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <category-form :formData="formData"></category-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddCategory(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddCategory(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddCategoryModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import CategoryForm from "@/forms/CategoryForm";

export default {
  data() {
    return {
      addCategoryModal: false,
      formData: {
        name: "",
        description: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_CATEGORY_MODAL", () => {
      this.handleAddCategoryModal();
    });
  },

  components: {
    CategoryForm
  },

  methods: {
    handleAddCategoryModal() {
      this.addCategoryModal = !this.addCategoryModal;
    },

    handleAddCategory(add_new) {
      window.getApp.$emit("APP_ADD_CATEGORY", add_new);
    }
  }
};
</script>