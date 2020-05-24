<template>
  <div>
    <v-row>Aqui vai tudo</v-row>
    <v-row>
      <v-col>
        <v-card id="sliders-action">
          <v-speed-dial
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn :to="{ name: 'add_course'}" v-if="canAdd()" fab dark small color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  }
};
</script>



<style lang="scss" scoped>
#sliders-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#sliders-action .v-btn--floating {
  position: relative;
}
</style>