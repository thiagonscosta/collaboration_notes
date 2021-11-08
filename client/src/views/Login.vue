<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4">
        <div class="card p-4 border-0 shadow-sm mt-5">
          <LoginForm @onSubmitLogin="submitLogin" />
          <GoogleButton
            :label="'Login with Google'"
            @onGoogleAuth="googleAuthenticate"
          />
          <a href="/signup" class="a font-weight-bold text-center mt-4">
            Create account
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {
    LoginForm,
    GoogleButton,
  },
  setup() {
    const store = useStore();

    function submitLogin(data) {
      store.dispatch("authModule/authenticate", data);
    }

    function googleAuthenticate(token) {
      console.log(token)
      store.dispatch("authModule/authenticateWithGoogle", token);
    }

    return {
      submitLogin,
      googleAuthenticate,
    };
  },
  methods: {},
};
</script>

