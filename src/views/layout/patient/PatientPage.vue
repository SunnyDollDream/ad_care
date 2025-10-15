<template>
  <div class="main">
    <div class="left">
      <div class="header">
        <div class="title">问诊列表</div>
        <img src="@\assets\DoctorPage\doctor.svg" alt="" />
      </div>
      <div class="list">
        <div class="button" v-for="user in users" :key="user.uid">
          <ChatItem
            :icon="user.icon"
            :name="user.name"
            @click="$router.push(`/patient/chat?id=${user.uid}`)"
            >{{ lastMsg(user.id).time.slice(9) }}</ChatItem
          >
        </div>
      </div>
    </div>
    <div class="right">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChatItem from '@/components/ChatItem.vue'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()

const users = chatStore.users

// onBeforeMount(async () => {
//   //如果本地有记录则不从服务器同步历史对话人
//   if (users.length !== 0) return
//   const {
//     data: { data },
//   } = await chatGetHistoryPatientService()
//   data.forEach(({ uid, index }) => {
//     const user = { uid, name: `未知用户${index}`, icon: '' }
//     if (!users.some((item) => item.uid === user.uid)) {
//       chatStore.addUser(user)
//     }
//   })
// })

const lastMsg = computed(() => {
  return (uid) => {
    return chatStore.historyMsg.findLast((item) => item.form_id === uid || item.to_id === uid)
  }
})
</script>

<style lang="less" scoped>

.main {
  width: 100%;
  height: 100vh;
  display: flex;

  .left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #dadff8;

    .header {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-evenly;
      box-sizing: border-box;
      padding: 3% 0;

      .title {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: larger;
      }
    }

    .list {
      border-radius: 20px 20px 0 0;
      background-color: #fcfcfc;
      width: 100%;
      // height: 80%;
      flex: 1;

      overflow: auto;

      .button {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;

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

          .left-cont {
            width: 50%;
            height: 100%;
            display: flex;
            // justify-content: left;
            align-items: center;

            .image {
              height: 60%;
              aspect-ratio: 1/1;
              background-image: url('../../../assets/doctorpic/3.jpeg');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              border-radius: 100%;
              margin-right: 10%;
            }
          }
        }
      }
    }
  }

  .right {
    width: 50%;
    height: 100%;
  }
}
</style>
