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
          <small>Associar permissões a esta função</small>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="grey lighten-2">Permissões de acesso</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card flat height="300" class="overflow-y-auto pa-2">
                  <template v-for="(permission, per) in permissions">
                    <v-checkbox
                      :key="'perrole'+per"
                      dense
                      hide-details
                      v-model="formData.permissions"
                      :label="permission.name"
                      :value="permission.id"
                    ></v-checkbox>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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

  computed: {
    permissions: function() {
      return this.$store.getters.permissions;
    }
  },

  created() {
    window.getApp.$on("APP_ADD_ROLE", add_new => {
      this.add(
        add_new,
        "roles",
        this.$props.formData,
        "APP_UPDATE_ALL_ROLES_DATA",
        "APP_ADD_ROLE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_ROLE", () => {
      this.update(
        "roles/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_ROLE_MODAL"
      );
    });
  }
};
</script>