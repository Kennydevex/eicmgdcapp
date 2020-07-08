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
          <small>Associar funções a esta permissão</small>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="grey lighten-2">Papeis/Funcções</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card flat height="300" class="overflow-y-auto pa-2">
                  <template v-for="(role, rol) in roles">
                    <v-checkbox
                      :key="'roleper_'+rol"
                      dense
                      hide-details
                      v-model="formData.roles"
                      :label="role.name"
                      :value="role.id"
                    ></v-checkbox>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- <v-autocomplete
            dense
            :disabled="roles.length==0"
            v-model="formData.roles"
            outlined
            multiple
            chips
            :items="roles"
            item-text="name"
            item-value="id"
            label="Funções"
            :error-messages="roles.length==0?'Campo desativado porque não tem nenhuma função registada para vincular':''"
          ></v-autocomplete>-->
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getBackEndError],
  props: ["formData"],

  data() {
    return {
      dictionary: validateDictionary
    };
  },

  computed: {
    roles: function() {
      return this.$store.getters.roles;
    }
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_ADD_PERMISSION", add_new => {
      this.add(
        add_new,
        "permissions",
        this.$props.formData,
        "APP_UPDATE_ALL_PERMISSIONS_DATA",
        "APP_ADD_PERMISSION_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_PERMISSION", () => {
      this.update(
        "permissions/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_PERMISSION_MODAL"
      );
    });
  }
};
</script>