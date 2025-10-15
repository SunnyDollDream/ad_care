<template>
  <div class="inner">
    <div class="left">
      <div class="image" :style="{ backgroundImage: `url(${icon})` }"></div>
      <div>{{ name }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>

// const props = defineProps({
//   icon: {
//     type: String,
//     default: '',
//   },
//   name: {
//     type: String,
//     default: '患者',
//   },
// })

// const iconUrl = computed(() => {
//   if (props.icon && props.icon.startsWith('../')) {
//     try {
//       return new URL(props.icon, import.meta.url).href
//     } catch (e) {
//       console.error('图片路径解析错误:', e)
//       return props.icon
//     }
//   }
//   return props.icon
// })

// const iconUrl = computed(() => {
//   if (!props.icon) return ''

//   try {
//     // 判断是否是带@的路径
//     if (props.icon.startsWith('@/')) {
//       // 对于带@的路径，使用动态导入方式解析
//       // 注意：这种方式只适用于静态资源
//       const pathWithoutAt = props.icon.slice(1) // 移除@符号
//       return new URL(pathWithoutAt, import.meta.url).href
//     }
//     // 对于相对路径，直接使用import.meta.url解析
//     else if (props.icon.startsWith('../') || props.icon.startsWith('./')) {
//       return new URL(props.icon, import.meta.url).href
//     }

//     return props.icon
//   } catch (e) {
//     console.error('图片路径解析错误:', e)
//     return props.icon
//   }
// })

// const iconUrl = computed(() => {
//   if (!props.icon) return ''

//   try {
//     // 1. 优先检查是否是完整的HTTP/HTTPS URL
//     if (props.icon.startsWith('http://') || props.icon.startsWith('https://')) {
//       return props.icon
//     }
//     // 2. 检查是否是带@的路径
//     else if (props.icon.startsWith('@/')) {
//       const pathWithoutAt = props.icon.slice(1) // 移除@符号
//       return new URL(pathWithoutAt, import.meta.url).href
//     }
//     // 3. 检查是否是相对路径
//     else if (props.icon.startsWith('../') || props.icon.startsWith('./')) {
//       return new URL(props.icon, import.meta.url).href
//     }

//     // 4. 默认返回原路径
//     return props.icon
//   } catch (e) {
//     console.error('图片路径解析错误:', e)
//     return props.icon
//   }
// })
</script>

<style lang="less" scoped>
.inner {
  width: 90%;
  height: 90%;
  border-radius: 20px;
  box-shadow: 0 0 2px;
  background-color: white;
  transition: all 0.3s;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

  display: flex;
  justify-content: space-around;
  align-items: center;

  .left {
    display: flex;
    width: 50%;
    height: 100%;
    align-items: center;

    .image {
      height: 60%;
      aspect-ratio: 1/1;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 100%;
      margin-right: 10%;
    }
  }
}
</style>
