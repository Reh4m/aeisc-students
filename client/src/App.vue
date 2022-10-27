<template>
  <v-app>
    <v-content class="greylightentwo">
      <transition name="fade">
        <app-view></app-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>

<style>
.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: none;
  border-style: none !important;
  border-width: thin 0 0;
}

a {
  text-decoration: none;
}

/* router transition */
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
