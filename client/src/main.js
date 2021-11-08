import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GAuth from "vue3-google-oauth2";
import store from "./store";
import apolloProvider from "./graphql/apollo";

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'
import "./styles/sass/app.scss";

const gAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};

createApp(App)
  .use(router)
  .use(GAuth, gAuthOptions)
  .use(apolloProvider)
  .use(store)
  .mount("#app");
