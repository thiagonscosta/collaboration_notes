<template>
  <div>
    <AppBar />
    <div class="container-grid">
      <SideListNotes />
    </div>
    <quill-editor theme="snow" v-model:content="content" @textChange="textChange($event)" contentType="html"></quill-editor>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { ref, watch } from "vue";
import SideListNotes from "../components/SideListNotes.vue";
import AppBar from "../components/AppBar.vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: "Home",
  components: {
    SideListNotes,
    AppBar,
    QuillEditor
  },
  setup() {
    const store = useStore();

    const content = ref('');

    function test(e) {
      console.log(e)
    }

    function textChange(e) {
      // console.log(e)
      console.log(content)
    }

    store.dispatch("notesModule/findNotes");

    return {
      content,
      textChange,
      test,
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
