<template>
  <div class="category-entry-container">
    <div v-if="loading" class="data-loading" />
    <div class="category-entry-body">
      <div class="form-group">
        <label for="categoryname">نام</label>
        <input
          disabled
          v-validate="'required'"
          name="name"
          v-model="entitySource.Name"
          @change="$event => onChangeHandler"
        />
      </div>
      <div class="form-group">
        <label for="categorytitle">عنوان</label>
        <input
          autocomplete="false"
          placeholder="عنوان را وارد نمایید"
          name="title"
          v-validate="'required'"
          v-model="entitySource.Title"
        />
      </div>
      <div class="form-group">
        <label for="description">توضیحات</label>
        <textarea
          rows="5"
          cols="50"
          placeholder="اطلاعات اولیه را وارد نمایید"
          name="description"
          v-validate="'required'"
          v-model="entitySource.Description"
        />
      </div>
      <FileUploader title="تصویر" category="category" ref="fp" />
      <!-- <div class="form-group">
        <label for="imgcategory">آیا جدید است؟</label>
        <input type="checkbox" :checked="entitySource.IsNew" name="isnew" />
      </div> -->
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
import GeneralBtn from "./../uiControls/GeneralBtn";
import { mapGetters, mapActions } from "vuex";
import { ModalMode } from "../../classes/Enums";
import FileUploader from "./../uiControls/FileUploader";
export default {
  name: "categoryEntry",
  props: {
    courseName: String,
    courseId: String,
    ModeType: String,
    // entitySource:{},
    cancelEventHandler: undefined,
    saveEventHandler: undefined
  },
  components: {
    FileUploader,
    GeneralBtn
  },
  computed: {
    ...mapGetters({
      errormsg: "getCategoryError",
      loading: "getCategoryLoaded",
      entitySource: "getCategory",
      savingFlag: "getSaving"
    }),
    getCategoryName() {
      return this.$route.params.name;
    }
  },
  create() {
    this.getEmptyCategoryData();
  },
  methods: {
    ...mapActions(["saveCategory", "deleteCategoey", "getEmptyCategoryData"]),
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
    },
    onChangeHandler(event) {
      alert(3, event);
    },
    SetImg(event) {
      // eslint-disable-next-line
      console.log(event);
    },
    async InsertNewItem() {
      const info = await this.$refs.fp.GetInfo();
      let newCat = this.entitySource;
      newCat.Courseid = this.courseId;

      if (info !== null) {
        // TODO
        // newCat.ImgInfo =  info.info;
        newCat.ImageUrl = info.name;
      }

      const returnValue = await this.saveCategory(newCat);

      if (returnValue > 0 && this.saveEventHandler !== undefined) {
        this.saveEventHandler(event, this.entitySource, this.$refs.fileRef);
      }
    },
    async DeleteItem() {
      if (confirm("آیا در حذف آیتم جاری مطمئن هستید؟")) {
        let returnValue =await this.deleteCategoey(this.entitySource.Id);

        if (returnValue > 0 && this.saveEventHandler !== undefined) {
          this.saveEventHandler(event, this.entitySource, this.$refs.fileRef);
        }
      }
    },
    async SaveEvant(event) {
      if (this.ModeType == ModalMode.insert) {
        this.InsertNewItem(event);
      } else if (this.ModeType == ModalMode.delete) {
        this.DeleteItem(event);
      }
    },
    CancelEvant(event) {
      if (this.cancelEventHandler !== undefined) {
        this.cancelEventHandler(event);
      }
    }
  }
};
</script>
