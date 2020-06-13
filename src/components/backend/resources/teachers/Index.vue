<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-marks></list-marks>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListMarks from './List'
export default {
    components: {
        ListMarks,
    },
}
</script>