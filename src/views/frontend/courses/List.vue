<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <!-- <template v-for="(course, c) in courses"> -->
      <template v-for="(item, c) in items">
        <div :key="'curso_'+c">
          <v-row v-if="slug=='via_tecnica' && item.type==1">
            <v-col cols="12">
              <!-- <v-card>
                <v-card-title primary-title>{{course.name}}</v-card-title>
              </v-card>-->

              <v-hover v-slot:default="{ hover }">
                <v-card
                  @click="teste"
                  class="pa-2"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img :src="item.img" height="225px">
                    <v-card-title class="title white--text ma-2">
                      <v-row class="fill-height flex-column" justify="space-between">
                        <p class="mt-2 subheading text-left">{{ item.title }}</p>

                        <div>
                          <p class="ma-0 body-1 font-weight-regular text-left">{{ item.text }}</p>
                          <p class="caption font-weight-medium font-italic text-left">
                            <v-icon dark small>mdi-clock</v-icon>
                            {{ item.subtext }}
                          </p>
                        </div>
                      </v-row>
                    </v-card-title>

                    <v-card-actions>
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        icon
                      >
                        <v-icon :class="{ 'show-btns': hover }" color="transparent">{{ icon }}</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>

          <v-row v-if="slug=='profissional' && item.type==2">
            <v-col cols="12">
              <v-card>
                <v-card-title primary-title>{{item.title}}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // Um  erro a ser currigido, pois a navegacao para a mesma localizacao resulta num erro no console, Alternativa. ver forma de returnar da navegacao se o destino da navegacao e igual ao local atual
  // ==============================================

  data() {
    return {
      icons: ["mdi-share-variant"],
      items: [
        {
          type: 1,
          title: "Informatica de Gestao",
          text: "It's New Release Friday",
          subtext: "Ha 10 dias",
          img: "http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg"
        },
        {
          type: 2,

          title: "Mecanica",
          text: "Greatest Rock Hits",
          subtext: "Ha 2 anos",
          img:
            "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        },
        {
          type: 1,

          title: "Eletricidade",
          text: "Ambient Bass",
          subtext: "Chill beats to mellow you out.",
          img: "http://lorempixel.com/output/abstract-q-c-640-480-6.jpg"
        }
      ],
      courses: [
        {
          id: 1,
          name: "Eletricidade",
          slug: "Eletricidade",
          presentation:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo sequi incidunt nihil vitae, dolor deleniti quisquam rem recusandae repudiandae ea!",
          type: 1, // Curso da via tecnica ou Formacao proficional
          begin: "21/03/2000",
          duaration: 3,
          featured: true,
          status: true,
          departament: "Servico e Comercio",
          outcomes: [
            {
              id: 1,
              name: "Professor",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 1 //Saida, pode ser profissional ou academica
            },
            {
              id: 2,
              name: "Engenheiro Civil",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 2 //Saida, pode ser profissional ou academica
            }
          ],
          subjects: [
            {
              id: 1,
              name: "Matematica",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 1, //Saida, pode ser profissional ou academica
              workload: 20 // A carga horaria do curso
            }
          ]
        },
        {
          id: 1,
          name: "Construcao civil",
          slug: "Construcao civil",
          presentation:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo sequi incidunt nihil vitae, dolor deleniti quisquam rem recusandae repudiandae ea!",
          type: 2, // Curso da via tecnica ou Formacao proficional
          begin: "21/03/2000",
          duaration: 3,
          featured: true,
          status: true,
          departament: "Engenharia Geral",
          outcomes: [
            {
              id: 1,
              name: "Engenheiro",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 1 //Saida, pode ser profissional ou academica
            },
            {
              id: 2,
              name: "Arquitecto",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 2 //Saida, pode ser profissional ou academica
            }
          ],
          subjects: [
            {
              id: 1,
              name: "Digign Civil",
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              type: 1, //Saida, pode ser profissional ou academica
              workload: 20 // A carga horaria do curso
            }
          ]
        }
      ]
    };
  },

  computed: {
    slug: function() {
      return this.$route.params.slug;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
