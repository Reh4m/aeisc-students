<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Número de control
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in students" :key="item.controlNumber">
          <td>{{ item.controlNumber }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  created() {
    this.handleGetStudents();
  },
  computed: {
    ...mapGetters(["loading", "students"]),
  },
  methods: {
    handleGetStudents() {
      // reach out to Vuex store, fine action that gets post for carousel
      this.$store.dispatch("getStudents");
    },
  },
};
</script>
