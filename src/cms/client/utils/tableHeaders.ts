export enum HeaderList {
  name = "Nome",
  user_login = "Login",
  user_email = "Email",
  user_status = "Status",
  post_title = "Título",
  post_author = "Autor",
  post_status = "Status",
  taxonomy = "Taxonomia",
  description = "Descrição",
  createdOn = "Created At",
  updatedOn = "Updated At",
}

export const getHeaders = (schema) => {
  if (schema.length === 0) {
    schema = ["createdOn", "updatedOn"];
  }
  if (Array.isArray(schema)) {
    schema = schema[0];
  }
  const headers = Object.keys(schema);
  const keys = headers.filter((item) => Object.keys(HeaderList).includes(item));
  const values = headers
    .filter((item) => Object.keys(HeaderList).includes(item))
    .map((item) => HeaderList[item]);
  return { keys, values };
};
