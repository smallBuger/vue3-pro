<template>
  <div class="virtual-list" ref="virtualList" >
    <div class="virtual-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="virtual-list-content" :style="{transform: `translate3d(0, ${offset}px, 0)` }">
      <div
        v-for="item in visibleData"
        :key="item.id"
        class="item"
        :ref="(el) => setItemRef(el, item.id)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
interface ListItem {
  id: number | string;
  text: string;
}

const visibleCount = 10; // 可视区域显示的数量
const visibleItems = ref<ListItem[]>(
  Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` })));
const virtualList = ref<HTMLElement | null>(null);
const start = ref(0);
const end = ref(visibleCount);
const offset = ref(0);

// 存储每个项目的实际高度
const itemHeights = ref<Map<number | string, number>>(new Map());
const defaultItemHeight = 50; // 默认高度

// 获取项目的高度
const getItemHeight = (id: number | string) => {
  return itemHeights.value.get(id) || defaultItemHeight;
};

// 设置项目引用并测量高度
const setItemRef = (el: HTMLElement | null, id: number | string) => {
  if (el) {
    const height = el.getBoundingClientRect().height;
    itemHeights.value.set(id, height);
  }
};

// 列表总高度
const listHeight = computed(() => {
  return visibleItems.value.reduce((total, item) => {
    return total + getItemHeight(item.id);
  }, 0);
});

// 当前可见数据
const visibleData = computed(() => {
  return visibleItems.value.slice(start.value, end.value);
});

// 滚动事件处理
const handleScroll = () => {
  if (!virtualList.value) return;
  const scrollTop = virtualList.value.scrollTop;

  let currentHeight = 0;
  let startIndex = 0;

  // 找到开始索引
  for (let i = 0; i < visibleItems.value.length; i++) {
    const height = getItemHeight(visibleItems.value[i].id);
    if (currentHeight + height > scrollTop) {
      startIndex = i;
      break;
    }
    currentHeight += height;
  }

  start.value = startIndex;
  end.value = start.value + visibleCount;
  offset.value = currentHeight;
};

onMounted(() => {
  virtualList.value?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  virtualList.value?.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.virtual-list {
  height: 500px;
  overflow-y: auto;
  position: relative;
}

.virtual-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}
</style>
