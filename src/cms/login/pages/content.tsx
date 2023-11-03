import { Layout } from "../theme"
import { loginForm } from "./forms/login"
import { recoveryForm } from "./forms/recovery"
export const Login = (props) => {
  return (
    <Layout children={loginForm(props)} />
  )
}

export const Recovery = (props) => {
  return (
    <Layout children={recoveryForm(props)} />
  )
}