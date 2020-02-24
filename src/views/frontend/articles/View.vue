<template>
  <v-container grid-list-xs fluid class="mt-0">
    <v-layout row wrap class="mt-0">
      <v-flex xs12 md2>
        aside direita
      </v-flex>
      <v-flex xs12 md8>
        <read-article :article="article" :flat="true"></read-article>
      </v-flex>
      <v-flex xs12 md2>
        aside esquerda
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ReadArticle from "@/components/common/ReadArticle";
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [getDatas],
  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    this.getAll(this.articles, "getPublishedArticles");
  },

  computed: {
    articles: function() {
      return this.$store.getters.published_articles;
    },
    article: function() {
      return this.$store.getters.published_article(this.slug);
    }
  },
  components: {
    ReadArticle
  }
};
</script>