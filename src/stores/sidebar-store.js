import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    items: [
      {
        name: "Home",
        icon: "home",
      },
      {
        name: "Shorts",
        icon: "play_arrow",
      },
      {
        name: "Subs",
        icon: "subscriptions",
      },
      {
        name: "Music",
        icon: "play_circle",
      },
      {
        name: "You",
        icon: "person",
      },
    ],
  }),
  getters: {
    itemsSidebar: (state) => state.items,
  },
  actions: {},
});
