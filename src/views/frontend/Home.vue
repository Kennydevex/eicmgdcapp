<template>
  <div>
    <section>
      <app-slider></app-slider>
    </section>

    <section v-if="missions.length">
      <app-missions :missions="missions"></app-missions>
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
import AppMissions from "@/components/frontend/partials/AppMissions";
// import AppParralax from "@/components/frontend/partials/AppParralax";
import AppTeam from "@/components/frontend/partials/AppTeam";
import AppFeaturedFormations from "@/components/frontend/partials/AppFeaturedFormations";
// import AppFeaturedArticles from "@/components/frontend/partials/AppFeaturedArticles";
import AppContacts from "@/components/frontend/partials/AppContacts";

export default {
  mixins: [getDatas],

  data() {
    return {
      missions: [
        {
          id: 1,
          title: "Sonho é Possível",
          description:
            "Sonhei e fui à luta com fé e determinação, não sei se já consegui, mas, sei que quero ir tentando...",
          icon: "mdi-diamond-stone"
        },
        {
          id: 2,
          title: "A Luta Continua",
          description:
            "Alguem investiu em mim com a certiza que eu conseguiria. Mesmo não tendo armas certas, venci as batalhas...",
          icon: "mdi-run"
        },
        {
          id: 3,
          title: "Sonho é Possível",
          description:
            "Já sei exatamente o que sei, não preciso provar nada. Tenho Amor e Paixão como as minhas ferrementas...",
            icon: "mdi-heart"
        }
      ],
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
    AppMissions,
    AppTeam,
    AppFeaturedFormations,
    AppContacts
  },

  created: function() {
    this.getAll(this.published_articles, "getPublishedArticles");
  },

  computed: {
    published_articles: function() {
      return this.$store.getters.published_articles;
    },

    teste: function() {
      return false;
    },

    // Ainda não teremos o resultado esperado porque o métudo filter em Sore retorna apenas um resultado filtrado, enquanto que queremos ter todos os artigos destacados. uma sugestão para isso é usar o métudo "Map" ou pegar esses valores através de loop
    featured_articles: function() {
      return this.$store.getters.featured_articles;
    }
  }
};
</script>