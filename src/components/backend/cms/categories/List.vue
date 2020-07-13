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
              <v-btn icon @click="onDelete('categories','','APP_UPDATE_ALL_CATEGORIES_DATA', true)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <v-btn icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn v-if="canAdd()" color="primary" fab small @click="addCategoryModal()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="categories"
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
              <template v-slot:item.action="{ item }">
                <v-btn
                  v-if="canEdit()"
                  color="primary"
                  x-small
                  outlined
                  rounded
                  class="text-none mr-1"
                  @click="updateCategoryModal(item.id)"
                >editar</v-btn>
                <!-- :disabled="selected.length > 0" -->
                <v-btn
                  v-if="canRemove()"
                  color="warning"
                  x-small
                  outlined
                  rounded
                  class="text-none"
                  @click="onDelete('categories',item.id,'APP_UPDATE_ALL_CATEGORIES_DATA')"
                >eliminar</v-btn>
                <!-- <v-icon small class="mr-2" @click="updateCategoryModal(item.id)">mdi-pencil</v-icon> -->
                <!-- <v-icon small @click="onDeleteCategory(item.id)">mdi-delete</v-icon> -->
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
        <add-category></add-category>
        <update-category></update-category>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddCategory from "./Create";
import UpdateCategory from "./Update";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { getDatas, getData, deleteData } from "@/mixins/SendForm";

export default {
  mixins: [flashAlert, actionAlert, getData, getDatas, deleteData],

  data() {
    return {
      fab: false,
      search: "",
      categories_id: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },
        {
          text: "Descrição",
          value: "description"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      category: []
    };
  },

  computed: {
    categories: function() {
      return this.$store.getters.categories;
    }
  },

  created: function() {
    this.getAll(this.categories, "getCategories");
    window.getApp.$on("APP_UPDATE_ALL_CATEGORIES_DATA", () => {
      this.refresh("getCategories");
    });
  },

  components: {
    AddCategory,
    UpdateCategory
  },

  methods: {
    addCategoryModal() {
      window.getApp.$emit("APP_ADD_CATEGORY_MODAL");
    },

    updateCategoryModal(id) {
      this.category = this.getSingle("categories", id, this.categories);
      window.getApp.$emit("APP_UPDATE_CATEGORY_MODAL", this.category);
    }
  }
};
</script>

<style lang="scss" scoped>
#categories-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#categories-action .v-btn--floating {
  position: relative;
}
</style>