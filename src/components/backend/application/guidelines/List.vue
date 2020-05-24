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
              placeholder="Procurar utilizador na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('guidelines','','APP_UPDATE_ALL_GUIDELINE_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addGuidelineModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="guidelines"
              :items-per-page="10"
              class="elevation-1"
              item-key="id"
              show-select
              v-model="selected"
              no-data-text="Aguardando resposta do servidor..."
              no-results-text="Nada para mostrar"
            >
              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="primary"
                  x-small
                  outlined
                  rounded
                  class="text-none mr-1"
                  @click="updateGuidelineModal(item.id)"
                >editar</v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="warning"
                  x-small
                  outlined
                  rounded
                  class="text-none"
                  @click="onDelete('guidelines',item.id,'APP_UPDATE_ALL_GUIDELINES_DATA')"
                >eliminar</v-btn>
                <!-- <v-icon small class="mr-2" @click="updateGuidelineModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteGuideline(item.id)">mdi-delete</v-icon> -->
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
        <add-guideline></add-guideline>
        <update-guideline></update-guideline>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddGuideline from "./Create";
import UpdateGuideline from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      fab: false,
      search: "",
      guidelines_id: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },

        {
          text: "Descrição",
          value: "description",
          align: "left"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },
      ],
      guideline: []
    };
  },

  computed: {
    guidelines: function() {
      return this.$store.getters.guidelines;
    }
  },

  created: function() {
    this.getAll(this.guidelines, "getGuidelines");
    window.getApp.$on("APP_UPDATE_ALL_GUIDELINES_DATA", () => {
      this.refresh("getGuidelines");
    });
  },

  components: {
    AddGuideline,
    UpdateGuideline
  },

  methods: {
    addGuidelineModal() {
      window.getApp.$emit("APP_ADD_GUIDELINE_MODAL");
    },

    updateGuidelineModal(id) {
      this.guideline = this.getSingle("guidelines", id, this.guidelines);
      window.getApp.$emit("APP_UPDATE_GUIDELINE_MODAL", this.guideline);
    }
  }
};
</script>

<style lang="scss" scoped>
#guidelines-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#guidelines-action .v-btn--floating {
  position: relative;
}
</style>