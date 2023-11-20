import { html } from "hono/html";
import { TableWrapper } from "../components/table/wrapper";
import { TableHeader } from "../components/table/header";
import { TableCell } from "../components/table/cell";
import { TableRow } from "../components/table/row";
import { pageProps } from "../../../utils/interfaces"
import { PageWrapper } from "../../../utils/page-wrapper";
const headers = [
  'Source',
  'Visitors',
  'Revenues',
  'Sales',
  'Conversion',
]
export const List = (props: pageProps) =>
  <PageWrapper pageName={props.pageName} action="List of">
    <TableWrapper>
      <TableHeader>
        {headers.map(header => <TableCell title={header} header={true} />)}
      </TableHeader>
      <TableRow>
        <TableCell>
          <div class="flex items-center gap-3 p-2.5 xl:p-5">
            <div class="flex-shrink-0">
              <img src="./images/brand/brand-01.svg" alt="Brand" />
            </div>
            <p class="hidden font-medium text-black dark:text-white sm:block">
              Google
            </p>
          </div>
        </TableCell>
        <TableCell>
          <p class="font-medium text-black dark:text-white">3.5K</p>
        </TableCell>
        <TableCell>
          <p class="font-medium text-meta-3">$5,768</p>
        </TableCell>
        <TableCell>
          <p class="font-medium text-black dark:text-white">590</p>
        </TableCell>
        <TableCell>
          <p class="font-medium text-meta-5">4.8%</p>
        </TableCell>
      </TableRow>
    </TableWrapper>
  </PageWrapper>