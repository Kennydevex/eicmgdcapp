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
            >O registo do professor depende da instituição, pelo que não é possível cria-lo sem esse registo</v-col>
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

      <template v-if="teachers.length==0">
        <v-col class="py-0" cols="12">
          <v-alert tile border="top" colored-border type="info" elevation="2" dismissible>
            <v-row align="center">
              <v-col class="grow">Sem colaboradores registados para apresentar</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  @click="addTeacherModal()"
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
              <v-btn icon @click="onDelete('teachers','','APP_UPDATE_ALL_TEACHER_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addTeacherModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="teachers"
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
                    v-if="item.employee.perfil_photo"
                    alt="Foto de Perfil"
                    :src="`${apiUrl}/images/app/resources/employees/${item.employee.perfil_photo}`"
                  />
                  <v-icon v-else color="grey">mdi-teach</v-icon>
                </v-avatar>
              </template>

              <template v-slot:item.employee.active="{ item }">
                <v-btn
                  text
                  :disabled="!canActive()"
                  :loading="loadAtivaction[item.id]"
                  x-small
                  class="text-capitalize"
                  :color="item.employee.active==true?'primary':'grey darken-2'"
                  @click="toggleStatus('toggleTeacherStatus',item.id, item.employee.active, 'Professor', 'getTeachers')"
                >
                  <span>{{item.employee.active==true?'ativo':'desativo'}}</span>
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
                  @click="updateTeacherModal(item.id)"
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
                  @click="onDelete('teachers',item.id,'APP_UPDATE_ALL_TEACHERS_DATA')"
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
        <add-teacher></add-teacher>
        <update-teacher></update-teacher>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddTeacher from "./Create";
import UpdateTeacher from "./Update";
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
      teachers_id: [],
      headers: [
        { text: "", value: "perfil_photo" },
        {
          text: "Nome",
          value: "employee.folk.name"
        },

        {
          text: "Apelido",
          value: "employee.folk.lastname",
          align: "left"
        },

        {
          text: "Estado",
          value: "employee.active",
          sortable: false,

          align: "center"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      teacher: []
    };
  },

  computed: {
    teachers: function() {
      return this.$store.getters.teachers;
    },

    schools: function() {
      return this.$store.getters.schools;
    }
  },

  created: function() {
    this.getAll(this.teachers, "getTeachers");
    window.getApp.$on("APP_UPDATE_ALL_TEACHERS_DATA", () => {
      this.refresh("getTeachers");
    });
  },

  components: {
    AddTeacher,
    UpdateTeacher
  },

  methods: {
    addTeacherModal() {
      window.getApp.$emit("APP_ADD_TEACHER_MODAL");
    },

    updateTeacherModal(id) {
      this.teacher = this.getSingle("teachers", id, this.teachers);
      window.getApp.$emit("APP_UPDATE_TEACHER_MODAL", this.teacher);
    }
  }
};
</script>

<style lang="scss" scoped>
#teachers-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#teachers-action .v-btn--floating {
  position: relative;
}
</style>