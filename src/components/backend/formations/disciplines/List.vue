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
              placeholder="Procurar disciplinas na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn
                icon
                @click="onDelete('disciplines','','APP_UPDATE_ALL_DISCIPLINE_DATA', true)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addDisciplineModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="disciplines"
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
               :footer-props="{
                  itemsPerPageText: 'Registos por página'
               }"
            >
              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="warning"
                  small
                  icon
                  class="text-none mr-1"
                  @click="updateDisciplineModal(item.id)"
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
                  @click="onDelete('disciplines',item.id,'APP_UPDATE_ALL_DISCIPLINES_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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
        <add-discipline></add-discipline>
        <update-discipline></update-discipline>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddDiscipline from "./Create";
import UpdateDiscipline from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      disciplines_id: [],
      headers: [
        {
          text: "Nome da Dispiplina",
          value: "name"
        },

        {
          text: "Tipo de Saída",
          value: "type",
          align: "center"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },

        { text: "", value: "data-table-expand" }
      ],
      discipline: []
    };
  },

  computed: {
    disciplines: function() {
      return this.$store.getters.disciplines;
    }
  },

  created: function() {
    this.getAll(this.disciplines, "getDisciplines");
    window.getApp.$on("APP_UPDATE_ALL_DISCIPLINES_DATA", () => {
      this.refresh("getDisciplines");
    });
  },

  components: {
    AddDiscipline,
    UpdateDiscipline
  },

  methods: {
    addDisciplineModal() {
      window.getApp.$emit("APP_ADD_DISCIPLINE_MODAL");
    },

    updateDisciplineModal(id) {
      this.discipline = this.getSingle("disciplines", id, this.disciplines);
      window.getApp.$emit("APP_UPDATE_DISCIPLINE_MODAL", this.discipline);
    }
  }
};
</script>

<style lang="scss" scoped>
#disciplines-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#disciplines-action .v-btn--floating {
  position: relative;
}
</style>