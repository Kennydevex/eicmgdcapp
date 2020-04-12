 <template>
  <v-container my-5>
    <v-row>
      <template v-for="(mission, m) in missions">
        <v-col :key="'appmissao'+m" cols="12" md="4" align="center" justify="center">
          <div>
            <v-icon color="grey darken-1" size="65">{{mission.icon}}</v-icon>
          </div>
          <div>
            <h4 class="title mb-0 primary--text font-weight-light text-uppercase">{{mission.title}}</h4>
            <p class="font-weight-regular">{{mission.description}}</p>
          </div>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["missions"]
};
</script>