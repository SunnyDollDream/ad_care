import instance from '@/utils/request'

export const userRegisterService = ({ phone_number, verify_code, password }) => {
  return instance.put('/inlet/register', {
    phone_number,
    verify_code,
    password,
    role: 2,
  })
}

export const userGetVerifyService = (phone_number) => {
  return instance.get('/inlet/verify', {
    params: {
      phone_number,
    },
  })
}

export const userLoginService = ({ phone_number, password }) => {
  return instance.post('/inlet/login', {
    phone_number,
    password,
  })
}

export const userGetInfoService = () => {
  return instance.get('/personal')
}

export const userUpdateIconService = (icon) => {
  const formData = new FormData()
  formData.append('icon', icon)
  return instance.post('/personal/update/icon', formData)
}

export const userUpdateInfoService = ({ name, location }) => {
  return instance.post('/personal/change/info', {
    user_name: name,
    location,
  })
}

export const userUpdatePasswordService = ({ oldPassword, newPassword }) => {
  return instance.post('/personal/change/password', {
    original_password: oldPassword,
    new_password: newPassword,
  })
}
