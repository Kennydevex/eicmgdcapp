<template>
  <div>
    <v-row>
      <template v-if="histories.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem histórias registadas para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  @click="addHistoryModal()"
                  v-if="canAdd()"
                  rounded
                  outlined
                  text
                  class="text-none"
                  color="primary"
                >Criar um historia</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader class="elevation-2" type="article, actions"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader class="elevation-2" type="article, actions"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader class="elevation-2" type="article, actions"></v-skeleton-loader>
        </v-col>
      </template>

      <v-col cols="12" v-else>
        <h3 class="font-weight-regular mb-7">Histórias da Instituição</h3>
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar histórias..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('histories','','APP_UPDATE_ALL_HISTORY_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn
              :disabled="histories.length==1"
              v-if="canAdd()"
              color="primary"
              fab
              small
              @click="addHistoryModal()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="histories"
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
                  icon
                  small
                  class="text-none mr-1"
                  @click="updateHistoryModal(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="error"
                  icon
                  small
                  class="text-none"
                  @click="onDelete('histories',item.id,'APP_UPDATE_ALL_HISTORIES_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <!-- <v-icon small class="mr-2" @click="updateHistoryModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteHistory(item.id)">mdi-delete</v-icon> -->
              </template>

              <template v-slot:expanded-item="{item}">
                <td :colspan="headers.length">{{ item.content }}</td>
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
      <v-col cols="12">
        <h3 class="font-weight-regular">Marcos Históricos</h3>
      </v-col>
      <v-col cols="12">
        <list-marks></list-marks>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <add-history></add-history>
        <update-history></update-history>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ListMarks from "../marks/List";
import AddHistory from "./Create";
import UpdateHistory from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      histories_id: [],
      headers: [
        // {
        //   text: "Escola",
        //   value: "school.name"
        // },
        {
          text: "Título da História",
          value: "title"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },

        { text: "", value: "data-table-expand" }
      ],
      history: []
    };
  },

  computed: {
    histories: function() {
      return this.$store.getters.histories;
    }
  },

  created: function() {
    this.getAll(this.histories, "getHistories");
    window.getApp.$on("APP_UPDATE_ALL_HISTORIES_DATA", () => {
      this.refresh("getHistories");
    });
  },

  components: {
    AddHistory,
    UpdateHistory,
    ListMarks
  },

  methods: {
    addHistoryModal() {
      window.getApp.$emit("APP_ADD_HISTORY_MODAL");
    },

    updateHistoryModal(id) {
      this.history = this.getSingle("histories", id, this.histories);
      window.getApp.$emit("APP_UPDATE_HISTORY_MODAL", this.history);
    }
  }
};
</script>

<style lang="scss" scoped>
#histories-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#histories-action .v-btn--floating {
  position: relative;
}
</style>