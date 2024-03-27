<template>
  <q-page>
    <div class="row q-col-gutter-md q-pa-md">
      <template v-for="video in videosHome" :key="video.title">
        <div :class="isMobile ? 'col-12' : 'col-12 col-sm-6 col-md-4 col-lg-3'">
          <q-card flat class="home-video__card cursor-pointer">
            <img :src="video.videoImage" style="border-radius: 10px" />

            <q-card-section class="q-px-none">
              <div class="row">
                <div class="col-auto q-mr-sm">
                  <q-avatar size="40px">
                    <img :src="video.userIcon" />
                  </q-avatar>
                </div>
                <div class="col-10">
                  <div class="text-h6">{{ video.title }}</div>
                  <div class="text-muted">{{ video.userName }}</div>
                  <div class="text-muted">
                    {{ video.views }} views · {{ video.uploadDate }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { useVideosStore } from "src/stores/videos-store";
import { computed } from "vue";
import { useQuasar } from "quasar";

const isMobile = useQuasar().platform.is.mobile;

const videosStore = useVideosStore();

const videosHome = computed(() => videosStore.videosHome);
</script>

<style scoped>
.home-video__card img {
  max-height: 189px;
  object-fit: cover;
  background-position: 50%;
}
</style>
