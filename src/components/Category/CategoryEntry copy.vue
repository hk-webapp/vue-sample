<template>
  <div class="category-entry-container">
    <div v-if="loading" class="data-loading" />
    <div class="category-entry-body">
      <div class="form-group">
        <label for="categoryname">نام</label>
        <input
          placeholder="enter category name"
          v-validate="'required'"
          name="name"
          v-model="categoryInfo.Name"
          @change="$event => onChangeHandler"
        />
      </div>
      <div class="form-group">
        <label for="categorytitle">عنوان</label>
        <input
          placeholder="عنوان را وارد نمایید"
          name="title"
          v-validate="'required'"
          v-model="categoryInfo.Title"
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
          v-model="categoryInfo.Description"
        />
      </div>
      <FileUploader title="تصویر" category="category" />

      <div class="form-group">
        <label for="imgcategory">آیا جدید است؟</label>
        <input type="checkbox" v-model="categoryInfo.IsNew" name="isnew" />
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
    cancelEventHandler: undefined,
    saveEventHandler: undefined
  },
  components: {
    FileUploader,
    GeneralBtn
  },
  created() {
    try {
      const categoryName = this.getCategoryName;
      if (this.ModeType === ModalMode.insert) {
        this.getEmptyCategoryData(this.courseName);
      } else {
        this.getCategoryData(categoryName);
      }
    } catch (e) {
      alert(e);
    }
  },
  data() {
    return {
      category: {}
    };
  },
  computed: {
    ...mapGetters({
      errormsg: "getCategoryError",
      loading: "getCategoryLoaded",
      categoryInfo: "getCategory",
      savingFlag: "getSaving"
    }),
    getCategoryName() {
      return this.$route.params.name;
    }
  },
  methods: {
    ...mapActions([
      "saveCategory",
      "getCategoryData",
      "getEmptyCategoryData",
      "deletecategory"
    ]),
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
      let newCat = this.categoryInfo;//this.category;
      newCat.Courseid = this.courseId;
      var returnValue = await this.saveCategory(newCat);

      if (returnValue == 1 && this.saveEventHandler !== undefined) {
        this.saveEventHandler(event, this.category, this.$refs.fileRef);
      }
    },
    DeleteItem() {
      if (confirm("آیا در حذف آیتم جاری مطمئن هستید؟")) {
        this.deletecategory(this.category.id).then(returnValue => {
          if (returnValue == 1 && this.saveEventHandler !== undefined) {
            this.saveEventHandler(event, this.category, this.$refs.fileRef);
          }
        });
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
