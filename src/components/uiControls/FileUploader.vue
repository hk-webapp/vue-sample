<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <input @change="imageChanged" ref="fileSelector" type="file" hidden />
    <input
      value="انتخاب تصویر"
      class="file-btn"
      type="button"
      @click="openFileSelector"
    />
    <img ref="previewImg" class="image-selector-preview" alt="preview" />
    <div class="file-uploader-container">
      <div class="image-selected-info">
        <span>نام فایل : </span>{{ this.fileName }}
      </div>
      <div class="image-selected-info">
        <span>نوع فایل : </span>{{ this.mineType }}
      </div>
      <div class="image-selected-info">
        <span> سایز فایل : </span>{{ this.fileSize }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { imageManagment } from "../../apis/imageApi";
export default {
  name: "fileuploader",
  props: {
    title: String,
    category: String
  },
  data() {
    return {
      fileName: "",
      fileSize: 0,
      mineType: ""
    };
  },
  computed: {
    showImg() {
      return this.user && this.user.image !== "";
    }
  },
  methods: {
    ...mapActions(["saveImage"]),
    selectImgClick() {
      alert(2);
    },
    async GetInfo() {
      let fileSelector = this.$refs.fileSelector;
      if (fileSelector && fileSelector.files.length) {
        const file = fileSelector.files[0];
        const info = await file.arrayBuffer();

        this.imageUrl = info.mame;
        return { info: info, name: file.name, minetype: file.type };
      }
      return null;
    },
    getSelectedImageInfo() {
      let fileSelector = this.$refs.fileSelector;
      if (fileSelector && fileSelector.files.length) {
        const file = fileSelector.files[0];
        window.____________________ddd = file;
        this.fileName = file.name;
        this.fileSize = file.size;
        this.mineType = file.type;
        file.arrayBuffer().then(info => {
          this.$refs.previewImg.src = imageManagment.ShowImages(
            info,
            this.mineType
          );
        });
      } else {
        this.clearImgInfo();
      }
    },
    clearImgInfo() {
      this.fileName = "";
      this.fileSize = 0;
      this.mineType = "";
    },
    imageChanged() {
      this.getSelectedImageInfo();
    },
    openFileSelector() {
      if (this.$refs.fileSelector) {
        this.$refs.fileSelector.click();
      }
    }
  }
};
</script>
