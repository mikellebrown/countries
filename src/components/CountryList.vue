<script>
import axios from "axios";
import SearchFilter from "./SearchFilter.vue";
import CountryTemplate from "./CountryTemplate.vue";

export default {
  name: "CountryList",
  components: {
    CountryTemplate,
    SearchFilter,
  },
  props: { isDark: Boolean },
  data() {
    return {
      countries: [],
      filteredCountries: [],
      searchedCountries: [],
      selectedRegion: "All Countries",
      input: "",
      isLoading: false,
      error: false,
    };
  },
  created() {
    this.getCountries();
  },

  methods: {
    async getCountries() {
      this.isLoading = true;
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        this.countries = response.data.filter((c) => c.population > 0);
        this.countries = response.data;
        this.isLoading = false;
      } catch (e) {
        this.error = e;
        console.log(e);
      }
    },

    alphabeticalOrder(countries) {
      return countries.sort(function (a, b) {
        return a.name.common === b.name.common
          ? 0
          : a.name.common < b.name.common
          ? -1
          : 1;
      });
    },

    filterCountries(region) {
      this.selectedRegion = region;
      this.input = "";
      this.searchedCountries = [];
      const filtered = this.countries.filter((c) => c.region === region);
      this.filteredCountries = filtered;
    },
    searchCountries(input) {
      this.selectedRegion = "All Countries";
      this.filteredCountries = [];
      this.input = input.toLowerCase();
      const search = this.countries.filter((c) =>
        c.name.common.toLowerCase().includes(this.input)
      );
      this.searchedCountries = search;
    },
  },

  computed: {
    displayCountries() {
      if (this.countries.length > 0) {
        if (
          this.searchedCountries.length > 0 ||
          this.filteredCountries.length > 0
        ) {
          return this.searchedCountries.length > 0
            ? this.searchedCountries
            : this.filteredCountries;
        }
        if (
          this.selectedRegion === "All Countries" &&
          !this.searchedCountries > 0
        ) {
          return this.alphabeticalOrder(this.countries);
        } else return this.alphabeticalOrder(this.countries);
      }
    },
  },
};
</script>

<template>
  <div class="flex w-screen justify-center items-center flex-col mt-20 mb-20">
    <SearchFilter
      :is-dark="isDark"
      :data="countries"
      :selected-region="selectedRegion"
      @filter-region="filterCountries"
      @input-change="searchCountries"
    />
    <div v-if="isLoading" class="animate-spin">
      <font-awesome-icon icon="fa-solid fa-spinner" size="xl" />
    </div>
    <div
      v-else-if="error"
      :class="[isDark ? 'text-dark-text' : 'text-light-text']"
    >
      Whoops, something went wrong. Check back soon 🤟🏻
    </div>
    <div
      v-else
      class="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-inherit w-10/12 overflow-x-hidden"
    >
      <div
        v-for="(country, index) in displayCountries"
        class="flex justify-center w-full"
        :key="index"
      >
        <CountryTemplate :id="index" :is-dark="isDark" :data="country" />
      </div>
    </div>
  </div>
</template>
