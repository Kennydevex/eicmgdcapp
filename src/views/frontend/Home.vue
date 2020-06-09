<template>
  <div>
    <section>
      <app-slider :sliders="actived_sliders"></app-slider>
    </section>

    <section v-if="murals.length">
      <app-murals :murals="murals"></app-murals>
    </section>

    <!-- <section>
      <app-parralax></app-parralax>
    </section>-->

    <section class="grey lighten-5">
      <app-team :teams="teams"></app-team>
    </section>

    <section v-if="formations.length">
      <app-featured-formations :formations="formations"></app-featured-formations>
    </section>

    <section v-if="published_articles.length" class="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" align="left" justify="center">
            <h4 class="text-uppercase font-weight-light">EICM Blog</h4>
            <div class="title-divider"></div>
          </v-col>
        </v-row>
      </v-container>
      <app-blog :published_articles="published_articles"></app-blog>
    </section>

    <section>
      <app-contacts></app-contacts>
    </section>
  </div>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";
import AppSlider from "@/components/frontend/partials/AppSlider";
import AppBlog from "@/components/frontend/partials/AppBlog";
import AppMurals from "@/components/frontend/partials/AppMurals";
import AppTeam from "@/components/frontend/partials/AppTeam";
import AppFeaturedFormations from "@/components/frontend/partials/AppFeaturedFormations";
import AppContacts from "@/components/frontend/partials/AppContacts";

export default {
  mixins: [getDatas],

  data() {
    return {
      teams: [
        {
          id: 1,
          name: "Estefanio Silva",
          charge: "Diretor"
        },
        {
          id: 2,
          name: "Paulo Pereira",
          charge: "Secretario"
        },
        {
          id: 3,
          name: "Sandra Monteiro",
          charge: "Sub-diretora"
        },
        {
          id: 4,
          name: "Ana Suares",
          charge: "Sub-Diretora Academica"
        }
      ],
      formations: [
        {
          id: 1,
          name: "Electricidade",
          efect: "slide-right"
        },
        {
          id: 2,
          name: "Meccanica",
          efect: "slide-up"
        },
        {
          id: 3,
          name: "Contabilidade",
          efect: "slide-left"
        }
      ]
    };
  },

  components: {
    AppSlider,
    AppBlog,
    AppMurals,
    AppTeam,
    AppFeaturedFormations,
    AppContacts
  },

  created: function() {
    this.getAll(this.published_articles, "getPublishedArticles");
    this.getAll(this.murals, "getMurals");
    this.getAll(this.actived_sliders, "getActivedSliders");
  },

  computed: {
    published_articles: function() {
      return this.$store.getters.published_articles;
    },

    actived_sliders: function() {
      return this.$store.getters.actived_sliders;
    },

    murals: function() {
      return this.$store.getters.murals;
    },

    // Ainda não teremos o resultado esperado porque o métudo filter em Sore retorna apenas um resultado filtrado, enquanto que queremos ter todos os artigos destacados. uma sugestão para isso é usar o métudo "Map" ou pegar esses valores através de loop
    featured_articles: function() {
      return this.$store.getters.featured_articles;
    }
  }
};
</script>