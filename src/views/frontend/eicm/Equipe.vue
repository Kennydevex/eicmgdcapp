<template>
  <v-container grid-list-xs>
    <v-row>
      <template v-for="(team, t) in teams">
        <v-col :key="'school_team_'+t" cols="12" md="3" sm="6" align="center" justify="center">
          <div class="team_display">
            <v-avatar size="130" color="primary" tile>
              <img
                :src="`${apiUrl}/images/app/resources/employees/${team.perfil_photo}`"
                alt="Foto de Perfil"
              />
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
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { getDatas } from "@/mixins/SendForm";

export default {
  mixins: [getDatas],
  data() {
    return {};
  },

  created() {
    this.getAll(this.teams, "getTeams");
  },

  computed: {
    teams: function() {
      return this.$store.getters.teams;
    }
  },

  methods: {}
};
</script>