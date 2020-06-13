<template>
  <v-dialog v-model="addChargeModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-tag-plus</v-icon>
          <small>&emsp;Criar Cargo</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <charge-form :formData="formData"></charge-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddCharge(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddCharge(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddChargeModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import ChargeForm from "@/forms/ChargeForm";

export default {
  data() {
    return {
      addChargeModal: false,
      formData: {
        name: "",
        description: "",
        section: "1"
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_CHARGE_MODAL", () => {
      this.handleAddChargeModal();
    });
  },

  components: {
    ChargeForm
  },

  methods: {
    handleAddChargeModal() {
      this.addChargeModal = !this.addChargeModal;
    },

    handleAddCharge(add_new) {
      window.getApp.$emit("APP_ADD_CHARGE", add_new);
    }
  }
};
</script>