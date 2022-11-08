<template>
  <div id="app-0630">
    <!-- Component changes when currentTabComponent changes -->
    <component v-bind:is="currentLayout"></component>
  </div>
</template>

<script>
import empty from "./../components/empty";
import WebLayout from "./layouts/WebLayout";
import WithoutHeaderFooter from "./layouts/WithoutHeaderFooter";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../styles/app.scss";

export default {
  name: "app",
  computed: {
    currentLayout() {
      if (location.href.indexOf("?WithoutHeaderFooter")>=0) {
        return empty;
      } else {
        return WebLayout;
      }
    }
  }
};
</script>
