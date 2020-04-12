<template>
  <v-container grid-list-xs pt-0>
    <v-row>
      <v-col class="mt-0 pt-0">
        <read-article :article="article" :flat="true"></read-article>
      </v-col>
      
    </v-row>
    
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