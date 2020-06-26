<template>
  <v-card v-if="article">
    <v-card-title primary-title>
      <small class="font-weight-light text-capitalize">
        <v-icon>mdi-pencil</v-icon>
        <small>&emsp;Editar Publicação</small>
      </small>
    </v-card-title>
    <v-card-text>
      <article-form :formData="article" :update_form="true"></article-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onUpdateArticle()">Guadar Alteração</v-btn>
      <v-btn small text @click="redirectTo('list_articles')">Saír</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ArticleForm from "@/forms/ArticleForm";
import { getDatas, deleteData } from "@/mixins/SendForm";
import { cancelActions } from "@/mixins/Redirects";


export default {
  mixins: [getDatas, deleteData,cancelActions],

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
    ArticleForm
  },

  methods: {
    // cancelUpdateArticle() {
    //   this.$router.go(-1);
    // },

    onUpdateArticle() {
      window.getApp.$emit("APP_UPDATE_ARTICLE");
    }
  }
};
</script>