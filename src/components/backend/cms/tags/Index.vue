<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-tags></list-tags>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListTags from './List'
export default {
    components: {
        ListTags,
    },
}
</script>