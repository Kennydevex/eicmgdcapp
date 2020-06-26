<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12" class="py-0 my-0">
        <v-alert color="primary" border="left" elevation="2" colored-border icon="mdi-check">
          Lista de artigos do marcador,
          <strong
            class="text-capitalize"
            v-if="tag!=undefined"
          >{{tag.name}}</strong>
        </v-alert>
      </v-col>

      <v-col cols="12" md="8">
        <v-row>
          <template v-for="article in articles_by_tag">
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
    this.getAll(this.tags, "getArticlesByTags");
    this.getAll(this.articles, "getPublishedArticles");
  },

  computed: {
    articles: function() {
      return this.$store.getters.published_articles;
    },

    articles_by_tag: function() {
      return this.$store.getters.articles_by_tag(this.slug);
    },

    tags: function() {
      return this.$store.getters.articles_by_tags;
    },

    tag: function() {
      return this.$store.getters.article_tag(this.slug);
    }
  },

  components: {
    ArticleAside
  }
};
</script>