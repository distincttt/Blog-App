export const usernameValidation = () => {
  return {
    required: 'This is required',
    minLength: { value: 3, message: 'Minimum 3 characters' },
    maxLength: { value: 20, message: 'Maximum 20 characters' },
    pattern: { value: /^[a-zA-Z]/, message: 'Incorrect username' },
  }
}

export const emailValidation = () => {
  return {
    required: 'This is required',
    pattern: { value: /^[a-z]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,})/, message: 'Incorrect e-mail' },
  }
}

export const passwordValidation = () => {
  return {
    required: 'This is required',
    minLength: { value: 6, message: 'Minimum 6 characters' },
    maxLength: { value: 40, message: 'Maximum 40 characters' },
  }
}

export const rePasswordValidation = (valuePassword) => {
  return {
    required: 'This is required',
    validate: {
      value: (text) => {
        if (text === valuePassword) return true
        else return 'Passwords must match'
      },
    },
  }
}

export const requiredValidation = () => {
  return { required: 'This is required' }
}

export const avatarValidation = () => {
  return {
    required: 'This is required',
    pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Incorrect image address' },
  }
}
