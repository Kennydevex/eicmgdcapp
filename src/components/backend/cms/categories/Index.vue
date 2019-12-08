<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-categories></list-categories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCategories from './List'
export default {
    components: {
        ListCategories,
    },
}
</script>