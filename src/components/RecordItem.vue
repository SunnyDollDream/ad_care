<template>
  <div class="record">
    <div class="icon">
      <img src="@\assets\DoctorPage\patientList\writeCase.svg" alt="" />
    </div>
    <div class="name">{{ record.patient_name }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  record: Object,
})
console.log(props.record)
</script>

<style lang="less" scoped>
.record {
  width: 25%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .icon {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 70%;
    }
  }

  .name {
    text-align: center;
  }
}
</style>
