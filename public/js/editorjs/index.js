import "./editorjs.umd.js";
import "./header.umd.js";
import "./link.umd.js";
import "./table.umd.js";
import "./delimiter.umd.js";
import "./code.umd.js";
import "./embed.umd.js";
import "./image.umd.js";
import "./inline-code.umd.js";
import "./list.umd.js";
import "./marker.umd.js";
import "./quote.umd.js";
import "./raw.umd.js";
/**
 *
 * VISUAL EDITOR
 * EDITOR JS
 *
 */
let editor;
let imageDict = {};
const textEditor = document.querySelector("textarea[id*=post_content]");
const BASE_URL = window.location.host;
if (textEditor) {
  let data = {};
  const postContent = document.querySelector("textarea[id*=post_content]");
  if (postContent.value.length > 0) {
    data = JSON.parse(postContent.value);
  }
  editor = new EditorJS({
    holder: "editorjs",
    placeholder:
      "Click here and start to write stories. The '+' has format options",
    data,
    tools: {
      header: Header,
      linkTool: LinkTool,
      table: Table,
      delimiter: Delimiter,
      code: CodeTool,
      embed: Embed,
      image: {
        class: ImageTool,
        config: {
          field: "file",
          uploader: {
            uploadByFile(file) {
              const url = "//" + BASE_URL + "/v1/bucket?method=base64";
              const body = new FormData();
              body.append("file", file);
              return fetch(url, { method: "POST", body })
                .then((res) => res.json())
                .then((res) => {
                  if (res.success === 1) {
                    imageDict[res.file.key] = res.file.url;
                  } else {
                    alert("Upload de imagem falhou");
                  }
                  if (location.host.includes("127")) {
                    res.file.url =
                      "https://sonicjs-media.amb1.io/_18223c10-f8cf-493d-ae1f-823ede9a5098.jpg";
                  }
                  return res;
                });
            },
          },
        },
      },
      list: List,
      marker: Marker,
      quote: Quote,
      raw: RawTool,
    },
    onReady: () => {
      textEditor.parentElement.style.display = "none";
    },
  });
}
/**
 *
 * INTERCEPT FORM SUBMIT
 *
 */
if (location.pathname.includes("posts")) {
  document
    .querySelector("#addnewform")
    .addEventListener("submit", async (e) => {
      console.log("1", 1);
      try {
        const result = await editor.save();
        console.log("asdadsad", JSON.stringify(result));
        document.querySelector("textarea[id*=post_content]").value =
          JSON.stringify(result);
        e.currentTarget.submit();
      } catch (error) {
        alert("error");
        console.log("error", error);
      }
    });
}
