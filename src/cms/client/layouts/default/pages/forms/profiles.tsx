import { FormInput, FormSelect } from "../../components/form/inputs"
import { pageProps } from "../../interface"
export const FormProfiles = (props: pageProps) => {
  let data = [{ value: "active", label: "Ativo" }, { value: "inactive", label: "Inativo" }]
  if (props?.body?.data) {
    const selectIndex = data.findIndex(item => item.value == props.body.data.user_status);
    data[selectIndex]["selected"] = true
  }
  return (
    <>
      <FormInput value={(props.body?.data?.user_nicename) ? props.body?.data?.user_nicename : ""} id="users['user_nicename']" type="text" label="Nome" class="text-lg" />
      <FormInput value={(props.body?.data?.user_email) ? props.body?.data?.user_email : ""} id="users['user_email']" type="email" label="Email" class="text-lg" />
      <FormInput value={(props.body?.data?.user_login) ? props.body?.data?.user_login : ""} id="users['user_login']" type="text" label="Login" class="text-lg" />
      <FormInput value={(props.body?.data?.user_pass) ? props.body?.data?.user_pass : ""} id="users['user_pass']" type="password" label="Senha" class="text-lg" />
      <FormSelect data={data} id="users['user_status']" type="select" label="Status" emptySelectText="Status" />
      <FormInput id="post_type" type="hidden" value={props.posttype} />
    </>
  )
}