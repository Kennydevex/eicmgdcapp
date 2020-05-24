<template>
  <div>
    <v-form @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
      <v-row>
        <v-col cols="12" md="10">
          <v-text-field
            outlined
            name="name"
            label="Nome da Escola"
            v-model="formData.name"
            v-validate="'required'"
            data-vv-name="form-step-1.name"
            :error-messages="errors.collect('form-step-1.name')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field
            outlined
            name="abbreviation"
            label="Abreviatura"
            v-model="formData.abbreviation"
            v-validate="'required'"
            data-vv-name="form-step-1.abbreviation"
            :error-messages="errors.collect('form-step-1.abbreviation')"
            hint="Abreviatura do nome da Escola"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            outlined
            rows="1"
            name="slogan"
            label="Apresente um slogan"
            v-model="formData.slogan"
            auto-grow
            v-validate="'required'"
            data-vv-name="form-step-1.slogan"
            :error-messages="errors.collect('form-step-1.slogan')"
            hint="Um lema da escola"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-textarea
            outlined
            rows="4"
            name="description"
            label="Descrição da Escola"
            v-model="formData.description"
            auto-grow
            hint="Descriva esta escola"
            v-validate="'required'"
            data-vv-name="form-step-1.description"
            :error-messages="errors.collect('form-step-1.description')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <input
            style="display:none"
            name="opning_field_target"
            ref="valOpningRef"
            v-model="valOpning"
            type="text"
          />
          <v-menu
            v-model="opningDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                name="opning"
                :value="formattingOpningDate"
                label="Data de Abertura"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                v-validate="'required|date_format:dd/MM/yyyy|before:valOpningRef'"
                data-vv-as="form-step-1.opning"
                :error-messages="errors.collect('form-step-1.opning')"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.opning" @input="opningDateMenu = false" locale="pt-pt"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row class="my-3">
        <v-col cols="12">
          <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
          <v-btn class="text-none" @click.native="cancel()" text rounded>Sair</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["formData"],

  data() {
    return {};
  },

  methods: {
    cancel() {
      window.getApp.$emit("APP_CANCEL_FORM");
    },
     nextStep(form_step) {
      window.getApp.$emit("APP_NEXT_STEP", form_step);
    }
  }
};
</script>