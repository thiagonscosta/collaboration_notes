<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4">
        <div class="card p-4 mt-5 border-0">
          <SignupForm @onSubmitSignup="signup" />
          <GoogleButton
            :label="'Signup with Google'"
            @onGoogleAuth="googleSignup"
          />
          <a href="/login" class="mt-3 small text-center">
            already have an account?
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {
    SignupForm,
    GoogleButton,
  },
  setup() {
    const store = useStore();

    function signup(data) {
      store.dispatch("authModule/createUser", data);
    }

    function googleSignup(token) {
      store.dispatch("authModule/createUserWithGoogle", token);
    }

    return {
      signup,
      googleSignup,
    };
  },
};
</script>
