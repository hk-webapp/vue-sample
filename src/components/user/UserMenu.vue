<template>
  <div class="user-menu-container">
    <template v-if="authorized">
      <div>
        <ImageControl
          :url="currentUser.image"
          :alt="currentUser.name"
          :category="'user'"
          :className="'user-menu-user-image'"
        />
        <div>{{currentUser.name}}</div>
      </div>
      <router-link :to="{name:'userInfoPage'}">اطلاعات کاربر</router-link>
    </template>
    <template v-else>
      <span>
        <router-link :to="{name:'loginPage'}">ورود</router-link>
      </span>
    </template>
  </div>
</template>

<script>
// import UserStatus from "../user/UserStatus";
import { mapGetters } from "vuex";
import ImageControl from "../uiControls/ImageControl";
export default {
  name: "usermenu",
  components: {
    ImageControl
  },
  computed: {
    ...mapGetters({
      currentUser: "getUserInfo",
      authorized: "isAuthorized"
    })
  }
};
</script>

