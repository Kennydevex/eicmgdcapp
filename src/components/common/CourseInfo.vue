<template>
  <div>
    <v-card flat tile>
      <v-img
        :contain="course.cover=='default.svg'"
        :src="`${apiUrl}/images/app/courses/covers/${course.cover}`"
        aspect-ratio="2.75"
        class="white--text align-end"
      >
        <v-col align="right">
          <v-chip class="ma-2" dark>
            <v-icon small>mdi-star</v-icon>
            {{displayDate(course.release)}}
          </v-chip>

          <v-chip
            class="ma-2"
            dark
            :color="course.color"
          >Duração: {{course.duration}} {{courseDuration(course.duration, course.duration_type) }}</v-chip>
        </v-col>
      </v-img>
      <v-card-title
        primary-title
        :style="{color: course.color}"
        class="display-1 font-weight-regular text-decoration-underline"
      >{{course.name}}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p class="body-1 text-justify">{{course.description}}</p>
          </v-col>

          <v-col cols="12">
            <h3 :style="{color: course.color}" class="title">Perfil de acesso ao curso</h3>
          </v-col>

          <v-col cols="12">
            <p>{{course.requirement}}</p>
          </v-col>

          <v-col cols="12">
            <h3 :style="{color: course.color}" class="title">Saídas do Profissional/Académicas</h3>
          </v-col>

          <v-col cols="12">
            <v-expansion-panels tile class="mb-6" focusable>
              <v-expansion-panel v-for="(outcome,i) in course.outcomes" :key="'show_outcome_'+i">
                <v-expansion-panel-header>{{outcome.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>{{outcome.description}}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>

          <v-col cols="12">
            <h3 class="title" :style="{color: course.color}">Disciplinas/Módulos deste curso</h3>
          </v-col>

          <v-col cols="12">
            <v-expansion-panels tile class="mb-6" inset focusable>
              <v-expansion-panel
                v-for="(discipline,i) in course.disciplines"
                :key="'show_course_'+i"
              >
                <v-expansion-panel-header>{{discipline.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="my-2">{{discipline.description}}</div>
                  <v-divider></v-divider>
                  <div class="my-2">
                    Natureza da disciplina:
                    <v-chip small>{{discipline.type}}</v-chip>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <div>
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
        </div>
        <v-spacer></v-spacer>
        <small
          class="text-decoration-underline font-italic"
        >Cordenador do curso: {{course.teachers[0].employee.folk.name}} {{course.teachers[0].employee.folk.lastname}}</small>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { cancelActions } from "@/mixins/Redirects";
import { deleteData } from "@/mixins/SendForm";
import { dateFormat } from "@/mixins/DateTime";

export default {
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
        }
      ]
    };
  },
  mixins: [deleteData, cancelActions, dateFormat],
  props: ["course", "flat"],

  methods: {
    courseDuration(duration, duration_type) {
      if (duration > 1) {
        return duration_type == 1
          ? "Anos"
          : duration_type == 2
          ? "Meses"
          : "Dias";
      }
      return duration_type == 1 ? "Ano" : duration_type == 2 ? "Mês" : "Dia";
    }
  }
};
</script>