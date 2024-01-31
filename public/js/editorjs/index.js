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
          endpoints: {
            byFile: "//" + BASE_URL + "/v1/bucket?base64return=true",
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
document.querySelector("#addnewform").addEventListener("submit", async (e) => {
  try {
    const result = await editor.save();
    document.querySelector("textarea[id*=post_content]").value =
      JSON.stringify(result);
    e.currentTarget.submit();
  } catch (error) {
    alert("error");
    console.log("error", error);
  }
});
