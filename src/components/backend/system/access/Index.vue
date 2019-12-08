<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" md="6">
        <list-permissions></list-permissions>
      </v-col>
       <v-col cols="12" md="6">
        <list-roles></list-roles>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListPermissions from './permissions/List'
import ListRoles from './roles/List'
export default {
    components: {
        ListPermissions,
        ListRoles,
    },
    
}
</script>