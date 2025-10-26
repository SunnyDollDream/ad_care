<template>
  <div class="main" ref="container">
    <ChatContainer :data="list" :height="height" :itemDefaultHeight="100"></ChatContainer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ChatContainer from '@/components/ChatContainer.vue'

const list = ref([])
for (let i = 0; i < 1000; i++) {
  list.value.push(i)
}

const container = ref(null)
const height = ref(0)

function updateHeight() {
  height.value = container.value.clientHeight
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  background-color: aqua;
}
</style>
