import instance from '@/utils/request'

export const chatGetHistoryPatientService = () => {
  return instance.get('/recover')
}
