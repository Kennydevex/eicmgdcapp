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
              placeholder="Procurar funções yes na tabela..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length>0 && canEdit()">
              <v-btn icon @click="onDelete('roles','','APP_UPDATE_ALL_ROLES_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addRoleModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="roles"
              :items-per-page="5"
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
              <!-- :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: 'mdi-minus',
                  nextIcon: 'mdi-plus'
              }"-->
              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="primary"
                  x-small
                  outlined
                  rounded
                  class="text-none mr-1"
                  @click="updateRoleModal(item.id)"
                >editar</v-btn>
                <v-btn
                  v-if="canRemove()"
                  color="warning"
                  x-small
                  outlined
                  rounded
                  class="text-none"
                  @click="onDelete('roles',item.id,'APP_UPDATE_ALL_ROLES_DATA')"
                >eliminar</v-btn>
                <!-- <v-icon small class="mr-2" @click="updateRoleModal(item.id)">mdi-pencil</v-icon>
                <v-icon small @click="onDeleteRole(item.id)">mdi-delete</v-icon>-->
              </template>

              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="mdi-alert"
                class="ma-4"
              >A procura pela "{{ search }}" não tem qualquer resultado.</v-alert>
              <v-data-footer>testtrtrtr</v-data-footer>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <add-role></add-role>
        <update-role></update-role>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddRole from "./Create";
import UpdateRole from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      fab: false,

      search: "",
      selected: [],
      roles_id: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      role: [],
      deleted: false
    };
  },

  computed: {
    roles: function() {
      return this.$store.getters.roles;
    }
  },

  created: function() {
    this.getAll(this.roles, "getRoles");
    window.getApp.$on("APP_UPDATE_ALL_ROLES_DATA", () => {
      this.refresh("getRoles");
    });
  },

  components: {
    AddRole,
    UpdateRole
  },

  methods: {
    addRoleModal() {
      window.getApp.$emit("APP_ADD_ROLE_MODAL");
    },

    updateRoleModal(id) {
      this.role = this.getSingle("roles", id, this.roles);
      window.getApp.$emit("APP_UPDATE_ROLE_MODAL", this.role);
    }
  }
};
</script>

<style lang="scss" scoped>
#roles-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#roles-action .v-btn--floating {
  position: relative;
}
</style>