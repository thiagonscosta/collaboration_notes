<template>
  <form>
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" class="form-control" type="text" />
    </div>
    <div class="form-group mt-3">
      <label for="email">Email</label>
      <input id="email" class="form-control" type="email" />
    </div>
    <div class="form-group mt-3">
      <label for="password">Password</label>
      <input id="password" class="form-control" type="password" />
    </div>
    <div class="form-group mt-3">
      <label for="confirm-password">Confirm password</label>
      <input id="confirm-password" class="form-control" type="password" />
    </div>
    <button type="submit" class="mt-3 btn btn-primary w-100">Sing up</button>
  </form>
</template>

<script>
export default {
  name: "SignupForm",
  setup() {},
};
</script>
