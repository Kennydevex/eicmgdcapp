<template>
  <div>
    <div>
      <v-card :flat="flat">
        <v-img :src="`${apiUrl}/images/articles/covers/${article.media.name}`" aspect-ratio="2.75">
          <v-container grid-list-xs>
            <v-row>
              <v-col align="end">
                <v-btn fab text class="mx-2" small color="grey lighten-3">
                  <v-icon small>P</v-icon>
                </v-btn>
                <v-btn fab text class="mx-2" small color="grey lighten-3">
                  <v-icon small>E</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="pl-5" justify="center" align="start">
                <h1 class="white--text font-weight-light">{{article.title}}</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
        <v-card-title primary-title class="mx-0">
          <v-row>
            <v-col cols="12" class="mx-0 px-0 grey--text" align="start">
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
              <small>
                &emsp;
                <v-icon>mdi-update</v-icon>
                {{article.updated_at}}
              </small>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="text-none mx-0 px-0">
          <div class="mb-6">
            <h2>{{article.summary}}</h2>
          </div>
          <div>
            <p v-text="article.content"></p>
          </div>
        </v-card-text>
        <v-card-actions class="mx-0 px-0">
          <v-row>
            <v-col cols="12" class="ma-0 pa-0">
              <v-subheader>Marcadores:</v-subheader>
            </v-col>
            <v-col>
              <template v-for="tag in article.tags">
                <v-chip class="ma-1" :key="'marcador_'+tag.id" label>{{tag.name}}</v-chip>
              </template>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
    <div>
      <v-card flat>
        <v-card-title primary-title class="mx-0 px-0">Sistema de cometarios</v-card-title>
        <v-card-text class="mx-0 px-0">
          <comment></comment>
        </v-card-text>
      </v-card>
    </div>
  </div> 

  <!-- <div>{{article}}</div> -->
</template>

<script>
import { cancelActions } from "@/mixins/Redirects";
import { deleteData } from "@/mixins/SendForm";
import Comment from "@/components/backend/cms/comment/Create";

export default {
  mixins: [deleteData, cancelActions],
  props: ["article", "flat"],
  components: {
    Comment
  }
};
</script>