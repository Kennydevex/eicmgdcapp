<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-employees></list-employees>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListEmployees from './List'
export default {
    components: {
        ListEmployees,
    },
}
</script>