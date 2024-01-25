import { pageProps } from "../interface"
import { PageWrapper } from "../../../utils/page-wrapper";
import { FormWrapper } from "../components/form/components/form";
import { FormProfiles } from "./forms/profiles";
import { FormPosts } from "./forms/post";
import { FormTerms } from "./forms/terms";
import { FormTaxonomy } from "./forms/taxonomy";
export const AddNew = async (props: pageProps) => { 
  let html;
  if (props.posttype == "users") {
    html = FormProfiles(props)
  } else if (props.posttype == "posts") {
    html = FormPosts(props)
  } else if (props.posttype == "terms") {
    html = FormTerms(props)
  } else if (props.posttype == "taxonomy") {
    html = FormTaxonomy(props)
  }
  return (
    <PageWrapper action="Add new" posttype={props.posttype} query={(props.query) ? props.query : ""}>
      <FormWrapper props={props} taxonomy={props.taxonomy} body={props.body} posttype={props.posttype}>{ html }</FormWrapper>
    </PageWrapper>
  )
}