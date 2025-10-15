import instance from "@/utils/request"

export const patientGetList = () => {
  return instance.get('/recover')
}
