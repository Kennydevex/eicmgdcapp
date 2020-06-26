<template>
  <div>
    <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5 class="font-weight-regular subtitle-2 text-uppercase primary--text">CATEGORIAS</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="ma-0 pa-0">
            <v-list dense flat color="grey lighten-3">
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(category, i) in categories"
                  :key="'category_filter_'+i"
                  @click="onView('article_categories', category.slug)"
                  :disabled="!category.articles.length"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="primary--text"
                      :style="{color: category.color}"
                    >{{category.name}} ({{category.articles.length}})</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5 class="font-weight-regular subtitle-2 text-uppercase primary--text">MARCADORES</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="grey lighten-3">
            <template v-for="tag in tags">
              <span :key="'marcadoraside_'+tag.id">
                <v-chip
                  class="ma-2 text-capitalize"
                  :disabled="!tag.articles.length"
                  v-if="tag.articles.length"
                  color="primary"
                  small
                  dark
                  @click="onView('articles_by_tag', tag.slug)"
                >{{tag.name}}</v-chip>
              </span>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5
              class="font-weight-regular subtitle-2 text-uppercase primary--text"
            >ARTIGOS EM DESTAQUES</h5>
          </v-card-title>
          <!-- <v-divider></v-divider> -->
          <v-card-text class="ma-0 pa-0">
            <v-expansion-panels flat hover>
              <v-expansion-panel
                class="px-0"
                v-for="(article,a) in featured_articles"
                :key="'side_article_'+a"
              >
                <v-expansion-panel-header
                  class="subtitle-1 primary--text font-weight-bold"
                >{{article.title}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>{{article.summary|truncate(100)}}</div>
                  <div>
                    <v-btn
                      small
                      tile
                      @click="onView('read_article', article.slug)"
                      color="primary"
                      class="text-none mt-2"
                    >Ler artigo</v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5 class="font-weight-regular text-uppercase primary--text subtitle-2">ARTIGOS RECENTES</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>Nenhum Artigo Disponivel</v-card-text>
        </v-card>
      </v-col>
    </v-row>-->
  </div>
</template>

<script>
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";
import { getDatas } from "@/mixins/SendForm";

export default {
  name: "ArticleAside",
  mixins: [viewAndUpdate, truncateFilter, getDatas],
  // props: ["categories", "tags", "featured_articles"],

  created() {
    this.getAll(this.categories, "getArticlesByCategories");
    this.getAll(this.tags, "getArticlesByTags");
  },

  computed: {
    featured_articles: function() {
      return this.$store.getters.featured_articles;
    },

    categories: function() {
      return this.$store.getters.articles_by_categories;
    },

    tags: function() {
      return this.$store.getters.articles_by_tags;
    }
  }
};
</script>