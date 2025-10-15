import instance from '@/utils/request'

export const recordGetList = (patient_name) => {
  return instance.get('/medical/get', {
    params: {
      patient_name,
    },
  })
}

export const recordAddService = (patient_id, diagnosis, prescription) => {
  return instance.put('/medical/add', {
    patient_id,
    diagnosis,
    prescription,
  })
}
