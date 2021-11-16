<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        class="form-control"
        type="text"
        v-model="username"
      />
    </div>
    <div class="form-group mt-3">
      <label for="email">Email</label>
      <input id="email" class="form-control" type="email" v-model="email" />
    </div>
    <div class="form-group mt-3">
      <label for="password">Password</label>
      <input
        id="password"
        class="form-control"
        type="password"
        v-model="password"
      />
    </div>
    <div class="form-group mt-3">
      <label for="confirm-password">Confirm password</label>
      <input
        id="confirm-password"
        class="form-control"
        type="password"
        v-model="confirm_password"
      />
    </div>
    <button type="submit" class="mt-3 btn btn-primary w-100">Sing up</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SignupForm",
  setup(props, { emit }) {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");

    function onSubmit() {
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        // confirm_password: confirm_password.value,
      };

      // if (data.password !== data.confirm_password) {
      // }

      emit("onSubmitSignup", data);
    }
    return {
      username,
      email,
      password,
      confirm_password,
      onSubmit,
    };
  },
};
</script>
