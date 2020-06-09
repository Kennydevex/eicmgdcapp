<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" >
        <list-departments></list-departments>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListDepartments from './List'
export default {
    components: {
        ListDepartments,
    },
}
</script>