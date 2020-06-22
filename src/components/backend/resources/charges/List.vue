<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar cargo na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('charges','','APP_UPDATE_ALL_CHARGE_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addChargeModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="charges"
              :items-per-page="10"
              class="elevation-1"
              item-key="id"
              show-select
              v-model="selected"
              no-data-text="Aguardando resposta do servidor..."
              no-results-text="Nada para mostrar"
              single-expand
              :expanded.sync="expanded"
              show-expand
            >
              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="warning"
                  small
                  icon
                  class="text-none mr-1"
                  @click="updateChargeModal(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="error"
                  small
                  icon
                  class="text-none"
                  @click="onDelete('charges',item.id,'APP_UPDATE_ALL_CHARGES_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <!-- <v-icon small class="mr-2" @click="updateChargeModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteCharge(item.id)">mdi-delete</v-icon> -->
              </template>

              <template v-slot:expanded-item="{item}">
                <td :colspan="headers.length">{{ item.description }}</td>
              </template>

              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="mdi-alert"
                class="ma-4"
              >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <add-charge></add-charge>
        <update-charge></update-charge>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddCharge from "./Create";
import UpdateCharge from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      charges_id: [],
      headers: [
        {
          text: "Cargo",
          value: "name"
        },

        {
          text: "Descrição do Cargo",
          value: "description",
          align: "left"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      charge: []
    };
  },

  computed: {
    charges: function() {
      return this.$store.getters.charges;
    }
  },

  created: function() {
    this.getAll(this.charges, "getCharges");
    window.getApp.$on("APP_UPDATE_ALL_CHARGES_DATA", () => {
      this.refresh("getCharges");
    });
  },

  components: {
    AddCharge,
    UpdateCharge
  },

  methods: {
    addChargeModal() {
      window.getApp.$emit("APP_ADD_CHARGE_MODAL");
    },

    updateChargeModal(id) {
      this.charge = this.getSingle("charges", id, this.charges);
      window.getApp.$emit("APP_UPDATE_CHARGE_MODAL", this.charge);
    }
  }
};
</script>

<style lang="scss" scoped>
#charges-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#charges-action .v-btn--floating {
  position: relative;
}
</style>