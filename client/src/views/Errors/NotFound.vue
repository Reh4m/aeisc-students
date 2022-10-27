<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-container>
      <v-card class="transparent text-center" flat>
        <v-container>
          <h1 class="display-2">404 ERROR</h1>
        </v-container>
        <v-container>
          <span>{{ payload === undefined ? payload : payload.message }}</span>
        </v-container>
        <v-btn class="mt-2" color="error" @click="$router.go(-1)">
          Go back
        </v-btn>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
export default {
  props: ['payload'],
};
</script>
