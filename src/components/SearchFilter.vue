<script setup>
import { defineProps, reactive } from "vue";
import { menuLinks } from "../helper/index";

const props = defineProps({
  isDark: Boolean,
  data: Array,
  selectedRegion: String,
});

const state = reactive({
  show: false,
  search: "",
});

const emit = defineEmits(["filterRegion", "inputChange"]);

const selectFilter = (selected) => {
  emit("filterRegion", selected);

  state.show = false;
};
const handleInputChange = () => {
  emit("inputChange", state.search);
};
</script>

<template>
  <div
    class="flex w-10/12 justify-between items-center mt-20 mb-20 xs:flex-col md:flex-row"
    :class="[isDark ? 'text-dark-text' : ' text-light-text']"
  >
    <div class="flex xs:w-full md:w-1/2 items-center relative">
      <input
        v-model="state.search"
        @input="handleInputChange"
        class="flex xs:w-full md:w-9/12 p-4 pl-14 rounded-lg shadow-lg"
        :class="[isDark ? 'bg-dark-element' : 'bg-light-element']"
        placeholder="Search for a country"
      />
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        size="sm"
        class="absolute w-16"
      />
    </div>
    <div
      class="flex xs:w-full md:w-1/2 xs:justify-center md:justify-end xs:mt-4 md:mt-0"
    >
      <div class="flex relative xs:w-full md:w-auto">
        <!-- Dropdown toggle button -->
        <button
          @click="state.show = !state.show"
          class="flex items-center xs:w-full md:w-auto xs:justify-center md:justify-start p-4 rounded-md shadow-md"
          :class="[isDark ? 'bg-dark-element' : 'bg-light-element']"
        >
          <span class="mr-4">Filter By Region</span>
          <font-awesome-icon icon="fa-solid fa-chevron-down" size="sm" />
        </button>
        <!-- Dropdown menu -->
        <div
          v-show="state.show"
          class="absolute right-0 py-2 xs:mt-12 md:mt-16 rounded-md shadow-xl xs:w-full md:w-44 z-10"
          :class="[isDark ? 'bg-dark-element' : 'bg-light-element']"
        >
          <div v-for="menuLink in menuLinks">
            <span
              @click="selectFilter(menuLink)"
              class="flex justify-between px-4 py-2 text-sm hover:text-bold hover:cursor-pointer"
              :class="[
                isDark
                  ? 'hover:bg-dark-background'
                  : 'hover:bg-light-background',
              ]"
            >
              {{ menuLink }}
              <div v-if="props.selectedRegion === menuLink">
                <font-awesome-icon icon="fa-solid fa-check" size="sm" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
