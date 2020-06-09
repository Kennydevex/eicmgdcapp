<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-outcomes></list-outcomes>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListOutcomes from './List'
export default {
    components: {
        ListOutcomes,
    },
}
</script>