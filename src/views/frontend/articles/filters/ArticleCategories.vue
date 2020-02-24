<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-col cols="12" class="pa-0 ma-0">
        <div class="pa-2 ma-0 grey lighten-4"><span>Todos os Artigos da Categoria: <i class="primary--text">{{category.name}}</i></span></div>
      </v-col>
      <template v-for="article in category.articles">
        <v-col cols="12" md="3" class="ma-0 pa-2" :key="article.id">
          <v-card tile class="elevation-1">
            <v-list-item>
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{article.title}}</v-list-item-title>
                <v-list-item-subtitle>Escrito por: {{article.user.folk.name}} {{article.user.folk.lastname}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="`${apiUrl}/images/articles/covers/${article.media.name}`" height="130"></v-img>

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
          </v-card>
        </v-col>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [getDatas, truncateFilter],
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