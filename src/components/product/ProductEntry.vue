<template>
  <div class="product-entry-container">
    <div v-if="loading" class="data-loading" />
    <div class="product-entry-body">
      <div class="form-group">
        <label for="productname">نام</label>
        <input
          placeholder="enter product name"
          v-validate="'required'"
          name="name"
          v-model="product.Name"
          @change="$event => onChangeHandler"
        />
      </div>
      <div class="form-group">
        <label for="producttitle">عنوان</label>
        <input
          placeholder="عنوان را وارد نمایید"
          name="title"
          v-validate="'required'"
          v-model="product.Title"
        />
      </div>
      <div class="form-group">
        <label for="introInfo">اطلاعات اولیه</label>
        <textarea
          rows="5"
          cols="50"
          placeholder="اطلاعات اولیه را وارد نمایید"
          name="introInfo"
          v-validate="'required'"
          v-model="product.Description"
        />
      </div>
      <FileUploader
        title="تصویر"
        category="product"
        v-model="product.ImageUrl"
      />
      <div class="form-group">
        <label for="imgProduct">آیا جدید است؟</label>
        <input type="checkbox" :checked="product.IsNew" name="isnew" />
      </div>
      <div class="form-group btn-bar">
        <GeneralBtn
          text="ثبت"
          :saving="savingFlag"
          :clickHandler="clickEventHandler"
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
  name: "ProductEntry",
  props: {
    productname: String,
    ModeType: String,
    cancelEventHandler: undefined,
    saveEventHandler: undefined
  },
  components: {
    FileUploader,
    GeneralBtn
  },
  created() {
    this.getProductData(this.productname);
  },
  computed: {
    ...mapGetters({
      errormsg: "getProductError",
      loading: "getProductLoaded",
      product: "getProduct",
      savingFlag: "getSaving"
    })
  },
  methods: {
    ...mapActions(["saveProduct", "getProductData", "deleteProduct"]),
    clickEventHandler() {
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
      const returnValue = await this.saveProduct(
        this.product,
        this.$refs.fileRef
      );
      if (returnValue >= 1 && this.saveEventHandler !== undefined) {
        this.saveEventHandler(event, this.product, this.$refs.fileRef);
      }
    },
    DeleteItem() {
      if (confirm("آیا در حذف آیتم جاری مطمئن هستید؟")) {
        this.deleteProduct(this.product.Id).then(returnValue => {
          if (returnValue == 1 && this.saveEventHandler !== undefined) {
            this.saveEventHandler(event, this.product, this.$refs.fileRef);
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
