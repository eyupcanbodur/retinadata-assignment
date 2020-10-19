<!-- 
  This component is responsible for adding and creating the table 
  Basically a wrapper. Does not have anything special.
-->
<template>
  <b-container>
    <b-row>
      <b-col class="title" cols="8">
        <p>{{ tableTitle }}</p>
      </b-col>
      <b-col>
        <AddItemWrapper
          :formTitle="'New ' + tableTitle"
          :buttonTitle="'+'"
          :formItems="columns"
          :disable="disable"
          squared
          @onAdd="onAddNewItem"
        />
      </b-col>
    </b-row>
    <b-table
      hover
      sort-icon-left
      :items="data"
      :fields="columns"
      :show-empty="showEmpty"
      :selectable="selectable"
      :select-mode="selectMode"
      :responsive="responsive"
      :head-variant="headVariant"
      :small="small"
      :borderless="borderless"
      :selected-variant="selectedVariant"
      :empty-text="emptyViewText"
      @row-selected="onSelect"
    />
  </b-container>
</template>

<script>
import {
  defaultStringProp,
  defaultArrayProp,
  defaultFunctionProp,
  defaultBooleanProp
} from "../../utils/DefaultPropsUtil";
import AddItemWrapper from "./AddItemWrapper.vue";

// Seperate b-table properties from component's data for the sake of readibility
const tableProperties = {
  bordered: false,
  borderless: false,
  outlined: false,
  small: true,
  fixed: false,
  footClone: false,
  headVariant: "dark",
  showEmpty: true,
  responsive: true,
  selectMode: "single",
  selectedVariant: "primary"
};

export default {
  name: "TableWrapper",
  props: {
    tableTitle: defaultStringProp("DummyTitle", false),
    data: defaultArrayProp([], true),
    columns: Array,
    disable: Boolean,
    emptyViewText: defaultStringProp("There are no items to show", false),
    onAddNewItem: Function,
    onSelect: defaultFunctionProp(null, false),
    selectable: defaultBooleanProp(false, false)
  },
  data() {
    return {
      ...tableProperties
    };
  },
  components: {
    AddItemWrapper
  }
};
</script>

<style lang="sass" scoped>
.title
  display: flex
  align-items: center
  justify-content: flex-start
  font-size: 18px
</style>
