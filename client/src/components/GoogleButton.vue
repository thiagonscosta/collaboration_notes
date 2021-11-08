<template>
  <button
    type="submit"
    class="mt-3 btn btn-light w-100 btn-primary"
    @click="getGoogleToken"
  >
    <img src="../assets/google-color.png" alt="Google" width="20" />
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "GoogleButton",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {},
  methods: {
    async getGoogleToken() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        const token = googleUser.getAuthResponse().access_token;
        this.$emit("onGoogleAuth", { token });
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
};
</script>

