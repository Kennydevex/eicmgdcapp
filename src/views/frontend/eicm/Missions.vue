<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <!-- <v-card v-if="publishedMissions.length>0" flat>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" icon flat>
              <v-icon>print</v-icon>
            </v-btn>
            <v-btn color="grey lighten-1" icon flat>
              <v-icon>email</v-icon>
            </v-btn>
          </v-card-title>
          <template v-for="mission in publishedMissions">
            <v-flex xs12 :key="mission.id">
              <v-card flat>
                <v-card-title primary-title class="text-xs-center">
                  <h3 class="headline primary--text">{{mission.name}}</h3>
                </v-card-title>
                <v-card-text>
                  <p>{{mission.description}}</p>
                </v-card-text>
              </v-card>
            </v-flex>
          </template>
        </v-card> -->

         <v-card tile>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" icon flat>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
            <v-btn color="grey lighten-1" icon flat>
              <v-icon>mdi-mail</v-icon>
            </v-btn>
          </v-card-title>
            <v-flex xs12>
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline primary--text">Missao</h3>
                </v-card-title>
                <v-card-text>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic dolor atque tempora cupiditate odit voluptatibus illo veritatis saepe a provident quae minima odio sit laudantium, ipsa sed, nobis doloremque!</p>
                </v-card-text>
              </v-card>
            </v-flex>

             <v-flex xs12>
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline primary--text">Visão</h3>
                </v-card-title>
                <v-card-text>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic dolor atque tempora cupiditate odit voluptatibus illo veritatis saepe a provident quae minima odio sit laudantium, ipsa sed, nobis doloremque!</p>
                </v-card-text>
              </v-card>
            </v-flex>

             <v-flex xs12>
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline primary--text">Valares</h3>
                </v-card-title>
                <v-card-text>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic dolor atque tempora cupiditate odit voluptatibus illo veritatis saepe a provident quae minima odio sit laudantium, ipsa sed, nobis doloremque!</p>
                </v-card-text>
              </v-card>
            </v-flex>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>