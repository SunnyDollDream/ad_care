<template>
  <div class="main">
    <table class="table" border="10px">
      <tbody>
        <tr style="height: 10%">
          <th rowspan="2">照片</th>
          <td rowspan="2" class="avatar"></td>
          <th>姓名</th>
          <td>拉婷婷</td>
        </tr>
        <tr style="height: 10%">
          <th>联系方式</th>
          <td>XXXXXXXXXXX</td>
        </tr>
        <tr style="height: 10%">
          <th>任职医院</th>
          <td colspan="3">天津中医药大学第一附属医院西青院区</td>
        </tr>
        <tr style="height: 10%">
          <th>科室</th>
          <td>神经内科</td>
          <th>职务</th>
          <td>系主任</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
// * {
//   border: 1px dashed grey;
//   box-sizing: border-box;
// }

.main {
  width: 100%;
  height: 100%;
  padding: 10%;
  display: flex;
  align-items: center;
}

.table {
  width: 100%;
  height: 40%;
}
tr {
  height: 10%;
}
th {
  width: 25%;
  background-color: #dbf4f3;
}
td {
  width: 25%;
}
.avatar {
  background-image: url(../../../assets/doctorpic/1.jpeg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
