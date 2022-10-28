<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat class="text-center">
          <v-card-text>
            <span class="display-1 font-weight-bold">
              Welcome Back
            </span>
          </v-card-text>
          <v-card-text>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSigninUser"
            >
              <v-text-field
                filled
                label="Username"
                required
                v-model="username"
                :rules="usernameRules"
              ></v-text-field>

              <v-text-field
                filled
                label="Password"
                required
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>

              <v-btn
                depressed
                block
                color="primary"
                :loading="loading"
                :disabled="loading || !isFormValid"
                @click="handleSigninUser"
              >
                Sign in
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- form error message -->
        <v-slide-x-reverse-transition>
          <div v-if="error" class="mt-5">
            <AuthAlert :message="error.message" />
          </div>
        </v-slide-x-reverse-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
    isFormValid: true,
    show: false,
    usernameRules: [
      (username) => !!username || "Username is required",
      (username) =>
        username.length < 10 || "Username must be less than 10 characters",
    ],
    passwordRules: [
      (password) => !!password || "Password is required",
      (password) =>
        password.length >= 6 || "Username must be less than 6 characters",
    ],
  }),
  computed: {
    ...mapGetters(["admin", "error", "loading"]),
  },
  watch: {
    admin(value) {
      // if user value chancges from null to object, redirect to home page
      if (value) this.$router.push("/admin");
    },
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinAdmin", {
          username: this.username,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style>
/* loader animation */
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
