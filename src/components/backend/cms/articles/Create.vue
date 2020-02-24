<template>
  <v-card>
    <v-card-title primary-title>
      <small class="font-weight-light text-capitalize">
        <v-icon>mdi-file-document-box-plus</v-icon>
        <small>&emsp;Criar Publicação</small>
      </small>
    </v-card-title>
    <v-card-text>
      <article-form :formData="formData" :updating="false"></article-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" small text @click="onAddArticle(true)">Guardar</v-btn>
      <v-btn color="primary" small text @click="onAddArticle(false)">Guardar e Sair</v-btn>
      <v-btn small text @click="cancelAddArticle">Sair</v-btn>
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
        start: '',
        end: '',
        user: "",
        category_id: "",
        tags: [],
        image: null,
        media: {
          image: "",
          type: 1,
        }
        // img: "teste3",
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
      window.getApp.$emit("APP_VALIDATE_DATE");
      window.getApp.$emit("APP_ADD_ARTICLE", add_new);
    }
  }
};
</script>