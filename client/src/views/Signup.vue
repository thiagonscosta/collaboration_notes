<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4">
        <div class="card p-4 mt-5 border-0">
          <SignupForm />
          <GoogleButton :label="'Signup with Google'" />
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

export default {
  name: "Login",
  components: {
    SignupForm,
    GoogleButton,
  },
};
</script>
