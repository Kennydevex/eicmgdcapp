<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            dense
            label="Nome*"
            name="name"
            v-model="formData.name"
            outlined
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="errorMsg('name') || errors.collect('name')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            dense
            label="Descrição da Categoria (Opcional)"
            name="description"
            hint="Apresente um pequena descrição desta categoria"
            v-model="formData.description"
            outlined
            rows="4"
            counter
            v-validate="'max:250'"
            data-vv-name="description"
            :error-messages="errorMsg('description') || errors.collect('description')"
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <span>Dispor artigos desta categoria em:</span>
          <v-radio-group dense v-model="formData.display" row>
            <v-radio label="Linha" value="1"></v-radio>
            <v-radio label="Coluna" value="2"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="my-0 py-0">
          <v-menu
            v-model="category_color_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                dense
                outlined
                name="category_color"
                :value="formData.color"
                label="Cor"
                prepend-inner-icon="mdi-palette"
                placeholder="Selecione uma cor para esta categoria"
                readonly
                v-on="on"
              >
                <template v-slot:append>
                  <v-chip :color="formData.color" small label></v-chip>
                </template>
              </v-text-field>
            </template>
            <v-color-picker flat v-model="formData.color"></v-color-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getBackEndError],
  props: ["formData"],

  data() {
    return {
      formErrors: [],
      category_color_menu: false
    };
  },

  created() {
    window.getApp.$on("APP_ADD_CATEGORY", add_new => {
      this.add(
        add_new,
        "categories",
        this.$props.formData,
        "APP_UPDATE_ALL_CATEGORIES_DATA",
        "APP_ADD_CATEGORY_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_CATEGORY", () => {
      this.update(
        "categories/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_CATEGORY_MODAL"
      );
    });
  }
};
</script>