// 根据出生日期计算年龄的函数
export function calculateAge(birthDateString) {
  // 将出生日期字符串转换为Date对象
  const birthDate = new Date(birthDateString)
  // 获取当前日期
  const currentDate = new Date()

  // 计算年龄（年份差值）
  let age = currentDate.getFullYear() - birthDate.getFullYear()

  // 获取当前月份和出生月份
  const currentMonth = currentDate.getMonth()
  const birthMonth = birthDate.getMonth()

  // 如果当前月份小于出生月份，或者当前月份等于出生月份但当前日期小于出生日期，年龄减1
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}
