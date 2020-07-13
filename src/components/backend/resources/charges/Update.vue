<template>
  <v-dialog v-model="updateChargeModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-pencil</v-icon>
          <small>&emsp;Editar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <charge-form :formData="formData"></charge-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleUpdateCharge(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateMaskModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ChargeForm from "@/forms/ChargeForm";

export default {
  data() {
    return {
      updateChargeModal: false,
      formData: {
        name: "",
        description: "",
        section: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_CHARGE_MODAL", charge => {
      if (charge) {
        this.setChargeUpdateForm(charge);
      }
      this.handleUpdateChargeModal();
    });
  },

  components: {
    ChargeForm
  },

  methods: {
    setChargeUpdateForm(charge) {
      this.formData = charge;
    },

    handleUpdateChargeModal() {
      window.getApp.$emit("APP_UPDATE_ALL_CHARGES_DATA");
      this.updateChargeModal = !this.updateChargeModal;
    },

    closeUpdateMaskModel() {
      this.formData = {
        name: "",
        description: "",
        section: ""
      };
      this.updateChargeModal = !this.updateChargeModal;
    },

    handleUpdateCharge() {
      window.getApp.$emit("APP_UPDATE_CHARGE");
    }
  }
};
</script>