<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
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

    <button type="submit" class="mt-3 btn btn-primary w-100">Login</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginForm",
  emits: ["onSubmitLogin"],
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");
    function onSubmit() {
      const data = {
        email: email.value,
        password: password.value,
      };
      emit("onSubmitLogin", data);
    }
    return {
      email,
      password,
      onSubmit,
    };
  },
};
</script>
