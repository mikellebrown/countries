<script setup>
import { defineProps, ref } from "vue";
import { populationWithCommas } from "../helper/index";

const props = defineProps({
  id: Number,
  isDark: Boolean,
  data: Object,
});

const lightElement = ref("bg-light-element");
const lightText = ref("text-light-text");
const darkElement = ref("bg-dark-element");
const darkText = ref("text-dark-text");
</script>

<template>
  <router-link
    :to="{ path: `/country/${data.name.common.toLowerCase()}` }"
    class="w-full"
  >
    <div
      class="flex w-full h-72 2xl:h-96 flex-col justify-between rounded-md shadow-md hover:focus-within"
      :class="[isDark ? darkElement : lightElement]"
    >
      <img
        :src="data.flags.svg"
        alt="{{  data.name.common }}"
        class="flex object-cover h-1/2 rounded-t-md shadow-sm"
      />
      <div class="flex w-full h-1/2 flex-col justify-center ml-5 mr-2">
        <span
          class="font-semibold text-xl mb-2 w-11/12"
          :class="[isDark ? darkText : lightText]"
          >{{ data.name.common }}</span
        >
        <span class="text-bold text-md" :class="[isDark ? darkText : lightText]"
          ><b>Population:</b> {{ populationWithCommas(data.population) }}</span
        >
        <span class="text-bold text-md" :class="[isDark ? darkText : lightText]"
          ><b>Region:</b> {{ data.region }}</span
        >
        <span
          v-if="data.capital"
          class="text-bold text-md"
          :class="[isDark ? darkText : lightText]"
          ><b>Capital:</b> {{ data.capital[0] ?? data.capital[0] }}
        </span>
        <span v-else></span>
      </div>
    </div>
  </router-link>
</template>
