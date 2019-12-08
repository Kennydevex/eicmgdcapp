<template>
  <v-card>
    <v-card-title primary-title>
      <small class="font-weight-light text-capitalize">
        <v-icon>mdi-file-document-box-plus</v-icon>
        <small>&emsp;Criar Publicação</small>
      </small>
    </v-card-title>
    <v-card-text>
      <article-form :formData="formData"></article-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onAddArticle(true)">Guardar</v-btn>
      <v-btn color="primary" small text @click="onAddArticle(false)">Guardar e Sair</v-btn>
      <v-btn small text @click="cancelAddArticle">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>



<script>
import ArticleForm from "@/forms/ArticleForm";

export default {
  data() {
    return {
      formData: {
        title: "",
        summary: "",
        content: "",
        status: "",
        featuring: "",
        start: new Date().toISOString().substr(0, 10),
        end: new Date().toISOString().substr(0, 10),
        user: "",
        category: "",
        tags: [],
        image: null,
      }
    };
  },

  created() {
    window.getApp.$on("APP_CANCEL_ADD_ARTICLE", () => {
      this.cancelAddArticle();
    });
  },

  components: {
    ArticleForm
  },

  methods: {
    cancelAddArticle() {
      this.$router.go(-1);
      // this.$router.push({ name: "list-partners" });
    },

    onAddArticle(add_new) {
      window.getApp.$emit("APP_ADD_ARTICLE", add_new);
    }
  }
};
</script>