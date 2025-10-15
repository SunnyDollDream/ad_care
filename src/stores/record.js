import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordStore = defineStore(
  'record',
  () => {
    const patient = ref({})

    const setPatient = (obj) => {
      patient.value = obj
    }

    const record = ref({})

    const setRecord = (obj) => {
      record.value = obj
    }

    return { patient, setPatient, record, setRecord }
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
)
