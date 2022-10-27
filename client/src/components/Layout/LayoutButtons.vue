<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon @click="toggleLayoutMozaic" v-on="on">
          <v-icon :color="mozaicLayout ? 'grey' : 'darklighten'">
            mdi-view-grid-outline
          </v-icon>
        </v-btn>
      </template>
      <span>Mozaic Layout</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon @click="toggleLayoutMozaic" v-on="on">
          <v-icon :color="mozaicLayout ? 'darklighten' : 'grey'">
            mdi-view-agenda-outline
          </v-icon>
        </v-btn>
      </template>
      <span>Row Layout</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'LayoutButtons',
  props: {
    mozaicLayout: Boolean
  },
  methods: {
    toggleLayoutMozaic() {
      this.$emit('toggleLayoutMozaic');
    }
  }
}
</script>

<style>

</style>
