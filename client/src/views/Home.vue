<template>
  <div>
    <AppBar />
    <div class="container-grid">
      <SideListNotes />
      <div>
        <QuillEditor theme="snow" @textChange="test" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";
import SideListNotes from "../components/SideListNotes.vue";
import AppBar from "../components/AppBar.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "Home",
  components: {
    QuillEditor,
    SideListNotes,
    AppBar,
  },
  setup() {
    const store = useStore();

    store.dispatch("notesModule/findNotes");

    function test(e) {
      console.log(e);
    }

    return {
      user: computed(() => store.state.authModule.user),
      token: computed(() => store.state.authModule.token),
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-grid {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". .";
}
</style>
