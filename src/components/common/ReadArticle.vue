<template>
  <div>
    <div>
      <v-card flat tile>
        <v-img
          :src="`${apiUrl}/images/articles/covers/${article.cover}`"
          class="white--text align-end"
          height="300"
        >
          <v-card-title v-text="article.title" class="display-1 text-decoration-underline"></v-card-title>
        </v-img>
        <v-card-title primary-title>
          <v-row>
            <v-col cols="12" class="grey--text" align="start">
              <div>
                <v-chip @click="onView('article_categories', article.category.slug)" label :color="article.category.color">{{article.category.name}}</v-chip>
              </div>

              <div class="font-weight-regular">
                <small>
                  <v-btn
                    class="text-none pa-1"
                    text
                    small
                    color="primary"
                    @click="onView('articles_by_user', article.user.username)"
                  >
                    <v-icon small>mdi-account-tie</v-icon>
                    <span>{{article.user.folk.name}} {{article.user.folk.lastname}}</span>
                  </v-btn>
                  <small>em {{displayDate(article.created_at)}}</small>
                </small>
              </div>

              <div v-if="article.created_at!==article.updated_at" class="font-weight-regular ml-1">
                <v-icon small>mdi-update</v-icon>
                <small>
                  <small>Atualizado em: {{displayDate(article.updated_at)}}</small>
                </small>
              </div>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="text-none">
          <div class="mb-6">
            <h2 class="font-weight-medium text-justify">{{article.summary}}</h2>
          </div>
          <div>
            <p v-html="article.content"></p>
          </div>
        </v-card-text>
        <!-- <v-divider></v-divider> -->

        <v-card-actions>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-subheader>Marcadores:</v-subheader>
            </v-col>
            <v-col cols="12" class="py-0 ml-3">
              <template v-for="tag in article.tags">
                <v-chip class="ma-2 text-capitalize" :key="'marcador_'+tag.id" color="primary">
                  <v-avatar left>
                    <v-icon>mdi-tag</v-icon>
                  </v-avatar>
                  {{tag.name}}
                </v-chip>
              </template>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider></v-divider>

        <v-card-actions>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-subheader>Partilha:</v-subheader>
            </v-col>
            <v-col cols="12" class="py-0 ml-4">
              <ShareNetwork
                v-for="network in networks"
                :network="network.network"
                :key="network.network"
                :url="sharing.url"
                :title="sharing.title"
                :description="sharing.description"
                :quote="sharing.quote"
                :hashtags="sharing.hashtags"
                :twitterUser="sharing.twitterUser"
              >
                <v-btn outlined small :color="network.color" tile dark class="ma-1 text-none">
                  <v-icon left>{{network.icon}}</v-icon>
                  {{network.name}}
                </v-btn>
              </ShareNetwork>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
    <!-- <div>
      <v-card flat>
        <v-card-title primary-title>Sistema de cometarios</v-card-title>
        <v-card-text>
          <comment></comment>
        </v-card-text>
      </v-card>
    </div>-->
  </div>

  <!-- <div>{{article}}</div> -->
</template>

<script>
import { cancelActions } from "@/mixins/Redirects";
import { deleteData } from "@/mixins/SendForm";
import { dateFormat } from "@/mixins/DateTime";
import { viewAndUpdate } from "@/mixins/Redirects";

// import Comment from "@/components/backend/cms/comment/Create";

export default {
  mixins: [deleteData, cancelActions, dateFormat, viewAndUpdate],
  props: ["article", "flat"],

  data() {
    return {
      sharing: {
        url:
          "https://anacao.cv/covid-19-aglomeracoes-para-inaugurar-obras-preocupa-municipes/",
        title:
          "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "vuejs,vite,javascript",
        twitterUser: "youyuxi"
      },

      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
          color: "#1877f2"
        },

        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "mdi-linkedin",
          color: "#007bb5"
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "mdi-twitter",
          color: "#1da1f2"
        },
        {
          network: "email",
          name: "Email",
          icon: "mdi-email",
          color: "#333333"
        },
        {
          network: "evernote",
          name: "Evernote",
          icon: "mdi-evernote",
          color: "#2dbe60"
        },

        {
          network: "pinterest",
          name: "Pinterest",
          icon: "mdi-pinterest",
          color: "#bd081c"
        },

        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "mdi-whatsapp",
          color: "#25d366"
        }
      ]
    };
  },
  components: {
    // Comment
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 1.2em;
  line-height: 1.5em;
}
</style>