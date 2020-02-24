<template>
  <div>
    <v-row>
      <v-col>
        <v-card tile>
          <v-card-title primary-title>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  prepend-icon="mdi-magnify"
                  name="name"
                  label="Procurar artigos"
                  id="search"
                ></v-text-field>
              </v-col>
              <span>Modo de Visialização</span>
              <span> Opção de Visialização</span>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="2">
                <v-card flat>
                  <v-card-title primary-title>Filtro</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, dolorem. Quae inventore cupiditate quod ea sit neque facilis commodi qui natus, sed architecto veritatis a voluptatem quos enim facere dicta!</v-card-text>
                </v-card>
              </v-col>
              <!-- <v-divider vertical></v-divider> -->
              <v-col cols="12" md="10">
                <v-row>
                  <template v-for="(article, k) in articles">
                    <v-col cols="12" md="3" :key="k">
                      <v-card>
                        <v-list-item>
                          <v-list-item-avatar color="grey"></v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="headline">{{article.title}}</v-list-item-title>
                            <v-list-item-subtitle>Escrito por: {{article.user.folk.name}} {{article.user.folk.lastname}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-img
                          :src="`${apiUrl}/images/articles/covers/${article.media.name}`"
                          height="194"
                        ></v-img>

                        <v-card-text>{{ article.summary|truncate(100)}}</v-card-text>

                        <v-card-actions>
                          <v-btn text icon @click="onView('view_article', article.slug)">
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
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>Botons de next e mais</v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card id="articles-action">
          <v-speed-dial
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn :to="{ name: 'add_article'}" v-if="canAdd()" fab dark small color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getDatas, getData, deleteData } from "@/mixins/SendForm";
import { flashAlert, actionAlert } from "@/mixins/AppAlerts";
import { viewAndUpdate } from "@/mixins/Redirects";
import { truncateFilter } from "@/mixins/Filters";

export default {
  mixins: [
    flashAlert,
    actionAlert,
    getData,
    getDatas,
    deleteData,
    viewAndUpdate,
    truncateFilter
  ],
  data() {
    return {
      fab: false
    };
  },
  computed: {
    articles: function() {
      return this.$store.getters.articles;
    }
  },

  created: function() {
    this.getAll(this.articles, "getArticles");
    window.getApp.$on("APP_UPDATE_ALL_ARTICLES_DATA", () => {
      this.refresh("getArticles");
    });
  }
};
</script>

<style lang="scss" scoped>
#articles-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#articles-action .v-btn--floating {
  position: relative;
}
</style>