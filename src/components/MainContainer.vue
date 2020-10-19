<template>
  <b-container fluid>
    <div v-if="$apollo.loading" class="text-center">
      <b-spinner
        style="width: 3rem; height: 3rem;"
        variant="primary"
        label="Text Centered"
      ></b-spinner>
    </div>
    <b-row v-else>
      <b-col>
        <TableWrapper
          tableTitle="Company"
          :data="companies"
          :columns="getCompanyColumns()"
          title="Companies"
          :onSelect="onCompanySelect"
          :onAddNewItem="onAddNewCompany"
          :selectable="true"
          emptyViewText="There are no companies. You can add it from Add New Company"
        />
      </b-col>
      <b-col>
        <TableWrapper
          tableTitle="Office"
          :data="selectedCompany ? selectedCompany.offices : []"
          :columns="getOfficeColumns()"
          :disable="!selectedCompany"
          title="Offices"
          :onAddNewItem="onAddNewOffice"
          emptyViewText="Please select a company or add a new office to selected company"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableWrapper from "./common/TableWrapper";
import { CompanyColumns, OfficeColumns } from "../constants/Columns";
import * as QueryManager from "../constants/Queries";

export default {
  data() {
    // Define state data
    return {
      selectedCompany: null,
      companies: []
    };
  },
  components: {
    TableWrapper
  },
  methods: {
    // Call it when a company selected from the table
    onCompanySelect: function(company) {
      this.selectedCompany = company[0];
    },
    // Call it when a new company added
    onAddNewCompany: function(company) {
      // Add and empty office array
      company.offices = [];
      this.$apollo
        .mutate(QueryManager.addCompany(company))
        .then(res => {
          // Set returned id to company,
          company["id"] = res.data.add_company.id;
          // Update the state
          this.companies.push(company);
        })
        .catch(e => console.log(e));
    },
    onAddNewOffice: function(office) {
      if (this.selectedCompany) {
        // Set office's company id to selected company
        office["company"] = this.selectedCompany.id;
        this.$apollo
          .mutate(QueryManager.addOffice(office))
          .then(res => {
            // Set returned id to company,
            office["id"] = res.data.add_office.id;
            // Update the state
            this.selectedCompany.offices.push(office);
          })
          .catch(e => console.log(e));
      }
    },
    // Functions for getting imported Columns. We cannot use imported things directly to template. So i have ot.
    getOfficeColumns: () => OfficeColumns,
    getCompanyColumns: () => CompanyColumns
  },
  // Get all companies at the beginnig of the component.
  apollo: {
    companies: QueryManager.GET_ALL_COMPANIES
  }
};
</script>
