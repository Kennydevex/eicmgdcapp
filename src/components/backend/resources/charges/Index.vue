<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-charges></list-charges>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCharges from './List'
export default {
    components: {
        ListCharges,
    },
}
</script>