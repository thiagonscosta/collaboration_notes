<template>
  <div class="navbar navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Notes</a>
    <DropDown
      :label="user.username"
      :itens="menu_itens"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import DropDown from "./DropDown.vue";

export default {
  name: "AppBar",
  components: {
    DropDown,
  },
  setup() {
    const store = useStore();

    const menu_itens = ref([
      { label: "Profile", action: "profile" },
      { label: "Logout", action: "logout" },
    ]);

    function handleSelect(e) {
      console.log("key", e);
    }

    // onMounted(() => {
    //   console.log(user.value)
    // });

    return {
      user: computed(() => store.state.authModule.user),
      menu_itens,
      handleSelect,
    };
  },
};
</script>
