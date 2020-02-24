<template>
  <v-container grid-list-xs class="mt-0">
    <v-layout row wrap class="mt-0">
      <!-- <v-flex xs12 md2 class="px-3 mt-0 pt-0">
        <v-row class="pa-0 mx-0 mb-4">
          <v-col class="pa-0 ma-0">
            <v-card class="elevation-2">
              <v-card-title primary-title>Categorias</v-card-title>
              <v-card-text>teste</v-card-text>
            </v-card>
          </v-col>
        </v-row>
       
      </v-flex>-->
      <v-flex xs12 md9>
        <template v-for="category in categories">
          <v-card class="mb-8" :key="'categoria'+category.id" flat tile>
            <v-card-title
              class="grey lighten-4 black--text py-2 mx-0 text-capitalize font-weight-light"
              primary-title
            >{{category.name}}</v-card-title>
            <v-card-text class="ma-0 pa-1">
              <v-row class="my-1 pa-0">
                <template v-for="article in category.articles">
                  <v-col cols="12" md="4" class="ma-0 pa-2" :key="article.id">
                    <v-card class="mx-auto" max-width="400" tile>
                      <v-img
                        class="white--text align-end"
                        height="150"
                        :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                      >
                        <v-card-title>{{article.title}}</v-card-title>
                      </v-img>

                      <!-- <v-card-subtitle class="pb-0"><v-icon>mdi-folder</v-icon> {{category.name}}</v-card-subtitle> -->

                      <v-card-text class="text--primary py-1">
                        <div>
                          <small>
                            <v-btn
                              text
                              x-small
                              @click="onView('articles_by_user', article.user.username)"
                              class="text-none"
                            >
                              <v-icon small>mdi-account</v-icon>
                              {{article.user.folk.name}} {{article.user.folk.lastname}}
                            </v-btn>
                          </small>
                          <small>
                            <v-icon small>mdi-clock</v-icon>
                            {{article.created_at}}
                          </small>
                        </div>
                        <!-- <v-divider></v-divider> -->

                        <div>{{ article.summary|truncate(50)}}</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          text
                          small
                          class="text-none p0-1 my-1"
                          color="grey darken-3"
                          @click="onView('read_article', article.slug)"
                        >Ler</v-btn>
                        <v-btn small icon color="grey darken-1">
                          <v-icon small>mdi-share-variant</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <template v-if="authUser">
                          <v-btn
                            color="primary"
                            small
                            text
                            icon
                            @click="onUpdate('update_article', article.slug)"
                          >
                            <v-icon small>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn
                            small
                            text
                            icon
                            color="error"
                            @click="onDelete('articles',article.id,'APP_UPDATE_ALL_ARTICLES_DATA')"
                          >
                            <v-icon small>mdi-trash-can</v-icon>
                          </v-btn>
                        </template>
                      </v-card-actions>
                    </v-card>
                    <!-- <v-card tile class="elevation-1">
                      <v-list-item>
                        <v-list-item-avatar color="grey"></v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="headline">{{article.title}}</v-list-item-title>
                          <v-list-item-subtitle>Escrito por: {{article.user.folk.name}} {{article.user.folk.lastname}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-img
                        :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                        height="130"
                      ></v-img>

                      <v-card-text>{{ article.summary|truncate(100)}}</v-card-text>

                      <v-card-actions>
                        <v-btn text icon @click="onView('read_article', article.slug)">
                          <v-icon>mdi-information</v-icon>
                        </v-btn>
                        <v-btn text icon @click="onUpdate('update_article', article.slug)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          text
                          icon
                          @click="onDelete('articles',article.id,'APP_UPDATE_ALL_ARTICLES_DATA')"
                        >
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn icon>
                          <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>-->
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-0 pt-0">
              <v-btn
                class="text-none"
                color="primary"
                outlined
                rounded
                small
              >Ver mais 10 de {{category.articles.length}}</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="text-none"
                small
                text
                color="primary"
                @click="onView('article_categories', category.slug)"
              >Ver todas da categoria "{{category.name}}"</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-flex>
      <v-flex xs12 md3 class="px-3 mt-0 pt-0">
        <v-row class="pa-0 mx-0 mb-4">
          <v-col class="pa-0 ma-0">
            <v-card flat>
              <v-card-title primary-title class="py-2">
                <h5 class="font-weight-light">Categorias</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="ma-0 pa-0">
                <!-- <template v-for="category in categories">
                  <div :key="'categoriaaside'+category.id">{{category.name}}</div>
                  
                </template>-->
                <v-list dense flat>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(category, i) in categories"
                      :key="'category_filter_'+i"
                      @click="onView('article_categories', category.slug)"
                      :disabled="!category.articles.length"
                    >
                      <!-- <v-list-item v-for="(category, i) in categories" :key="'category_filter_'+i" @click="onView('article_categories', category.slug)" :disabled="category.articles.length<=3"> -->
                      <v-list-item-content>
                        <!-- <v-list-item-title>
                          <v-badge color="green" dot>Item Two</v-badge>
                        </v-list-item-title> -->
                        <v-list-item-title>{{category.name}} ({{category.articles.length}})</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="pa-0 mx-0 mb-4">
          <v-col class="pa-0 ma-0">
            <v-card flat>
              <v-card-title primary-title class="py-2">
                <h5 class="font-weight-light">Marcadores</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <template v-for="tag in tags">
                  <span :key="'marcadoraside_'+tag.id">
                    <v-chip
                      :disabled="!tag.articles.length"
                      v-if="tag.articles.length"
                      color="primary"
                      small
                      @click="onView('articles_by_tag', tag.slug)"
                    >{{tag.name}}</v-chip>
                  </span>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getDatas, getData, deleteData } from "@/mixins/SendForm";
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
    truncateFilter
  ],

  data: () => ({
    hover: false
  }),

  created: function() {
    this.getAll(this.articles, "getPublishedArticles");
    this.getAll(this.categories, "getArticleByCategories");
    this.getAll(this.tags, "getArticleByTag");
  },

  computed: {
    articles: function() {
      return this.$store.getters.published_articles;
    },
    categories: function() {
      return this.$store.getters.articles_by_categories;
    },
    tags: function() {
      return this.$store.getters.articles_by_tag;
    }
  }
};
</script>