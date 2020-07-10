<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-card flat>
        <v-card-text class="ma-0 pa-0">
          <template v-for="(guideline, m) in guidelines">
            <div :key="'guideline_'+m">
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline primary--text">{{guideline.name}}</h3>
                </v-card-title>
                <v-card-text>
                  <p class="text-justify">{{guideline.description}}</p>
                </v-card-text>
              </v-card>
              <v-divider v-if="m != guidelines.length-1"></v-divider>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-layout>
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
    this.getAll(this.guidelines, "getGuidelines");
  },

  computed: {
    guidelines() {
      return this.$store.getters.guidelines;
    },

    
  }
};
</script>