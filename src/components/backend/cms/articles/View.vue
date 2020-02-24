<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <read-article :article="article"></read-article>
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
    this.getAll(this.articles, "getArticles");
  },

  computed: {
    articles: function() {
      return this.$store.getters.articles;
    },
    article: function() {
      return this.$store.getters.article(this.slug);
    }
  },
  components: {
    ReadArticle
  }
};
</script>