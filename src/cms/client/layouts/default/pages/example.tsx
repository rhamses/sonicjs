import { html } from "hono/html";
import { pageProps } from "../../../utils/interfaces"
import { PageWrapper } from "../../../utils/page-wrapper";
import { FormWrapper } from "../components/form/wrapper";
import { FormItem } from "../components/form/item";

export const AddNew = (props: pageProps) =>
<PageWrapper action="Add new" pageName={props.pageName}>
    <FormWrapper>
      <FormItem id="title" type="text" label="Titulo" class="text-lg" />
      <FormItem label="Conteúdo" type="textarea" />
      <hr />
      <section id="metaDataWrapper">
        <h2 class="text-xl font-bold text-black dark:text-white">Meta dados</h2>
        <p class="text-sm mb-5">Insira informações adicionais sobre o post</p>
        <div id="metaDataList">
          <div class="flex flex-wrap items-center justify-between metadata--item txt-sm mb-5">
            <FormItem id="metadata_title[]" type="text" label="Nome da informação" class="font-bold" classWrapper="flex-1 mr-5" />
            <FormItem id="metadata_value[]" type="text" label="Valor da informação" classWrapper="flex-1" />
          </div>
          <div class="flex flex-wrap items-center justify-between metadata--item txt-sm mb-5">
            <FormItem id="metadata_title[]" type="text" label="Nome da informação" class="font-bold" classWrapper="flex-1 mr-5" />
            <FormItem id="metadata_value[]" type="text" label="Valor da informação" classWrapper="flex-1" />
          </div>
          <div class="flex flex-wrap items-center justify-between metadata--item txt-sm mb-5">
            <FormItem id="metadata_title[]" type="text" label="Nome da informação" class="font-bold" classWrapper="flex-1 mr-5" />
            <FormItem id="metadata_value[]" type="text" label="Valor da informação" classWrapper="flex-1" />
          </div>
        </div>
        <button type="button" onclick="doAlert()">Adicionar mais um</button>
      </section>
      <FormItem label="Sim ou não" type="radio"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
      <FormItem label="Sim ou não" type="checkbox"
        classWrapper="flex"
        classInput="order-1 flex-initial h-5 mr-2 !w-auto"
        classLabel="order-2" />
      <FormItem label="Campo de data" type="datetime-local" />
      <FormItem label="Campo de data" type="datetime-local" />
      <FormItem label="Campo de Email" type="email" />
      <FormItem label="Campo de Mês" type="month" />
      <FormItem label="Campo de Mês" type="time" />
      <FormItem label="Campo de Mês" type="week" />
      <FormItem label="Campo de Número" type="number" />
      <FormItem label="Campo de Password" type="password" />
      <FormItem label="Campo de Telefone" type="tel" />
      <FormItem label="Campo de Imagem" type="file" />
    </FormWrapper>
</PageWrapper>