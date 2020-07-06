<template>
  <v-container grid-list-xs pt-0>
    <v-alert
      v-model="school_alert"
      v-if="featured_articles.length==0 || categories.length==0"
      border="top"
      colored-border
      type="warning"
      elevation="2"
      dismissible
      prominent
      icon="mdi-alert"
      tile
    >
      <v-row align="center">
        <v-col
          class="grow"
        >Aguarde a publicação no Blog da Escola Idustrial e Comercial do Mindelo, em breve iremos fazer parte do seu dia.</v-col>
      </v-row>
    </v-alert>

    <v-row row wrap>
      <template v-if="!featured_articles.length">
        <v-col cols="12" class="pt-0 mb-5">
          <v-skeleton-loader boilerplate type="image"></v-skeleton-loader>
        </v-col>
      </template>
      <v-col v-else cols="12" class="pt-0">
        <AppFeaturedArticleSlider :articles="featured_articles" />
      </v-col>

      <template v-if="!categories.length">
        <v-col cols="12" md="8">
          <v-skeleton-loader boilerplate type="card"></v-skeleton-loader>
        </v-col>
      </template>

      <v-col v-else cols="12" md="8">
        <template v-for="category in categories">
          <v-card color="transparent" class="mb-8" :key="'categoria'+category.id" flat tile>
            <v-card-title
              class="black--text pa-0 mx-0 text-capitalize font-weight-light"
              primary-title
            >
              <div>
                <a
                  class="black--text text-uppercase"
                  @click="onView('article_categories', category.slug)"
                >{{category.name}}</a>

                <div class="category_title_divider indigo"></div>
              </div>
            </v-card-title>
            <v-card-text class="ma-0 pa-1">
              <v-row class="my-1 pa-0">
                <template v-for="(article, a) in category.articles">
                  <v-col
                    cols="12"
                    sm="6"
                    :md="category.articles.length == 1?'12':category.articles.length == 2?'6':'6'"
                    class="ma-0 pa-2"
                    :key="'artigo_'+a"
                  >
                    <v-card
                      tile
                      @click="onView('read_article', article.slug)"
                      class="mx-auto elevation-1"
                    >
                      <v-img
                        class="white--text align-end"
                        height="120"
                        :src="`${apiUrl}/images/articles/covers/${article.cover}`"
                      >
                        <v-card-title class="title font-weight-regular">{{article.title}}</v-card-title>
                      </v-img>

                      <v-card-text class="text--primary py-2">
                        <div class="my-2">
                          <span
                            class="grey--text text--darken-2 text-capitalize"
                          >{{dateForHumanPresentation(article.created_at)}}</span>
                        </div>
                        <p class="font-weight-regular body-2">{{ article.summary|truncate(100)}}</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="category.articles.length >=3"
                class="text-none"
                color="primary"
                outlined
                small
              >Listar mais</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
        </template>
      </v-col>

      <template v-if="!categories.length">
        <v-col cols="12" md="4">
          <v-skeleton-loader boilerplate type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader boilerplate type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader boilerplate type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader boilerplate type="paragraph"></v-skeleton-loader>
        </v-col>
      </template>

      <v-col v-else cols="12" md="4" class="mt-8 pt-0">
        <article-aside />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatas, getData, deleteData } from "@/mixins/SendForm";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";
import AppFeaturedArticleSlider from "@/components/frontend/partials/AppFeaturedArticleSlider";
import ArticleAside from "./common/ArticleAside";
import { dateFormat } from "@/mixins/DateTime";

export default {
  mixins: [
    dateFormat,
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
    // num_article_to_show: 3
  }),

  created: function() {
    this.getAll(this.articles, "getPublishedArticles");
    // this.getAll(this.categories, "getCategories");
    this.getAll(this.categories, "getArticlesByCategories");
    this.getAll(this.tags, "getArticlesByTags");
  },

  computed: {
    featured_articles: function() {
      return this.$store.getters.featured_articles;
    },

    articles: function() {
      return this.$store.getters.published_articles;
    },

    // categories: function() {
    //   return this.$store.getters.categories;
    // },

    categories: function() {
      return this.$store.getters.articles_by_categories;
    },

    tags: function() {
      return this.$store.getters.articles_by_tags;
    }
  },

  methods: {
    // list_more(category_name, articles) {
    //   let mthis = this;
    //   articles.forEach(function(article) {
    //     if (article.category.name == category_name) {
    //       return (mthis.num_article_to_show += 3);
    //     }
    //     return 3;
    //   });
    // }
  },

  components: {
    AppFeaturedArticleSlider,
    ArticleAside
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.category_title_divider {
  width: 70px;
  height: 2px;
  // background-color: rgb(80, 89, 212);
  text-align: left;
  margin-top: 10px;
}
</style>