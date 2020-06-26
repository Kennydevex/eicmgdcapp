
<template>
  <v-container grid-list-xs fluid>
    <!-- <v-row>
      <v-container grid-list-xs>
        <v-col cols="12" class="ma-0 pa-0">
          <v-btn large rounded class="text-uppercase font-weight-regular" text>Equipa</v-btn>
        </v-col>
      </v-container>
    </v-row> -->
    <v-row data-aos="fade-in" data-aos-duration="2000" class="my-3" align="center" justify="center">
      <template v-for="(team, t) in teams">
        <v-col :key="'team_'+t" cols="12" md="2" sm="6" align="center" justify="center">
          <div class="team_display" @click.stop="$set(team_dialog, team.id, true)">
            <!-- :tile="team.charges[0].name=='Diretor'?true:false" -->
            <v-avatar
              :size="team.charges[0].name=='Diretor'?'135':'110'"
              :color="team.charges[0].name=='Diretor'?'primary':'grey lighten-3'"
            >
              <img
                :src="`${apiUrl}/images/app/resources/employees/${team.perfil_photo}`"
                alt="Foto de Perfil"
              />
              <!-- <img :src="require('@/assets/app/logo.png')" alt="alt" /> -->
            </v-avatar>
            <div class="mt-2">
              <h4
                class="text-none grey--text text--darken-3 font-weight-regular"
              >{{team.folk.name+' '+team.folk.lastname}}</h4>
            </div>
            <div class="pa-0 ma-0">
              <small
                class="text-none team_charge grey--text text--darken-1"
              >{{team.charges[0].name}}</small>
            </div>
          </div>
        </v-col>
        <v-dialog :key="'team_details_'+t" max-width="470" v-model="team_dialog[team.id]">
          <v-card class="mx-auto">
            <v-img
              aspect-ratio="1.4"
              :src="`${apiUrl}/images/app/resources/employees/${team.perfil_photo}`"
            >
              <v-row align="end" class="lightbox white--text pa-3 fill-height">
                <v-col>
                  <h2
                    class="subheading font-weight-regular"
                  >{{team.folk.name+' '+team.folk.lastname}}</h2>
                  <div class="body-1">
                    <v-chip rounded>
                      <v-icon>mdi-tag</v-icon>
                      {{team.charges[0].name}}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-img>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-action>
                <v-list-item-title>{{ team.email }}</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-action>
                <v-list-item-title>{{ team.phone }}</v-list-item-title>
              </v-list-item>
            </v-list>
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

