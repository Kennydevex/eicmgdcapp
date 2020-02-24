<template>
  <div>
    aqui vamos por todas os artigos desta categoria {{slug}}
    <div>=======================Categoria================================</div>
    <div>{{category}}</div>
    <div>=======================Categorias===============================</div>
    <div>{{categories}}</div>
  </div>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [getDatas],
  data() {
    return {
      slug: this.$route.params.slug
    };
  },

  created: function() {
    this.getAll(this.categories, "getArticleByCategories");
  },

  computed: {
    categories: function() {
      return this.$store.getters.articles_by_categories;
    },
    category: function() {
      return this.$store.getters.category(this.slug);
    }
  }
};
</script>