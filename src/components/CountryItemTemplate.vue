<script setup>
import { defineProps } from "vue";

const props = defineProps({
  isDark: Boolean,
  data: String,
});
</script>

<template>
  <span
    :v-show="props.data"
    class="text-md mb-2"
    :class="[props.isDark ? 'text-dark-text' : 'text-light-text']"
    ><slot></slot
  ></span>
</template>
