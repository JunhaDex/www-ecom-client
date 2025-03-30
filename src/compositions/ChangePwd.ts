import { ref } from 'vue'

export function useChangePwd() {
  const isModalOpen = ref(false)
  const userInput = ref<{
    oldPwd: string
    newPwd: string
    confirmPwd: string
  }>({
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
  })

  const errMessage = ref('')

  function validateInput(): boolean {
    if (!userInput.value.oldPwd || !userInput.value.newPwd || !userInput.value.confirmPwd) {
      errMessage.value = '변경할 비밀번호를 입력해주세요.'
      return false
    } else if (userInput.value.newPwd !== userInput.value.confirmPwd) {
      errMessage.value = '새 비밀번호가 일치하지 않습니다.'
      return false
    }
    return true
  }

  function submitChange() {
    if (!validateInput()) {
      window.alert(errMessage.value)
      return
    }
    isModalOpen.value = false
  }

  function resetInput() {
    userInput.value = {
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
    }
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    userInput,
    submitChange,
    resetInput,
  }
}
