<template>
  <div>
    <v-row>
      <v-col>
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
            <template v-if="selected.length>0">
              <v-btn icon @click="onDelete('users','','APP_UPDATE_ALL_USERS_DATA', true)">
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
              :items="users"
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
                  :disabled="!canActive()"
                  :loading="loadAtivaction[item.id]"
                  x-small
                  text
                  class="text-capitalize"
                  :color="item.status==true?'primary':'grey darken-2'"
                  @click="toggleStatus('toggleUserStatus',item.id, item.status, 'Utilizador', 'getUsers')"
                >
                  <span>{{item.status==true?'ativo':'desativo'}}</span>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="warning"
                  icon
                  small
                  class="text-none mr-1"
                  @click="updateUserModal(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                  v-if="canRemove()"
                  color="error"
                  icon
                  small
                  class="text-none"
                  @click="onDelete('users',item.id,'APP_UPDATE_ALL_USERS_DATA')"
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
        <v-card id="users-action">
          <v-speed-dial
            color="primary"
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
            <v-btn v-if="canAdd()" fab dark small color="primary" @click="addUserModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <add-user></add-user>
        <update-user></update-user>
        <user-info :formData="user"></user-info>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddUser from "./Create";
import UserInfo from "./View";
import UpdateUser from "./Update";
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
    getDatas,
    getData,
    deleteData,
    handleActivation
  ],

  data() {
    return {
      activedUsers: [],
      fab: false,

      search: "",
      selected: [],
      users_id: [],
      headers: [
        {
          text: "Nome",
          value: "folk.name"
        },
        {
          text: "Apelido",
          value: "folk.lastname"
        },
        {
          text: "Utilizador",
          value: "username"
        },
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
      ],
      user: []
    };
  },

  computed: {
    users: function() {
      return this.$store.getters.users;
    }
  },

  created: function() {
    this.getAll(this.users, "getUsers");
    window.getApp.$on("APP_UPDATE_ALL_USERS_DATA", () => {
      this.refresh("getUsers");
    });
  },

  components: {
    AddUser,
    UpdateUser,
    UserInfo
  },

  methods: {
    addUserModal() {
      window.getApp.$emit("APP_ADD_USER_MODAL");
    },

    updateUserModal(id) {
      this.user = this.getSingle("users", id, this.users);
      window.getApp.$emit("APP_UPDATE_USER_MODAL", this.user);
    },

    userInfoModal(id) {
      this.user = this.getSingle("users", id, this.users);
      window.getApp.$emit("APP_USER_INFO_MODAL", this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
#users-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#users-action .v-btn--floating {
  position: relative;
}
</style>