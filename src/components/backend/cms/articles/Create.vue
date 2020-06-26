<template>
  <v-card>
    <v-card-title primary-title>
      <small class="font-weight-light text-capitalize">
        <v-icon>mdi-file-document-box-plus</v-icon>
        <small>&emsp;Criar Publicação</small>
      </small>
    </v-card-title>
    <v-card-text>
      <article-form :formData="formData" :update_form="false"></article-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onAddArticle(true)">Guardar</v-btn>
      <v-btn color="primary" small text @click="onAddArticle(false)">Guardar e Sair</v-btn>
      <v-btn small text @click="redirectTo('list_articles')">Sair</v-btn>
    </v-card-actions>
  </v-card>
</template> 



<script>
import ArticleForm from "@/forms/ArticleForm";
import { cancelActions } from "@/mixins/Redirects";

export default {
  mixins: [cancelActions],
  data() {
    return {
      formData: {
        title: "",
        summary: "",
        content: "",
        status: "",
        featuring: "",
        start: "",
        end: "",
        cover: null,
        user: "",
        category_id: "",
        tags: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_CANCEL_ADD_ARTICLE", () => {
      this.redirectTo("list_articles");
    });
  },

  components: {
    ArticleForm
  },

  methods: {
    onAddArticle(add_new) {
      window.getApp.$emit("APP_VALIDATE_DATE");
      window.getApp.$emit("APP_ADD_ARTICLE", add_new);
    }
  }
};
</script>