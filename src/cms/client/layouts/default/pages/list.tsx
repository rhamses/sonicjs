import { TableWrapper } from "../components/table/wrapper";
import { TableHeader } from "../components/table/header";
import { TableCell } from "../components/table/cell";
import { TableRow } from "../components/table/row";
import { pageProps } from "../interface"
import { PageWrapper } from "../../../utils/page-wrapper";
// Pacote de Icones Box Icons
export const List = (props: pageProps) => { 
  let appendix = "";
  if (Object.keys(props.query).length > 0) {
    for (const item of Object.keys(props.query)) {
      if (props.query[item]) {
        if(appendix.length == 0) {
          appendix += `?${item}=${props.query[item]}`
        } else {
          appendix += `&${item}=${props.query[item]}`
        }
      }
    }
  }
  return (
    <PageWrapper posttype={props.posttype} action="List of" query={props.query}>
      <TableHeader>
        {props.body.headers.values.map(header => <TableCell title={header} header={true} />)}
        <TableCell></TableCell>
      </TableHeader>
      {props.body.data.map(item =>
          <TableRow>
            {props.body.headers.keys.map(header => <TableCell>{item[header]}</TableCell>)}
            <TableCell>
              <a href={`/client/edit/${props.posttype}/${item.id}${appendix}`}>
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE4Ljk4OCAyLjAxMiAzIDNMMTkuNzAxIDcuM2wtMy0zek04IDE2aDNsNy4yODctNy4yODctMy0zTDggMTN6Ii8+PHBhdGggZD0iTTE5IDE5SDguMTU4Yy0uMDI2IDAtLjA1My4wMS0uMDc5LjAxLS4wMzMgMC0uMDY2LS4wMDktLjEtLjAxSDVWNWg2Ljg0N2wyLTJINWMtMS4xMDMgMC0yIC44OTYtMiAydjE0YzAgMS4xMDQuODk3IDIgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTguNjY4bC0yIDJWMTl6Ii8+PC9zdmc+" alt="" />
              </a>
              <button type="button" class="btn-delete" data-id={item.id} >
                deletar
              </button>
            </TableCell>
          </TableRow>)}
    </PageWrapper>
  )
}