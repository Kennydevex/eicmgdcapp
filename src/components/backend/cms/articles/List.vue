<template>
  <div>
    <v-row>
      <v-col>
        <v-card tile>
          <v-card-title primary-title>
            Ações
            <!-- <v-row>
              <v-col cols="12" md="4" align="end">
                <v-autocomplete
                  outlined
                  label="Numero de artigos"
                  :items="rows"
                  prepend-inner-icon="mdi-folder-plus-outline"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  prepend-icon="mdi-magnify"
                  name="name"
                  label="Procurar artigos"
                  id="search"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">Modo de visualizacao (Linha ou Coluna)</v-col>
            </v-row>-->
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <!-- <v-col cols="12" md="2">
                <v-card flat>
                  <v-card-title primary-title>Filtro</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <div>Categoria</div>
                        <div class="ml-5">
                          <v-radio-group v-model="value">
                            <v-radio label="label" value="value"></v-radio>
                            <v-radio label="label" value="value"></v-radio>
                            <v-radio label="label" value="value"></v-radio>
                            <v-radio label="label" value="value"></v-radio>
                          </v-radio-group>
                        </div>
                      </v-col>

                      <v-col cols="12">
                        <div>Marcadores</div>
                        <div class="ml-5">
                          <v-checkbox label="label" v-model="value" value="value"></v-checkbox>
                          <v-checkbox label="label" v-model="value" value="value"></v-checkbox>
                          <v-checkbox label="label" v-model="value" value="value"></v-checkbox>
                        </div>
                      </v-col>

                      <v-col cols="12">
                        <div>Estado</div>
                        <div class="ml-5">
                          <v-radio-group v-model="value">
                            <v-radio label="Ativo" value="value"></v-radio>
                            <v-radio label="Desativo" value="value"></v-radio>
                          </v-radio-group>
                        </div>
                      </v-col>

                      <v-col cols="12">
                        <div>Ano</div>
                        <div class="ml-5">
                          <v-autocomplete
                            outlined
                            label="Ano"
                            :items="years"
                            prepend-inner-icon="mdi-folder-plus-outline"
                          ></v-autocomplete>
                        </div>
                      </v-col>

                      <v-col cols="12">
                        <div>Em Destaques</div>
                        <div class="ml-5">
                          <v-checkbox label="Artigos em destaques" v-model="value" value="value"></v-checkbox>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>-->
              <!-- <v-divider vertical></v-divider> -->
              <v-col cols="12" md="10">
                <v-row>
                  <template v-for="(article, k) in articles">
                    <v-col cols="12" md="4" :key="k">
                      <v-card>
                        <v-list-item>
                          <!-- <v-list-item-avatar color="grey"></v-list-item-avatar> -->
                          <v-list-item-content>
                            <v-list-item-title class="body-1">{{article.title}}</v-list-item-title>
                            <v-list-item-subtitle>
                              Autor:
                              <span
                                class="font-italic"
                              >{{article.user.folk.name}} {{article.user.folk.lastname}}</span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-img
                          :src="`${apiUrl}/images/articles/covers/${article.cover}`"
                          height="120"
                        ></v-img>

                        <!-- <v-card-text>{{ article.summary|truncate(100)}}</v-card-text> -->

                        <v-card-actions>
                          <v-btn
                            small
                            color="info"
                            icon
                            @click="onView('view_article', article.slug)"
                          >
                            <v-icon>mdi-information-variant</v-icon>
                          </v-btn>
                          <v-btn
                            small
                            color="warning"
                            icon
                            @click="onUpdate('update_article', article.slug)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn
                            small
                            color="error"
                            icon
                            @click="onDelete('articles',article.id,'APP_UPDATE_ALL_ARTICLES_DATA')"
                          >
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                          <v-spacer></v-spacer>

                          <v-btn
                            @click="toggleStatus('featuredArticle',article.id, article.featuring, 'Artigo', 'getArticles')"
                            tile
                            class="text-none"
                            :color="article.featuring?'success':'info'"
                            x-small
                          >{{article.featuring?'Destaque':'Normal'}}</v-btn>

                          <v-btn
                            @click="toggleStatus('publishArticle',article.id, article.status, 'Artigo', 'getArticles')"
                            tile
                            class="text-none"
                            :color="article.status?'primary':'error'"
                            x-small
                          >{{article.status?'Publicado':'Pendente'}}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </template>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>Navegação</v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card id="articles-action">
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
            <v-btn :to="{ name: 'add_article'}" v-if="canAdd()" fab dark small color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  getDatas,
  getData,
  deleteData,
  handleActivation
} from "@/mixins/SendForm";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [
    flashAlert,
    actionAlert,
    getData,
    getDatas,
    deleteData,
    viewAndUpdate,
    truncateFilter,
    handleActivation
  ],
  data() {
    return {
      value: "",
      fab: false,
      years: ["2000", "2020", "2030", "2040"],
      rows: ["10", "20", "50", "100", "200"]
    };
  },

  computed: {
    articles: function() {
      return this.$store.getters.articles;
    },

    published_articles: function() {
      return this.$store.getters.published_articles;
    }
  },

  created: function() {
    this.getAll(this.articles, "getArticles");
    this.getAll(this.published_articles, "getPublishedArticles");
    window.getApp.$on("APP_UPDATE_ALL_ARTICLES_DATA", () => {
      this.refresh("getArticles");
      this.refresh("getPublishedArticles");
    });
  }
};
</script>

<style lang="scss" scoped>
#articles-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#articles-action .v-btn--floating {
  position: relative;
}
</style>