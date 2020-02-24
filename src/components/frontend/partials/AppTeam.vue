
<template>
  <v-container grid-list-xs fluid>
    <!-- <v-row>
      <v-col cols="12">
        <v-btn large rounded class="text-uppercase font-weight-regular" text>Equipa</v-btn>
      </v-col>
    </v-row> -->
    <v-row data-aos="fade-in" data-aos-duration="2000" class="my-3" align="center" justify="center">
      <template v-for="(team, t) in teams">
        <v-col :key="'team_'+t" cols="12" md="2" sm="6" align="center" justify="center">
          <div class="team_display" @click.stop="$set(team_dialog, team.id, true)">
            <v-avatar :size="team.charge=='Diretor'?'145':'110'" color="primary">
              <img :src="require('@/assets/app/logo.png')" alt="alt" />
            </v-avatar>
            <div class="mt-2">
              <h4 class="text-none grey--text text--darken-3">{{team.name}}</h4>
            </div>
            <div class="pa-0 ma-0">
              <small class="text-none team_charge grey--text text--darken-1">{{team.charge}}</small>
            </div>
          </div>
        </v-col>
        <v-dialog :key="'team_details_'+t" max-width="690" v-model="team_dialog[team.id]">
          <v-card>
            <v-img :src="require('@/assets/app/sliders/slide1.gif')">
              <v-layout column fill-height>
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5 font-weight-light">{{team.name}}</div>
                </v-card-title>
              </v-layout>
            </v-img>
          </v-card>
        </v-dialog>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["teams"],
  data() {
    return {
      team_dialog: {}
    };
  }
};
</script>


<style lang="scss" scoped>
.team_display {
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
}
// Caso a corrigir tambem
// .team_display:hover {
//   border-bottom: 3px #2698d9 solid;
//   padding-bottom: -3px;
// }
</style>

