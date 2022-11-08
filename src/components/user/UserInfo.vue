<template>
  <div class="user-info-container">
    <div class="user-info-form">
      <div v-if="showImg" class="form-group">
        <ImageControl
          :url="user.image"
          :alt="user.name"
          :category="'user'"
          :className="'user-info-image'"
        />
      </div>
      <div class="form-group">
        <label>نام کاربری :</label>
        <input v-model="user.userName" disabled name="username" placeholder="نام کاربری" />
      </div>
      <div class="form-group">
        <label>نام و نام خانوادگی :</label>
        <input v-model="user.name" name="fullname" placeholder="نام و نام خانوادگی کاربر" />
      </div>
      <div class="form-group">
        <label>تصویر کاربر :</label>
        <input @change="imageChanged" ref="fileSelector" type="file" hidden />
        <input value="انتخاب تصویر" class="file-btn" type="button" @click="openFileSelector" />
        <span class="image-selected-info">{{getSelectedImageInfo.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageControl from "../uiControls/ImageControl";
import { mapGetters } from "vuex";

export default {
  name: "userinfo",
  components: {
    ImageControl
  },
  data() {
    return {
      user: {
        name: "",
        userName: "",
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "getUserInfo"
    }),
    showImg() {
      return this.user && this.user.image !== "";
    },
    getSelectedImageInfo() {
      if (this.$refs.fileSelector && this.$refs.fileSelector.files.length) {
        const file = this.$refs.fileSelector.files[0];
        return {
          name: file.name,
          size: file.size,
          mineType: file.type
        };
      } else {
        return {
          name: "",
          size: 0,
          mineType: ""
        };
      }
    }
  },
  mounted() {
    this.user.userName = this.currentUser.userName;
    this.user.image = this.currentUser.image;
    // eslint-disable-next-line
    console.log(this.user);
  },
  methods: {
    imageChanged() {
      if (this.$refs.fileSelector && this.$refs.fileSelector.files.length) {
        // this.user.imageName = this.$refs.fileSelector.files[0].name;
        // this.user.imageSize = this.$refs.fileSelector.files[0].size;
        // this.user.imageType = this.$refs.fileSelector.files[0].type;
      }
    },
    openFileSelector() {
      // eslint-disable-next-line
      console.log(this.$refs.fileSelector);
      window.__eeeeee = this.$refs.fileSelector;
      if (this.$refs.fileSelector) {
        this.$refs.fileSelector.click();
      }
    }
  }
};
</script>
