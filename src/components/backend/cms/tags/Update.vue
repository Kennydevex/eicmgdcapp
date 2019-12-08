<template>
  <v-dialog v-model="updateTagModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-edit-outline</v-icon>
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
        <v-btn color="primary" small text @click="handleUpdateTag(true)">Guardar alterações</v-btn>
        <v-btn small text @click="handleUpdateTagModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import TagForm from "@/forms/TagForm";

export default {
  data() {
    return {
      updateTagModal: false,
      formData: {
        id: "",
        name: "",
        roles: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_TAG_MODAL", tag => {
      if (tag) {
        this.setTagUpdateForm(tag);
      }
      this.handleUpdateTagModal();
    });
  },

  components: {
    TagForm
  },

  methods: {
    setTagUpdateForm(tag) {
      this.formData = tag;
    },

    handleUpdateTagModal() {
      window.getApp.$emit("APP_UPDATE_ALL_TAGS_DATA");
      this.updateTagModal = !this.updateTagModal;
    },

    handleUpdateTag() {
      window.getApp.$emit("APP_UPDATE_TAG");
    }
  }
};
</script>