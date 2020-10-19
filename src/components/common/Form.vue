<!-- 
  Generic Form creator class. With given items that has a type of {
    key: string,
    sortable: boolean,
    type: string,
    placeholder: string,
    range: { min: number, max: number },
  }

  With taking key as a field name, it's creating inputs

-->
<template>
  <div>
    <b-form @submit="onSubmit" validated>
      <b-form-group
        v-for="formItem in items"
        :key="formItem.id"
        :label="formItem.label"
        :label-for="formItem.id"
        :description="formItem.description"
      >
        <!-- Generate form inputs from items-->
        <b-form-input
          :id="formItem.id"
          :type="formItem.type"
          v-model="formItem.item"
          required
          :placeholder="formItem.placeholder"
          :max="formItem.range ? formItem.range.max : null"
          :min="formItem.range ? formItem.range.min : null"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "Form",
  data() {
    return {
      // Bind items to form items and bind item field to form element.
      formItems: this.items.map(ele => {
        ele["item"] = null;
        return ele;
      })
    };
  },
  props: {
    items: Array
  },
  methods: {
    onSubmit: function(e) {
      // Prevent the page refreshing every time we submit the data.
      e.preventDefault();
      // Create form object from element's key.
      const form = {};
      this.formItems.forEach(ele => {
        // TODO: More type can be added and also we should remove it in here and added to a util class.
        form[ele.key] = ele.type === "number" ? parseInt(ele.item) : ele.item;
      });
      // Call onSubmit emitted function
      this.$emit("onSubmit", form);
    }
  }
};
</script>

<style scoped></style>
