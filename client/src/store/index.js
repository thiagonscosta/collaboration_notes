import { createStore } from "vuex";
import authModule from "./modules/auth";
import notesModule from "./modules/notes";

export default createStore({
  modules: {
    authModule,
    notesModule,
  },
});
