<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-histories></list-histories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListHistories from './List'
export default {
    components: {
        ListHistories,
    },
}
</script>