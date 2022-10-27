<template lang="html">
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <router-link class="d-none d-sm-none d-md-flex" to="/">
        <v-btn text large>
          Schooldevs
        </v-btn>
      </router-link>

      <v-spacer class="hidden-xs-only" />

      <!-- search input -->
      <v-text-field
        class="mr-3"
        v-model="searchTerm"
        filled
        dense
        hide-details
        placeholder="Search"
        @click="goToSearchPage"
        :append-icon="searchTerm && 'mdi-magnify'"
        @input="handleSearchPosts"
      ></v-text-field>

      <!-- horizontal navbar items -->
      <v-btn
        text
        large
        color="primary"
        class="hidden-xs-only"
        v-for="link in horizontalNavItems"
        :key="link.name"
        router
        :to="link.router"
      >
        <v-icon class="hidden-sm-only" left>{{ link.icon }}</v-icon>
        {{ link.name }}
      </v-btn>

      <!-- profile button -->
      <v-btn
        text
        large
        class="hidden-xs-only"
        color="primary"
        v-if="user"
        router
        to="/user"
      >
        <v-icon class="hidden-sm-only" left>mdi-account-outline</v-icon>
        <v-badge
          color="#8b4367"
          :class="{ bounce: badgeAnimated }"
          :content="userFavorites.length"
          :value="userFavorites.length"
        >
          Profile
        </v-badge>
      </v-btn>

      <!-- signout button -->
      <v-btn
        text
        large
        class="hidden-xs-only"
        color="primary"
        v-if="user"
        @click="handleSignoutUser"
      >
        <v-icon class="hidden-sm-only" left>mdi-logout-variant</v-icon>
        Signout
      </v-btn>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="#328168"
      ></v-progress-linear>
    </v-app-bar>

    <!-- sidenav -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <!-- side nav items -->
      <v-list shaped>
        <v-list-item
          color="#FF6B6B"
          v-for="item in sideNavItems"
          :key="item.name"
          link
          :to="item.router"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list shaped>
          <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-list-item-avatar>
              <v-icon>
                {{
                  $vuetify.theme.dark ?
                  'mdi-brightness-4' : 'mdi-brightness-7'
                 }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Theme Dark</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="user" @click="handleSignoutUser">
            <v-list-item-avatar>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data: vm => ({
    initialDark: vm.$vuetify
      ? vm.$vuetify.theme.dark
      : false,
    drawer: null,
    badgeAnimated: false,
    searchTerm: ''
  }),
  beforeDestroy () {
    if (!this.$vuetify) return

    this.$vuetify.theme.dark = this.initialDark
  },
  methods: {
    ...mapActions(["signoutUser"]),
    goToSearchPage() {
      if (this.$route.path !== '/search' ) {
        this.$router.push('/search');
      }
    },
    handleSearchPosts() {
      this.$store.dispatch("searchPosts", {
        searchTerm: this.searchTerm,
      });
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
  },
  watch: {
    userFavorites(value) {
      // if user favorites value changed at all
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    },
  },
  computed: {
    ...mapGetters(["user", "loading", "userFavorites"]),
    horizontalNavItems() {
      let items = [
        {
          name: "Posts",
          router: "/posts",
          icon: "mdi-newspaper-variant-multiple-outline",
        },
        { name: "Sign in", router: "/signin", icon: "mdi-login-variant" },
        {
          name: "Sign up",
          router: "/signup",
          icon: "mdi-account-plus-outline",
        },
      ];

      if (this.user) {
        items = [
          {
            name: "Posts",
            router: "/posts",
            icon: "mdi-newspaper-variant-multiple-outline",
          },
        ];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { name: "Home", router: "/", icon: "mdi-home-outline" },
        {
          name: "Posts",
          router: "/posts",
          icon: "mdi-newspaper-variant-multiple-outline",
        },
        { name: "Sign in", router: "/signin", icon: "mdi-login-variant" },
        {
          name: "Sign up",
          router: "/signup",
          icon: "mdi-account-plus-outline",
        },
      ];

      if (this.user) {
        items = [
          { name: "Home", router: "/", icon: "mdi-home-outline" },
          {
            name: "Posts",
            router: "/posts",
            icon: "mdi-newspaper-variant-multiple-outline",
          },
          {
            name: "Create Post",
            router: "/post/add",
            icon: "mdi-card-text-outline",
          },
          { name: "Profile", router: "/user", icon: "mdi-account-outline" },
        ];
      }
      return items;
    },
  },
};
</script>

<style lang="css">
/* sidevar style */
.list-item-active {
  font-weight: 600;
}

/* user favorite animation */
.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
}
</style>
