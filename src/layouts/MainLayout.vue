<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-white text-black q-pa-sm scroll-indicator"
      :class="{ hidden: scrollingDown, visible: !scrollingDown }"
      :bordered="isMobile"
      :elevated="isMobile"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          v-if="!isMobile"
        />

        <img
          src="../assets//youtube-icon.webp"
          height="30px"
          class="cursor-pointer"
        />

        <q-space />
        <q-input
          dense
          rounded
          outlined
          v-model="searchBox"
          label="Search"
          style="width: 500px"
          @focus="isInputActive = true"
          @blur="isInputActive = false"
        >
          <template v-slot:prepend>
            <q-icon name="search" v-if="isInputActive" />
          </template>
          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>

        <q-btn round color="black" icon="mic" flat v-if="!isMobile">
          <q-tooltip class="bg-grey-8" :offset="[10, 10]">
            Search with your voice
          </q-tooltip>
        </q-btn>
        <q-space />

        <q-btn
          round
          color="black"
          icon="videocam"
          flat
          class="q-mr-md"
          v-if="!isMobile"
        >
          <q-tooltip class="bg-grey-8" :offset="[10, 10]"> Create </q-tooltip>
        </q-btn>
        <q-btn
          round
          color="black"
          icon="notifications"
          flat
          class="q-mr-md"
          v-if="!isMobile"
        >
          <q-tooltip class="bg-grey-8" :offset="[10, 10]">
            Notifications
          </q-tooltip>
        </q-btn>
        <q-btn round flat class="q-ml-sm">
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="showDrawer"
      show-if-above
      :mini="miniState"
      side="left"
      :mini-width="85"
      :width="200"
      class="bg-white"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <template v-for="item in itemsSidebar" :key="item.name">
            <q-item clickable v-ripple>
              <q-item-section avatar class="items-center">
                <q-icon :name="item.icon" />
                <span v-if="miniState">{{ item.name }}</span>
              </q-item-section>
              <q-item-section>
                <span>{{ item.name }}</span>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-black" v-if="isMobile">
      <q-tabs no-caps indicator-color="transparent" v-model="tab">
        <template v-for="item in itemsSidebar" :key="item.name">
          <q-tab name="images" :label="item.name" :icon="item.icon" />
        </template>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useSidebarStore } from "src/stores/sidebar-store";
import { useQuasar } from "quasar";

const $q = useQuasar();
const miniState = ref(true);
const searchBox = ref("");
const isInputActive = ref(false);
const showDrawer = ref(false);
const lastScrollTop = ref(0);
const scrollingDown = ref(false);
const isMobile = useQuasar().platform.is.mobile;
const sidebarStore = useSidebarStore();

const itemsSidebar = computed(() => sidebarStore.itemsSidebar);

function handleScroll() {
  if ($q.screen.lt.md) {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    scrollingDown.value = st > lastScrollTop.value;
    lastScrollTop.value = st <= 0 ? 0 : st;
  }
}

function toggleLeftDrawer() {
  miniState.value = !miniState.value;
  if ($q.screen.lt.md) {
    miniState.value = false;
    showDrawer.value = !showDrawer.value;
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>
