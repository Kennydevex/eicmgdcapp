<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" class="py-0 my-0">
        <v-alert
          color="primary"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-check"
          v-if="category!=undefined"
        >
          Lista de artigos da categoria,
          <strong
            v-if="category!=undefined"
            class="text-capitalize"
          >{{category.name}}</strong>
        </v-alert>
      </v-col>
      <v-col cols="12" md="8" class="py-0 my-0">
        <v-row>
          <template v-for="article in articles_by_category">
            <v-col cols="12" md="4" class="mx-1" :key="article.id">
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

              <!-- <v-card tile class="elevation-1">
            <v-list-item>
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{article.title}}</v-list-item-title>
                <v-list-item-subtitle>Escrito por: {{article.user.folk.name}} {{article.user.folk.lastname}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="`${apiUrl}/images/articles/covers/${article.cover}`" height="130"></v-img>

            <v-card-text>{{ article.summary|truncate(50)}}</v-card-text>

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
      </v-col>
      <v-col cols="12" md="4" class="my-0 py-0">
        <article-aside />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import { truncateFilter } from "@/mixins/Filters";
import { viewAndUpdate } from "@/mixins/Redirects";
import { dateFormat } from "@/mixins/DateTime";
import ArticleAside from "../common/ArticleAside";

export default {
  mixins: [getDatas, truncateFilter, viewAndUpdate, dateFormat],
  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    // this.getAll(this.categories, "getCategories");
    this.getAll(this.categories, "getArticlesByCategories");
    this.getAll(this.articles, "getPublishedArticles");
  },

  computed: {
    articles: function() {
      return this.$store.getters.published_articles;
    },
    articles_by_category: function() {
      return this.$store.getters.articles_by_category(this.slug);
    },

    categories: function() {
      return this.$store.getters.articles_by_categories;
    },
    // categories: function() {
    //   return this.$store.getters.categories;
    // },

    category: function() {
      return this.$store.getters.article_category(this.slug);
    }
  },

  components: {
    ArticleAside
  }
};
</script>