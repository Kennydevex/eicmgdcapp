<template>
  <v-dialog v-model="userInfoModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-information</v-icon>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">Informa;\ao de utilizador{{formData.username}}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn small text @click="handleUserInfoModal">Sair</v-btn>
        <v-btn small text @click="handleUpdateUserModal()">Editar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["formData"],
  data() {
    return {
      disable_field: true,
      userInfoModal: false
    };
  },

  created() {
    window.getApp.$on("APP_USER_INFO_MODAL", () => {
      this.handleUserInfoModal();
    });
    //  window.getApp.$on("APP_USER_INFO_MODAL", user => {
    //   this.handleUserInfoModal();
    // });
  },

  methods: {
    handleUserInfoModal() {
      this.userInfoModal = !this.userInfoModal;
    },

    handleUserInfo() {
      window.getApp.$emit("APP_USER_INFO");
    },

    handleUpdateUserModal() {
    //   this.userInfoModal = !this.userInfoModal;
      window.getApp.$emit("APP_UPDATE_USER_MODAL", this.formData);
    }
  }
};
</script>