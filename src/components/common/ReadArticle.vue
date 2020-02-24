<template>
  <div>
    <v-card class="mx-2" :flat="flat">
      <v-img :src="`${apiUrl}/images/articles/covers/${article.media.name}`" aspect-ratio="2.75">
        <v-container grid-list-xs>
          <v-row>
            <v-col align="start">
              <v-btn small color="success">text</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
      <v-card-title primary-title>
        <v-row class="ma-0 pa-0">
          <v-col cols="12" class="ma-0 pa-0" align="start">
            <h2 class="subheading">{{article.title}}</h2>
          </v-col>
          <v-col cols="12" class="ma-0 pa-0 grey--text" align="start">
            <small>
              <v-icon>mdi-account-badge-horizontal</v-icon>
              {{article.user.folk.name}}
            </small>&emsp;
            <small>
              <v-icon>mdi-folder-open</v-icon>
              {{article.category.name}}
            </small>&emsp;
            <small>
              <v-icon>mdi-clock</v-icon>
              {{article.created_at}}
            </small>
            <small>&emsp;
              <v-icon>mdi-update</v-icon>
              {{article.updated_at}}
            </small>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="text-none">
        <h2>{{article.summary}}</h2>
        <br />
        <p v-text="article.content"></p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-subheader>Marcadores:</v-subheader>
        <template v-for="tag in article.tags">
          <v-chip class="ma-1" :key="'marcador_'+tag.id" close small>{{tag.name}}</v-chip>
        </template>
        <v-spacer></v-spacer>
        <v-btn small rounded>partilhar</v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <!-- <div>{{article}}</div> -->
</template>

<script>
import { cancelActions } from "@/mixins/Redirects";
import { deleteData } from "@/mixins/SendForm";

export default {
  mixins: [deleteData, cancelActions],
  props: ["article", "flat"]
};
</script>