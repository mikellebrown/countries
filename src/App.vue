<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div
    class="flex w-full min-h-screen flex-col items-center overflow-x-hidden scrollbar-hide"
    :class="[isDark ? 'bg-dark-background' : 'bg-light-background']"
  >
    <div
      class="flex w-full justify-center fixed top-0 z-10"
      :class="[isDark ? 'bg-dark-element' : 'bg-light-element']"
    >
      <div
        class="flex w-10/12 flex-row justify-between items-center screen bg-inherit"
      >
        <router-link to="/">
          <span
            class="xs:text-lg md:text-2xl text-light-text font-semibold"
            :class="{ [`text-dark-text`]: isDark }"
            >Where in the world?</span
          >
        </router-link>
        <button
          @click="toggleDark()"
          class="flex justify-between items-center text-light-text m-6 mr-0"
          :class="{ [`text-dark-text`]: isDark }"
        >
          <font-awesome-icon icon="fa-solid fa-moon" size="sm" class="mr-2" />
          {{ isDark ? "Light Mode" : "Dark Mode" }}
        </button>
      </div>
    </div>
    <div class="flex justify-center w-screen bg-inherit">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component" :is-dark="isDark" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
