<template>
  <div class="menu-sider-container">
    <div class="menu-sider-logo">logo</div>

    <div class="menu-sider-item">
      <UserMenu />
      <router-link :to="{name:'courseMngPage'}">مدیریت دوره ها</router-link>
    </div>
  </div>
</template>

<script>
import UserMenu from "../user/UserMenu";
export default {
  name: "menusider",
  components: {
    UserMenu
  }
};
</script>

