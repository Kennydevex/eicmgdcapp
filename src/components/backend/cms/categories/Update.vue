<template>
  <v-dialog v-model="updateCategoryModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-edit-outline</v-icon>
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
        <v-btn color="primary" small text @click="handleUpdateCategory(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateCategoryModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import CategoryForm from "@/forms/CategoryForm";

export default {
  data() {
    return {
      updateCategoryModal: false,
      formData: {
        id: "",
        name: "",
        display: "",
        color: "",
        description: "",
        roles: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_CATEGORY_MODAL", category => {
      if (category) {
        this.setCategoryUpdateForm(category);
      }
      this.handleUpdateCategoryModal();
    });
  },

  components: {
    CategoryForm
  },

  methods: {
    setCategoryUpdateForm(category) {
      this.formData = category;
    },

    handleUpdateCategoryModal() {
      window.getApp.$emit("APP_UPDATE_ALL_CATEGORIES_DATA");
      this.updateCategoryModal = !this.updateCategoryModal;
    },

    closeUpdateCategoryModel() {
      this.formData = {
        name: "",
        display: "",
        color: "",
        description: "",
        roles: []
      };
      this.updateCategoryModal = !this.updateCategoryModal;
    },


    handleUpdateCategory() {
      window.getApp.$emit("APP_UPDATE_CATEGORY");
    }
  }
};
</script>