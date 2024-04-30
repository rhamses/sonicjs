export enum PTBR {
  categories = "Categorias",
  tags = "Tags",
}

export const Lang = (lang, string) => {
  switch (lang) {
    case "ptBR":
      return PTBR[string];
      break;
  }
};
