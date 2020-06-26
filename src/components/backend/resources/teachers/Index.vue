<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-teachers></list-teachers>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListTeachers from './List'
export default {
    components: {
        ListTeachers,
    },
}
</script>