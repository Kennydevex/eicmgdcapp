<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-disciplines></list-disciplines>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListDisciplines from './List'
export default {
    components: {
        ListDisciplines,
    },
}
</script>