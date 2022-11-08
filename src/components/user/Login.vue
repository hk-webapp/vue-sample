<template>
  <div class="login-container">
    <div class="form-group">
      <label for="UserName">نام کاربری:</label>
      <input
        name="UserName"
        v-model="username"
        class="ltr-field"
        v-validate="'required'"
        placeholder="نام کاربری را وارد نمایید"
      />
      <p class="app-error" v-if="pageErrors.has('UserName')">
        {{ pageErrors.first("UserName") }}
      </p>
    </div>
    <div class="form-group">
      <label>رمزعبور:</label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="ltr-field"
        v-validate="'required'"
        placeholder="رمزعبور را وارد نمایید"
      />
      <p class="app-error" v-if="pageErrors.has('password')">
        {{ pageErrors.first("password") }}
      </p>
    </div>
    <div class="form-group">
      <input
        type="button"
        value="ورود"
        name="btnLogin"
        :disabled="!isAuthorized"
        @click="loginEventHandler"
      />
      <!-- <GeneralBtn text="ورود" :loadeing="loading" clickHandler="loginEventHandler" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "login",
  // components: {
  //   GeneralBtn
  // },
  data() {
    return {
      password: "",
      username: ""
    };
  },
  computed: {
    ...mapGetters({
    loading:  "getUserLoginLoad"
    }),
    isAuthorized() {
      return !this.$store.state.user.authorized;
    }
  },
  methods: {
    loginEventHandler() {
      this.$validator.validateAll().then(isvalid => {
        if (isvalid) {
          this.$store.dispatch("LoginUser", {
            username: this.username,
            password: this.password
          });

          const url = this.$route.query.redirect || "/";
          this.$router.push(url);
        }
      });
    }
  }
};
</script>
