<template>
  <div>
    <v-row>
      <template v-if="marks.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem marcos registados para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  @click="addMarkModal()"
                  v-if="canAdd()"
                  rounded
                  outlined
                  text
                  class="text-none"
                  color="primary"
                >Criar um marco história</v-btn>
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
              placeholder="Procurar morcos históricos na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('marks','','APP_UPDATE_ALL_MARK_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addMarkModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="marks"
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
                  icon
                  small
                  class="text-none mr-1"
                  @click="updateMarkModal(item.id)"
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
                  @click="onDelete('marks',item.id,'APP_UPDATE_ALL_MARKS_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <!-- <v-icon small class="mr-2" @click="updateMarkModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteMark(item.id)">mdi-delete</v-icon> -->
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
        <add-mark></add-mark>
        <update-mark></update-mark>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddMark from "./Create";
import UpdateMark from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      marks_id: [],
      headers: [
        {
          text: "Designação",
          value: "title"
        },

        {
          text: "Início",
          value: "begin",
          align: "center"
        },

        {
          text: "Fim",
          value: "end",
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
      mark: []
    };
  },

  computed: {
    marks: function() {
      return this.$store.getters.marks;
    }
  },

  created: function() {
    this.getAll(this.marks, "getMarks");
    window.getApp.$on("APP_UPDATE_ALL_MARKS_DATA", () => {
      this.refresh("getMarks");
    });
  },

  components: {
    AddMark,
    UpdateMark
  },

  methods: {
    addMarkModal() {
      window.getApp.$emit("APP_ADD_MARK_MODAL");
    },

    updateMarkModal(id) {
      this.mark = this.getSingle("marks", id, this.marks);
      window.getApp.$emit("APP_UPDATE_MARK_MODAL", this.mark);
    }
  }
};
</script>

<style lang="scss" scoped>
#marks-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#marks-action .v-btn--floating {
  position: relative;
}
</style>