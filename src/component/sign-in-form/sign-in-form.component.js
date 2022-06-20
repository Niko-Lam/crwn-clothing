import { useState } from 'react'

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { email, password } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await signInAuthWithEmailAndPassword(email, password)
      console.log(res.user.accessToken)
      resetFormfields()
      alert('sign in successful')
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with email')
          break
        default:
          console.log(err.message)
          break
      }
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const signInWhitGoogle = async () => {
    const { user } = await signInWithGooglePopup()
  }

  const resetFormfields = () => setFormFields(defaultFormFields)

  const formSetting = [
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
  ]

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        {formSetting.map((form) => (
          <FormInput key={form.label} {...form} />
        ))}
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWhitGoogle}>
            google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
