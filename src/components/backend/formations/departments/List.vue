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
                @click="onDelete('departments','','APP_UPDATE_ALL_DEPARTMENT_DATA', true)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addDepartmentModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="departments"
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
                  color="primary"
                  x-small
                  outlined
                  rounded
                  class="text-none mr-1"
                  @click="updateDepartmentModal(item.id)"
                >editar</v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="warning"
                  x-small
                  outlined
                  rounded
                  class="text-none"
                  @click="onDelete('departments',item.id,'APP_UPDATE_ALL_DEPARTMENTS_DATA')"
                >eliminar</v-btn>
                <!-- <v-icon small class="mr-2" @click="updateDepartmentModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteDepartment(item.id)">mdi-delete</v-icon> -->
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
        <add-department></add-department>
        <update-department></update-department>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddDepartment from "./Create";
import UpdateDepartment from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      departments_id: [],
      headers: [
        {
          text: "Departamento",
          value: "name"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },

        { text: "", value: "data-table-expand" }
      ],
      department: []
    };
  },

  computed: {
    departments: function() {
      return this.$store.getters.departments;
    }
  },

  created: function() {
    this.getAll(this.departments, "getDepartments");
    window.getApp.$on("APP_UPDATE_ALL_DEPARTMENTS_DATA", () => {
      this.refresh("getDepartments");
    });
  },

  components: {
    AddDepartment,
    UpdateDepartment
  },

  methods: {
    addDepartmentModal() {
      window.getApp.$emit("APP_ADD_DEPARTMENT_MODAL");
    },

    updateDepartmentModal(id) {
      this.department = this.getSingle("departments", id, this.departments);
      window.getApp.$emit("APP_UPDATE_DEPARTMENT_MODAL", this.department);
    }
  }
};
</script>

<style lang="scss" scoped>
#departments-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#departments-action .v-btn--floating {
  position: relative;
}
</style>