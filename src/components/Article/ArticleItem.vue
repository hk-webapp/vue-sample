<template>
  <div class="article-entry-container">
    <div v-if="loading" class="data-loading" />
    <div class="article-entry-body">
      <div class="form-group">
        <label for="articletitle">عنوان</label>
        <input
          placeholder="عنوان را وارد نمایید"
          name="title"
          v-validate="'required'"
          v-model="entitySource.Title"
        />
      </div>
      <div class="form-group">
        <FileUploader title="تصویر" category="article" />
      </div>

      <div class="form-group btn-bar">
        <GeneralBtn
          text="ثبت"
          :saving="savingFlag"
          :clickHandler="saveHandler"
        />

        <GeneralBtn text="انصراف" :saving="2" :clickHandler="CancelEvant" />
      </div>
    </div>
    <div class=" form-group error-container">
      <div
        class="error-line"
        v-for="(err, index) in pageErrors"
        v-bind:key="index"
      >
        {{ err.msg }}
      </div>
      <div class="error-container">
        <span>{{ errormsg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ModalMode
} from "../../classes/Enums";
import FileUploader from "./../uiControls/FileUploader";
import GeneralBtn from "./../uiControls/GeneralBtn";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "articleItem",
  components: {
    FileUploader,
    GeneralBtn
  },
  props: {
    articleId: Number,
    articleName: String,
    saveEventHandler: {
      type: Function,
      default: undefined
    },
    cancelEventHandler: {
      type: Function,
      default: undefined
    },
    ModeType: String
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      errormsg: "getArticleError",
      entitySource: "getArticle",
      loading: "getArticleLoaded",
      savingFlag: "getSaving"
    })
  },
  methods: {
    ...mapActions(["saveArticle", "deleteArticle"]),
    CancelEvant(event) {
      if (this.cancelEventHandler !== undefined) {
        this.cancelEventHandler(event);
      }
    },
    async DeleteItem() {
      if (confirm("آیا در حذف آیتم جاری مطمئن هستید؟")) {
        const returnValue = await this.deleteArticle(this.entitySource.Id);
        if (returnValue == 1 && this.saveEventHandler !== undefined) {
          this.saveEventHandler(event, this.entitySource, this.$refs.fileRef);
        }
      }
    },
    async InsertNewItem() {
      this.entitySource.CategoryId = this.$route.params.id;
      const returnValue = await this.saveArticle(
        this.entitySource,
        this.$refs.fileRef
      );

      if (returnValue > 0 && this.saveEventHandler !== undefined) {
        this.saveEventHandler(event, this.entitySource, this.$refs.fileRef);
      }
    },
    saveHandler() {
      if (this.ModeType === ModalMode.delete) {
        this.DeleteItem();
      } else {
        this.$validator.validateAll().then(isvalid => {
          if (isvalid) {
            // if (this.ModeType === ModalMode.insert) {
            this.InsertNewItem();
            // }
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.article-entry-container {
  width: 100%;
  height: max-content;
  overflow: hidden;
  direction: rtl;
  text-align: right;
  .article-entry-body {
    width: 100%;
  }
  label {
    width: 80px;
  }
}
</style>
