<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-murals></list-murals>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListMurals from './List'
export default {
    components: {
        ListMurals,
    },
}
</script>