<template>
  <div>
    <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5 class="font-weight-light text-uppercase">CATEGORIAS</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="ma-0 pa-0">
            <v-list dense flat>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(category, i) in categories"
                  :key="'category_filter_'+i"
                  @click="onView('article_categories', category.slug)"
                  :disabled="!category.articles.length"
                >
                  <v-list-item-content>
                    <v-list-item-title class="primary--text text-uppercase">{{category.name}} ({{category.articles.length}})</v-list-item-title>
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
            <h5 class="font-weight-light text-uppercase">MARCADORES</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <template v-for="tag in tags">
              <span :key="'marcadoraside_'+tag.id">
                <v-chip
                  class="ma-1"
                  :disabled="!tag.articles.length"
                  v-if="tag.articles.length"
                  color="blue lighten-5"
                  light
                  label
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
            <h5 class="font-weight-light text-uppercase">ARTIGOS EM DESTAQUES</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
           Nenhum Artigo Disponivel
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-0 mx-0 mb-4">
      <v-col class="pa-0 ma-0">
        <v-card flat>
          <v-card-title primary-title class="py-2">
            <h5 class="font-weight-light text-uppercase">ARTIGOS RECENTES</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
           Nenhum Artigo Disponivel
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { viewAndUpdate } from "@/mixins/Redirects";

export default {
  name: "ArticleAside",
  mixins: [viewAndUpdate],
  props: ["categories", "tags"]
};
</script>