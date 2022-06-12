import { useState } from 'react'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) return alert('password is not match')

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })

      resetFormfields()

      alert('create user is successful')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        return alert('email already in use')
      } else {
        console.log('user creation encountered error ', err.message)
      }
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormfields = () => setFormFields(defaultFormFields)

  const formSetting = [
    {
      label: 'Display Name',
      type: 'text',
      required: true,
      onChange: handleChange,
      name: 'displayName',
      value: displayName,
    },
    {
      label: 'Email',
      type: 'email',
      required: true,
      onChange: handleChange,
      name: 'email',
      value: email,
    },
    {
      label: 'Password',
      type: 'password',
      required: true,
      onChange: handleChange,
      name: 'password',
      value: password,
      minLength: '6',
    },
    {
      label: 'Confirm Password',
      type: 'password',
      required: true,
      onChange: handleChange,
      name: 'confirmPassword',
      value: confirmPassword,
      minLength: '6',
    },
  ]

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        {formSetting.map((form) => (
          <FormInput key={form.label} {...form} />
        ))}

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
