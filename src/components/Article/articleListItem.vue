<template>
  <div classs="article-list-item-container">
    <div>
      <select  @change="changeTypeHandler">
        <option value="0">متن</option>
        <option value="1">عنوان</option>
        <option value="2">تصویر</option>
        <option value="3">کد</option>
      </select>
    </div>
    <div v-if="ArticleItemType === ArticleItemType.Text">
      <textarea rows="5" cols="50" />
    </div>
    <div v-if="ArticleItemType === ArticleItemType.Header">
      <div><h3>header</h3></div>
    </div>
    <div v-if="ArticleItemType === ArticleItemType.Image">
      <div><FileUploader /></div>
    </div>
    <div v-if="ArticleItemType === ArticleItemType.COde">
      <textarea rows="5" cols="50" />
    </div>
    <!-- <editor /> -->
    <div class="form-group btn-bar">
      <GeneralBtn text="ثبت" :saving="savingFlag" :clickHandler="saveHandler" />

      <GeneralBtn text="انصراف" :saving="2" :clickHandler="CancelEvant" />
    </div>
  </div>
</template>

<script>
// import editor from "./../uiControls/editor";
import FileUploader from "./../uiControls/FileUploader";
import { ArticleItemType } from "./../../classes/Enums";
export default {
  name: "ArticleListItem",
  components: {
    //   editor
    FileUploader
  },
  props: {
    ModeType: String,
    articleId: String,
    articleName: String,
    saveEventHandler: {
      type: Function,
      default: undefined
    },
    cancelEventHandler: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      modalTitle: "test",
      ArticleItemType: 0
    };
  },
  methods: {
    changeTypeHandler(event) {
      console.log(event);
    }
  }
};
</script>

<style></style>
