<template>
  <div class="user-status-container">
    <span v-if="authorized">{{currentUser.Name}}</span>
    <span v-else><router-link :to="{name:'loginPage'}">ورود</router-link></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userStatus",
  computed: {
    ...mapGetters({ 
      currentUser: "getUserInfo", 
      authorized: "isAuthorized" })
  }
};
</script>