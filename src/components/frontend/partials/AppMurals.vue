 <template>
  <v-container my-5>
    <v-row>
      <template v-for="(mural, m) in murals">
        <v-col :key="'appmural'+m" cols="12" md="4" align="center" justify="center">
          <div>
            <v-icon color="grey darken-1" size="65">{{mural.icon}}</v-icon>
          </div>
          <div>
            <h4
              class="subtitle-1 mb-0 primary--text font-weight-light text-uppercase"
            >{{mural.title}}</h4>
            <p class="font-weight-light body-2 grey--text text--darken-3">{{mural.description}}</p>
          </div>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["murals"]
};
</script>