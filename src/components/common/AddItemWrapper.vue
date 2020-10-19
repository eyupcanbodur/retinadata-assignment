<!-- 
  This component is responsible for creating new elements from modal.
  It wraps modal with a form that creates generic form inputs 
  and finally the add button itself on the top of the table
-->
<template>
  <div id="add-item-wrapper">
    <!-- Create a scrollable modal with a form body -->
    <b-modal
      :id="id"
      ref="modal"
      hide-footer
      :title="formTitle"
      :no-close-on-backdrop="noCloseOnBackDrop"
      header-class="header"
      @hidden="afterHide"
      scrollable
    >
      <Form :items="formItems" @onSubmit="onSubmit" />
    </b-modal>

    <!--  Creatre add button on top of the right side-->
    <b-button
      variant="primary"
      class="add-button float-right"
      size="sm"
      :disabled="disable"
      @click="buttonClicked"
      ><b-icon icon="plus" /> {{ formTitle }}</b-button
    >
  </div>
</template>

<script>
import {
  defaultArrayProp,
  defaultStringProp,
  defaultBooleanProp
} from "../../utils/DefaultPropsUtil";
import Form from "./Form";

const modalProps = {
  noCloseOnBackDrop: true
};

export default {
  name: "AddItemWrapper",
  props: {
    id: defaultStringProp((Math.random() * 100).toFixed().toString(), false),
    formTitle: defaultStringProp("New Item", true),
    buttonTitle: defaultStringProp("Add Item", true),
    formItems: defaultArrayProp([], true),
    disable: defaultBooleanProp(false, false)
  },
  methods: {
    // Show the modal
    show: function() {
      this.$refs["modal"].show();
    },
    // Hide the modal
    hide: function() {
      this.$refs["modal"].hide();
    },
    buttonClicked: function() {
      this.show();
    },
    // Emit a function when onSubmit clicked.
    onSubmit: function(form) {
      this.$emit("onAdd", form);
      this.hide();
    },
    afterHide: function() {
      // Nothing
    }
  },
  data() {
    return {
      items: this.formItems,
      ...modalProps
    };
  },
  components: {
    Form
  }
};
</script>

<style lang="css" scoped>
.header {
  padding: 5px 10px;
}
/* Change cursor when buttons disabled */
button:disabled {
  cursor: not-allowed;
}
</style>
