<template>
  <v-dialog
    width="500"
    :value="dialog"
    @input="$emit('update:dialog', false)"
    @keydown.esc="closeDialog"
  >
    <v-card>
      <v-card-title>
        Sign in Required
      </v-card-title>
      <v-card-text>
        Liking, commenting and many other features are only possible after you
        sign in.
      </v-card-text>
      <v-card-actions class="greylightenfive">
        <v-spacer/>
        <v-btn text @click="closeDialog">
          Cancel
        </v-btn>
        <v-btn
          depressed
          dark
          color="#ac5380"
          to="/signin"
          @click="closeDialog"
        >
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SigninRequired",
  props: {
    dialog: Boolean
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>
