<template>
  <div
    ref="containerRef"
    @scroll="onScroll"
    :style="{
      height: `${props.height}px`,
      overflowY: 'auto',
    }"
  >
    <div
      :style="{
        height: `${totalHeight}px`,
        position: 'relative',
      }"
    >
      <div
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${offsetY}px)`,
        }"
      >
        <!-- <div v-for="item in visibleItems" :key="item.id" :ref="(el) => setHeight(el, item.id)"> -->
        <div v-for="item in visibleItems" :key="item.id" ref="itemsRef" :id="item.id">
          <MsgItem :msg="item" :icon="icon"></MsgItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUpdated, onMounted, watch } from 'vue'
import MsgItem from './MsgItem.vue'

const props = defineProps({
  data: Array, // 数据数组
  height: Number, // 容器高度
  itemDefaultHeight: Number, // 每项默认高度
})

const containerRef = ref(null)
const itemsRef = ref([])
const scrollTop = ref(0)

// 为每项设置默认高度
const itemHeights = ref(new Array(props.data.length))
itemHeights.value.fill(props.itemDefaultHeight)
// 记录每项的实际高度（首次渲染时更新）

// function setHeight(el, i) {
//   if (el) {
//     requestAnimationFrame(() => {
//       const temp = el.getBoundingClientRect().height
//       if (temp > itemHeights.value[i]) {
//         itemHeights.value[i] = el.getBoundingClientRect().height
//       }
//     })
//   }
// }

watch(props.data, () => {
  while (props.data.length > itemHeights.value.length) {
    itemHeights.value.push(props.itemDefaultHeight)
  }
  containerRef.value.scrollTo({ top: containerRef.value.scrollHeight, behavior: 'smooth' })
})

onUpdated(() => {
  itemsRef.value.forEach((node) => {
    const height = node.getBoundingClientRect().height
    const i = +node.id
    if (height !== itemHeights.value[i]) {
      itemHeights.value[i] = height
    }
  })
})

const icon = 'https://image.acg.lol/file/2025/09/17/AI.png'

// 计算总高度（第二层容器的高度）
// const totalHeight = props.data.length * props.itemDefaultHeight
const totalHeight = computed(() => {
  let height = 0
  for (let i = 0; i < itemHeights.value.length; i++) {
    height += itemHeights.value[i]
  }
  return height
})
// 计算可见区域（第三层容器）的起始和结束索引
// const startIndex = computed(() => Math.floor(scrollTop.value / props.itemDefaultHeight))
const startIndex = computed(() => {
  let temp = 0
  for (let i = 0; i < itemHeights.value.length; i++) {
    let itemHeight = itemHeights.value[i] || props.itemDefaultHeight
    if (temp + itemHeight > scrollTop.value) {
      return i
    }
    temp += itemHeight
  }
  return Math.max(0, props.data.length - 1)
})
// const endIndex = computed(() =>
//   Math.min(
//     startIndex.value + Math.ceil(props.height / props.itemDefaultHeight),
//     props.data.length - 1,
//   ),
// )
const endIndex = computed(() => {
  let temp = 0
  for (let i = 0; i < props.data.length; i++) {
    let itemHeight = itemHeights.value[i] || props.itemDefaultHeight
    if (temp + itemHeight >= scrollTop.value + props.height) {
      return i
    }
    temp += itemHeight
  }
  return props.data.length - 1
})

// 计算偏移量
// const offsetY = computed(() => startIndex.value * props.itemDefaultHeight)
const offsetY = computed(() => {
  let res = 0
  for (let i = 0; i < startIndex.value; i++) {
    res += itemHeights.value[i]
  }
  return res
})

// 生成可见项目列表
const visibleItems = computed(() => {
  const ret = []
  for (let i = startIndex.value; i <= endIndex.value; i++) {
    ret.push(props.data[i])
  }
  return ret
})

function onScroll() {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
}

onMounted(() => {
  containerRef.value.scrollTop = containerRef.value.scrollHeight
  setTimeout(() => {
    containerRef.value.scrollTo({ top: containerRef.value.scrollHeight, behavior: 'smooth' })
  }, 0)
})
</script>

<style lang="less" scoped></style>
