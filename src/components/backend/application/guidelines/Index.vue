<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-guidelines></list-guidelines>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListGuidelines from './List'
export default {
    components: {
        ListGuidelines,
    },
}
</script>