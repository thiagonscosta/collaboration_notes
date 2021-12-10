<template>
  <div class="dropdown">
    <button @click="show = !show">
      {{ label }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
    </button>
    <div class="menu" v-show="show">
      <a
        v-for="item in itens"
        :key="item.action"
        @click="select(item.action)"
        >{{ item.label }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DropDown",
  emits: ["select"],
  props: {
    label: {
      type: String,
      required: true,
    },
    itens: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = ref(false);

    function select(key) {
      emit("select", key);
    }

    return {
      show,
      select,
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.button:active .menu {
  display: block;
}
</style>
