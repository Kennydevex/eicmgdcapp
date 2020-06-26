<template>
  <div>
    <v-row>
      <v-col class="py-0" cols="12">
        <v-alert border="top" colored-border dense tile text type="warning" elevation="2" dismissible v-model="mural_alert">
          <v-row align="center">
            <v-col>Limita-se a criação de até três lemas, se realmente for necessario cria mais, contacte o adminitrador do sistema</v-col>
          </v-row>
        </v-alert>
      </v-col>

      <template v-if="murals.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem registos para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  @click="addMuralModal()"
                  v-if="canAdd()"
                  rounded
                  outlined
                  text
                  class="text-none"
                  color="primary"
                >Criar um lema</v-btn>
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
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar lema na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('murals','','APP_UPDATE_ALL_MURAL_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn
              v-if="canAdd()"
              color="primary"
              fab
              small
              @click="addMuralModal()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="murals"
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
              <template v-slot:item.icon="{ item }">
                <v-icon large color="primary">{{item.icon}}</v-icon>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="warning"
                  icon
                  small
                  class="text-none mr-1"
                  @click="updateMuralModal(item.id)"
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
                  @click="onDelete('murals',item.id,'APP_UPDATE_ALL_MURALS_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <!-- <v-icon small class="mr-2" @click="updateMuralModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteMural(item.id)">mdi-delete</v-icon> -->
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
        <add-mural></add-mural>
        <update-mural></update-mural>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddMural from "./Create";
import UpdateMural from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      mural_alert: false,
      expanded: [],
      fab: false,
      search: "",
      murals_id: [],
      headers: [
        {
          text: "Ícone",
          value: "icon",
          align: "center",
          sortable: false
        },

        {
          text: "Mural/Lema",
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
      mural: []
    };
  },

  computed: {
    murals: function() {
      return this.$store.getters.murals;
    }
  },

  created: function() {
    this.getAll(this.murals, "getMurals");
    window.getApp.$on("APP_UPDATE_ALL_MURALS_DATA", () => {
      this.refresh("getMurals");
    });
  },

  components: {
    AddMural,
    UpdateMural
  },

  methods: {
    addMuralModal() {
      if (this.murals.length >= 3) {
        this.mural_alert = true;
        return;
      }
      window.getApp.$emit("APP_ADD_MURAL_MODAL");
    },

    updateMuralModal(id) {
      this.mural = this.getSingle("murals", id, this.murals);
      window.getApp.$emit("APP_UPDATE_MURAL_MODAL", this.mural);
    }
  }
};
</script>

<style lang="scss" scoped>
#murals-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#murals-action .v-btn--floating {
  position: relative;
}
</style>