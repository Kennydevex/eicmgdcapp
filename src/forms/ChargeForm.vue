<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" md="6" class="mb-0 py-0">
          <v-text-field
            dense
            label="Nome do cargo*"
            name="name"
            v-model="formData.name"
            outlined
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="(errors.has('name')) ? errors.collect('name'): formErrors.name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="mb-0 py-0">
          <v-autocomplete
            dense
            v-model="formData.section"
            name="section"
            outlined
            hide-no-data
            label="Sessão do cargo"
            :items="sections"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            dense
            label="Descrição deste cargo"
            name="description"
            hint="Apresente uma pequena descrição deste cargo"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            v-validate="'max:500'"
            data-vv-name="description"
            :error-messages="(errors.has('description')) ? errors.collect('description'): formErrors.description"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas } from "@/mixins/SendForm";
import { dateFormat } from "@/mixins/DateTime";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas, dateFormat],
  props: ["formData"],

  data() {
    return {
      dictionary: validateDictionary,

      sections: [
        { id: "1", name: "Direção" },
        { id: "2", name: "Secretaria" },
        { id: "3", name: "Bibliotáca" },
        { id: "4", name: "Geral" }
      ]
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_ADD_CHARGE", add_new => {
      this.add(
        add_new,
        "charges",
        this.$props.formData,
        "APP_UPDATE_ALL_CHARGES_DATA",
        "APP_ADD_CHARGE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_CHARGE", () => {
      this.update(
        "charges/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_CHARGE_MODAL"
      );
    });
  }
};
</script>