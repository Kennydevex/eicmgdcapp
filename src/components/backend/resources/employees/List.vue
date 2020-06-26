<template>
  <div>
    <v-row>
      <v-col class="py-0" cols="12" v-if="schools.length==0">
          <!-- v-model="dep_alert" -->
        <v-alert
          border="top"
          colored-border
          type="error"
          elevation="2"
          dismissible
          prominent
          icon="mdi-alert"
          tile
        >
          <v-row align="center">
            <v-col
              class="grow"
            >O registo do colaorador depende da instituição, pelo que não é possível cria-lo sem esse registo</v-col>
            <v-col class="shrink">
              <v-btn
                small
                :to="{ name: 'add_school'}"
                v-if="canAdd()"
                rounded
                outlined
                text
                class="text-none"
                color="primary"
              >Configurar Instituição</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>

      <template v-if="employees.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem colaboradores registados para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  @click="addEmployeeModal()"
                  v-if="canAdd()"
                  rounded
                  outlined
                  text
                  class="text-none"
                  color="primary"
                >Criar um colaborador</v-btn>
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
              placeholder="Procurar utilizador na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canRemove()">
              <v-btn icon @click="onDelete('employees','','APP_UPDATE_ALL_EMPLOYEE_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addEmployeeModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="employees"
              :items-per-page="10"
              class="elevation-1"
              item-key="id"
              show-select
              v-model="selected"
              no-data-text="Aguardando resposta do servidor..."
              no-results-text="Nada para mostrar"
            >
              <template v-slot:item.perfil_photo="{ item }">
                <v-avatar size="36px" color="grey lighten-3">
                  <img
                    v-if="item.perfil_photo"
                    alt="Foto de Perfil"
                    :src="`${apiUrl}/images/app/resources/employees/${item.perfil_photo}`"
                  />
                  <v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
                </v-avatar>
              </template>

              <!-- <template v-slot:item.charges.0.name="{ item }">
                <v-chip
                  v-if="item.charges"
                  small
                  :color="item.charges[0].name=='Diretor'?'primary':'grey lighten-2'"
                  label
                >{{item.charges[0].name}}</v-chip>
              </template> -->

              <template v-slot:item.active="{ item }">
                <v-btn
                  text
                  :disabled="!canActive()"
                  :loading="loadAtivaction[item.id]"
                  x-small
                  class="text-capitalize"
                  :color="item.active==true?'primary':'grey darken-2'"
                  @click="toggleStatus('toggleEmployeeStatus',item.id, item.active, 'Colaborador', 'getEmployees')"
                >
                  <span>{{item.active==true?'ativo':'desativo'}}</span>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn color="primary" small text class="text-none mr-1" icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
                <v-btn
                  v-if="canEdit()"
                  color="warning"
                  small
                  text
                  class="text-none mr-1"
                  @click="updateEmployeeModal(item.id)"
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="error"
                  small
                  text
                  icon
                  class="text-none"
                  @click="onDelete('employees',item.id,'APP_UPDATE_ALL_EMPLOYEES_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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
        <add-employee></add-employee>
        <update-employee></update-employee>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddEmployee from "./Create";
import UpdateEmployee from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import {
  getDatas,
  getData,
  deleteData,
  handleActivation
} from "@/mixins/SendForm";

export default {
  mixins: [
    flashAlert,
    actionAlert,
    getData,
    getDatas,
    deleteData,
    handleActivation
  ],

  data() {
    return {
      expanded: [],
      fab: false,
      search: "",
      employees_id: [],
      headers: [
        { text: "", value: "perfil_photo" },
        {
          text: "Nome",
          value: "folk.name"
        },

        {
          text: "Apelido",
          value: "folk.lastname",
          align: "left"
        },

        // {
        //   text: "Cargo",
        //   value: "charges.0.name",
        //   align: "center"
        // },

        // {
        //   text: "Início de Atividade",
        //   value: "charges.0.encumbrance.activity_begin",
        //   align: "center"
        // },

        {
          text: "Estado",
          value: "active",
          align: "center",
          sortable: false,

        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      employee: []
    };
  },

  computed: {
    employees: function() {
      return this.$store.getters.employees;
    },

    schools: function() {
      return this.$store.getters.schools;
    }
  },

  created: function() {
    this.getAll(this.employees, "getEmployees");
    window.getApp.$on("APP_UPDATE_ALL_EMPLOYEES_DATA", () => {
      this.refresh("getEmployees");
    });
  },

  components: {
    AddEmployee,
    UpdateEmployee
  },

  methods: {
    addEmployeeModal() {
      window.getApp.$emit("APP_ADD_EMPLOYEE_MODAL");
    },

    updateEmployeeModal(id) {
      this.employee = this.getSingle("employees", id, this.employees);
      window.getApp.$emit("APP_UPDATE_EMPLOYEE_MODAL", this.employee);
    }
  }
};
</script>

<style lang="scss" scoped>
#employees-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#employees-action .v-btn--floating {
  position: relative;
}
</style>