<template>
  <div class="show-modal-container">
    <b-modal
      :no-close-on-backdrop="true"
      ref="modalObj"
      :title="modalTitle"
      ok-title="تایید"
      cancel-title="انصراف"
      header-close-label="انصراف و بستن"
      :hide-footer="true"
      role="modal"

    >
      <div class="show-modal-body">
        <slot />
      </div>
      <!-- <div class="show-modal-btns-part ">
        <GeneralBtn text="انصراف" :saving="2" :clickHandler="CancelEvant" />
        <GeneralBtn
          text="ثبت"
          :saving="savingFlag"
          :clickHandler="saveHandler"
        />
      </div> -->
    </b-modal>
  </div>
</template>

<script>
import { ModalMode } from "../../classes/Enums";
export default {
  name: "modal",
  props: {
    savingFlag: Number,
    saveEventHandler: {
      type: Function,
      default: undefined
    },
    CancelEvantHandler: {
      type: Function,
      default: undefined
    },
    InitHandler: {
      type: Function,
      default: undefined
    },
    modalTitle:String,
    ModeType: String
  },
  data() {
    return {
      selectedRow: undefined,
      ModifierMode: ModalMode.insert
    };
  },
  methods: {
    showModal() {
      this.$refs.modalObj.show();
    },
    hideModal() {
      this.$refs.modalObj.hide();
    },
    saveHandler() {
      /*
      if (this.InitHandler !== undefined || this.InitHandler !== null) {
        this.InitHandler();
      }
      */
      if (
        this.saveEventHandler != undefined &&
        this.saveEventHandler !== null
      ) {
        this.saveEventHandler(this.ModifierMode);
      }
      this.$refs.modalObj.show();
    },
    CancelEvant() {
      if (
        this.CancelEvantHandler !== undefined &&
        this.CancelEvantHandler !== null
      ) {
        this.CancelEvantHandler();
      }
      this.$refs.modalObj.hide();
    }
  }
};
</script>

<style lang="scss">
.show-modal-container {
  width: 50%;
  min-width: 500px;
  direction: rtl;
  text-align: center;
  .show-modal-body {
    width: 100%;
  }
  .show-modal-btns-part {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 4px;
    overflow: hidden;
    clear: both;
    position: relative;
  }

  .modal-body {
    text-align: center;
  }
}
</style>
