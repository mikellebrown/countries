<!-- TO DO: implement computed property -->

<script setup>
import { defineProps, ref, onMounted, reactive } from "vue";
import axios from "axios";
import { populationWithCommas } from "../helper";
import getCountryISO2 from "country-iso-3-to-2";
import CountryItemTemplate from "./CountryItemTemplate.vue";

const props = defineProps({
  id: String,
  isDark: Boolean,
});

const Country = reactive({ data: undefined, isLoading: false });

const lightText = ref("text-light-text");
const darkText = ref("text-dark-text");

onMounted(() => {
  getOneCountry();
});

const getOneCountry = async (countryCode) => {
  Country.isLoading = true;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/${
        countryCode ? `alpha/${countryCode}` : `name/${props.id}`
      }`
    );

    Country.data = response.data[0];
    Country.isLoading = false;
  } catch (error) {
    console.log(error);
  }
};

const convertCountryCode = (c) => {
  let alpha2 = getCountryISO2(c);
  let countryName = new Intl.DisplayNames(["en"], { type: "region" });
  return countryName.of(alpha2);
};
</script>

<template>
  <div class="flex justify-center items-center w-screen mt-20 flex-col">
    <div class="flex w-10/12 mt-20 mb-20">
      <router-link :to="{ path: `/` }">
        <button
          class="flex items-center px-6 py-4 text-lg rounded-md shadow-lg"
          :class="[
            props.isDark
              ? ['bg-dark-element', darkText]
              : ['bg-light-element', lightText],
          ]"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-left"
            size="sm"
            class="mr-4"
          />
          Back
        </button>
      </router-link>
    </div>
    <div v-if="Country.isLoading" class="animate-spin">
      <font-awesome-icon icon="fa-solid fa-spinner" size="xl" />
    </div>
    <div
      v-else-if="Country.data && !Country.isLoading"
      class="flex w-full justify-center"
    >
      <div class="flex w-10/12 justify-between xs:flex-col md:flex-row">
        <div class="flex xs:w-full md:w-1/2 justify-center">
          <img :src="Country.data.flags.svg" alt="" class="w-auto max-h-96" />
        </div>
        <div
          class="flex xs:w-full md:w-1/2 xs:justify-center md:justify-start flex-col"
        >
          <div class="flex w-full xs:pl-0 md:pl-20 xs:mt-20 md:mt-0">
            <span
              class="xs:text-2xl md:text-4xl font-semibold mb-6 leading-snug"
              :class="[isDark ? darkText : lightText]"
              >{{ Country.data.name.official }}</span
            >
          </div>
          <div class="flex w-full justify-between flex-row">
            <div class="flex w-1/2 flex-col xs:pl-0 md:pl-20">
              <CountryItemTemplate
                :data="Country.data.name.official"
                :is-dark="props.isDark"
              >
                <b>Common Name:</b> {{ Country.data.name.common }}
              </CountryItemTemplate>

              <CountryItemTemplate
                :data="Country.data.population"
                :is-dark="props.isDark"
              >
                <b>Population:</b>
                {{ populationWithCommas(Country.data.population) }}
              </CountryItemTemplate>

              <CountryItemTemplate
                :data="Country.data.region"
                :is-dark="props.isDark"
              >
                <b>Region:</b>
                {{ Country.data.region }}
              </CountryItemTemplate>

              <CountryItemTemplate
                :data="Country.data.subregion"
                :is-dark="props.isDark"
              >
                <b>Sub Region:</b>
                {{ Country.data.subregion }}
              </CountryItemTemplate>

              <span
                v-if="Country.data.capital"
                class="text-bold text-md"
                :class="[isDark ? darkText : lightText]"
                ><b>Capital:</b>
                {{ Country.data.capital[0] ?? Country.data.capital[0] }}
              </span>
              <span v-else></span>

              <span
                v-if="Country.data.borders"
                class="text-md mt-4 mb-6 font-bold"
                :class="[isDark ? darkText : lightText]"
              >
                Border Countries:
              </span>
            </div>
            <div class="flex flex-col w-1/2 pl-5">
              <CountryItemTemplate :is-dark="props.isDark">
                <b>Tld:</b>
                {{ Country.data.tld[0] }}
              </CountryItemTemplate>

              <span
                v-if="Country.data.currencies"
                class="text-md mb-2"
                :class="[isDark ? darkText : lightText]"
                ><b>Currencies: </b>
                <span v-for="currency in Country.data.currencies">{{
                  currency.name + " "
                }}</span>
              </span>
              <span
                v-if="Country.data.languages"
                class="text-md mb-2"
                :class="[isDark ? darkText : lightText]"
                ><b>Languages:</b>
                <span v-for="language in Country.data.languages" class="ml-1">{{
                  language + " "
                }}</span>
              </span>
            </div>
          </div>

          <div class="flex w-full flex-wrap xs:pl-0 md:pl-20 mb-10">
            <router-link
              v-for="(borderCountry, index) in Country.data.borders"
              :to="{
                path: `/country/${convertCountryCode(
                  borderCountry
                ).toLowerCase()}`,
              }"
            >
              <button
                @click="getOneCountry(borderCountry)"
                class="flex px-6 py-4 rounded-md shadow-lg mr-4 mb-2 mt-2"
                :class="[
                  props.isDark
                    ? ['bg-dark-element', darkText]
                    : ['bg-light-element', lightText],
                ]"
                :key="index"
              >
                {{ convertCountryCode(borderCountry) }}
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
