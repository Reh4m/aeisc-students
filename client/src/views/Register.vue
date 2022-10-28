<template lang="html">
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-container>
          <v-img src="../assets/logo.png"></v-img>
        </v-container>
        <v-card flat class="text-center">
          <v-card-text>
            <span class="display-1 font-weight-bold">
              Registro de alumnos
            </span>
          </v-card-text>

          <v-card-text>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignupStudent"
            >
              <!-- Control number input -->
              <v-text-field
                filled
                label="Número de control"
                required
                v-model="controlNumber"
                :rules="controlNumberRules"
              ></v-text-field>

              <v-btn
                block
                depressed
                color="primary"
                :loading="loading"
                :disabled="loading || !isFormValid"
                @click="handleSignupStudent"
              >
                Registrar
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Signup",
  data: () => ({
    isFormValid: true,
    controlNumber: "",
    controlNumberRules: [
      (controlNumber) => !!controlNumber || "Control number is required",
    ],
  }),
  computed: {
    ...mapGetters(["error", "loading"]),
  },
  methods: {
    ...mapActions(["signupStudent"]),
    handleSignupStudent() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupStudent", {
          controlNumber: this.controlNumber,
        });
      }
    },
  },
};
</script>

<style lang="css"></style>
