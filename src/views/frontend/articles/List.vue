<template>
  <v-container grid-list-xs pt-0>
    <v-layout row wrap>
      <v-flex xs12 class="mb-5">
        <AppFeaturedArticleSlider />
      </v-flex>
      <v-flex xs12 md9>
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
                    :md="category.articles.length == 1?'12':category.articles.length == 2?'6':'4'"
                    class="ma-0 pa-2"
                    :key="'artigo_'+a"
                  >
                    <v-card @click="onView('read_article', article.slug)" class="mx-auto elevation-1" >
                      <v-img
                        class="white--text align-end"
                        height="150"
                        :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                      >
                        <v-card-title>{{article.title}}</v-card-title>
                      </v-img>

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
      </v-flex>

      <v-flex xs12 md3 class="px-3 mt-0 pt-0">
        <article-aside :categories="categories" :tags="tags"></article-aside>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getDatas, getData, deleteData } from "@/mixins/SendForm";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";
import AppFeaturedArticleSlider from "@/components/frontend/partials/AppFeaturedArticleSlider";
import ArticleAside from "./common/ArticleAside";

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
    // num_article_to_show: 3
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