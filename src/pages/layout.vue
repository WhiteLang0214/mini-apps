<template>
  <el-container class="layout-container">
    <el-container>
      <el-main class="layout-main">
        <div
          class="router-container custom-loading-svg"
          v-loading="setLoading"
          :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
        >
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="js" setup name="Layout">
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;

const setLoading = computed(() => store.getters.getRouterViewLoading);
</script>
<style scoped>
.layout-container {
  height: 100%;
  background-color: #f2f2f5;
  flex-direction: column;
}

.layout-container .el-menu {
  height: 100%;
}

.layout-container .el-container {
  height: 100%;
  overflow-y: auto;
}
.el-aside {
  width: auto;
}

.layout-main {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.router-container {
  flex: 1;
  overflow: auto;
}
</style>
