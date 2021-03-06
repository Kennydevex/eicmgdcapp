<template>
  <div>
    <v-row>
      <v-col class="py-0" cols="12" v-if="disciplines.length==0">
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
            >Nenhuma disciplina encontrada na base de dados, recomenda-se o seu registo, antes de configurar os cursos</v-col>
            <v-col class="shrink">
              <v-btn
                small
                :to="{ name: 'list_disciplines'}"
                v-if="canAdd()"
                rounded
                outlined
                color="primary"
                text
                class="text-none"
              >Gerir Disciplinas</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>

      <v-col class="py-0" cols="12" v-if="departments.length==0">
        <v-alert
          v-model="dep_alert"
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
            >Atenção, para conigurar um curso, precisa-se de departamentos, que ainda não se encontram registados</v-col>
            <v-col class="shrink">
              <v-btn
                small
                :to="{ name: 'list_departments'}"
                v-if="canAdd()"
                rounded
                outlined
                text
                class="text-none"
                color="primary"
              >Crai um departamento</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>

      <v-col class="py-0" cols="12" v-if="outcomes.length==0">
        <v-alert type="info" text elevation="2" dismissible tile>
          <v-row align="center">
            <v-col class="grow">
              Ainda não existem saídas profissionais ou académicas registados para atrubuir ao curso, mas pode-se regista-las durante a sua configuração. Ou então,
              <v-btn color="primary" small text outlined rounded :to="{ name: 'list_outcomes'}">Aqui</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>

      <template v-if="courses.length==0">
        <v-col class="py-0" cols="12">
          <v-alert
            tile
            border="top"
            colored-border
            type="info"
            elevation="2"
            dismissible
          >Sem nenhum curso registados para apresentar</v-alert>
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

      <template v-else>
        <v-col cols="12">
          <v-card>
            <v-toolbar color="white" flat>
              <v-text-field
                flat
                solo
                prepend-icon="mdi-magnify"
                placeholder="Procurar Cursos..."
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <template v-if="selected.length>0">
                <v-btn icon @click="onDelete('courses','','APP_UPDATE_ALL_COURSES_DATA', true)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <v-btn icon>
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :search="search"
                :items="courses"
                :items-per-page="10"
                class="elevation-1"
                item-key="id"
                show-select
                v-model="selected"
                no-data-text="Aguardando resposta do servidor..."
                no-results-text="Nada para mostrar"
                :footer-props="{
                  itemsPerPageText: 'Registos por página'
               }"
              >
                <template v-slot:item.status="{ item }">
                  <v-btn
                    text
                    :disabled="!canActive()"
                    :loading="loadAtivaction[item.id]"
                    x-small
                    class="text-capitalize"
                    :color="item.status==true?'primary':'grey darken-2'"
                    @click="toggleStatus('toggleCourseStatus',item.id, item.status, 'Curso', 'getCourses')"
                  >
                    <span>{{item.status==true?'ativo':'desativo'}}</span>
                    <span slot="loader" class="custom-loader-class">
                      <v-icon small>mdi-dots-horizontal</v-icon>
                    </span>
                  </v-btn>
                </template>

                <template v-slot:item.color="{ item }">
                  <v-chip :color="item.color" label x-small outlined>{{item.color}}</v-chip>
                </template>

                <template v-slot:item.action="{ item }">
                  <v-btn
                    color="info"
                    icon
                    class="text-none mr-1"
                    @click="onView('view_course', item.slug)"
                  >
                    <v-icon>mdi-information-variant</v-icon>
                  </v-btn>

                  <!-- <v-icon small class="mr-2" @click="onView('view_course', item.slug)">mdi-eye</v-icon> -->

                  <v-btn
                    v-if="canEdit()"
                    color="warning"
                    icon
                    class="text-none mr-1"
                    @click="onUpdate('update_course', item.slug)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <!-- :disabled="selected.length > 0" -->
                  <v-btn
                    v-if="canRemove()"
                    color="error"
                    icon
                    class="text-none"
                    @click="onDelete('courses', item.id, 'APP_UPDATE_ALL_COURSES_DATA')"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <!-- 
                  <v-icon
                    v-if="canEdit()"
                    small
                    class="mr-2"
                    @click="onUpdate('update_course', item.slug)"
                  >mdi-pencil</v-icon>
                  <v-icon
                    v-if="canRemove()"
                    small
                    @click="onDelete('courses', item.id, 'APP_UPDATE_ALL_COURSES_DATA')"
                  >mdi-delete</v-icon>-->
                  <!-- ===================================== -->
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
      </template>
    </v-row>
    <v-row>
      <v-col>
        <v-card id="courses-action">
          <v-speed-dial
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="primary" dark fab>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn :to="{ name: 'add_course'}" v-if="canAdd()" fab dark small color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";

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
    getDatas,
    getData,
    deleteData,
    handleActivation,
    viewAndUpdate
  ],
  data() {
    return {
      fab: false,
      dep_alert: true,
      search: "",
      selected: [],
      headers: [
        {
          text: "Curso",
          value: "name"
        },
        {
          text: "Cor",
          value: "color",
          align: "center"
        },
        {
          text: "Data de Abertura",
          value: "release"
        },
        // {
        //   text: "Tipo",
        //   value: "type"
        // },
        {
          text: "Estado",
          value: "status",
          align: "center"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ]
    };
  },
  created: function() {
    this.getAll(this.courses, "getCourses");
    this.getAll(this.departments, "getDepartments");
    this.getAll(this.outcomes, "getOutcomes");
    this.getAll(this.disciplines, "getDisciplines");
    window.getApp.$on("APP_UPDATE_ALL_COURSES_DATA", () => {
      this.refresh("getCourses");
    });
  },

  computed: {
    courses: function() {
      return this.$store.getters.courses;
    },

    outcomes: function() {
      return this.$store.getters.outcomes;
    },

    disciplines: function() {
      return this.$store.getters.disciplines;
    },

    departments: function() {
      return this.$store.getters.departments;
    }
  }
};
</script>



<style lang="scss" scoped>
#courses-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#courses-action .v-btn--floating {
  position: relative;
}
</style>