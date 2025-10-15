<template>
  <div class="item" @click="$router.push(props.url)">
    <div class="icon">
      <img :src="imageUrl" alt="" />
    </div>
    <div class="text">
      {{ text }}
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})

const imageUrl = computed(() => {
  if (props.image && props.image.startsWith('../')) {
    try {
      return new URL(props.image, import.meta.url).href
    } catch (e) {
      console.error('图片路径解析错误:', e)
      return props.image
    }
  }
  return props.image
})
</script>

<style lang="less" scoped>
.item {
  box-sizing: border-box;
  transition: all 0.3s;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.7);
  }
  border-radius: 20px;
  box-shadow: 0 0 5px gray;
  // height: 100%;
  width: 100%;
  display: flex;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
  .icon {
    padding: 15px;
    width: 20%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
  }
}
</style>
