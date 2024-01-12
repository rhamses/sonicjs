//        Formio.builder(document.getElementById('builder'), {}, {});
var contentTypeComponents;
var route;
let mode;

(function () {
  const url = new URL(window.location.href);
  route = url.pathname;

  const authMode = route.includes("/auth/");
  if (authMode) {
    route = route.replace("/auth", "");
  }
  if (url.pathname.indexOf("admin/content/new") > 0) {
    route = route.replace("/admin/content/new/", "");
    mode = "new";
  } else if (url.pathname.indexOf("admin/content/edit") > 0) {
    route = route.replace("/admin/content/edit/", "");
    mode = "edit";
  } else {
    mode = undefined;
  }
  if (authMode) {
    route = `auth/${route}`;
  }
  if (!mode) {
    return;
  }

  if (mode == "edit") {
    editContent();
  }

  if (mode.includes("new")) {
    newContent();
  }
})();

let currUppyField = "";

const initUppy = async (id) => {
  const { Uppy, Url, Dashboard, Tus, ImageEditor } = await import(
    "https://releases.transloadit.com/uppy/v3.21.0/uppy.min.mjs"
  );
  const uppy = new Uppy();
  uppy.use(Dashboard, {
    target: "#files-drag-drop",
    showProgressDetails: true,
    closeModalOnClickOutside: true,
  });
  uppy.use(ImageEditor, { target: Dashboard });
  const endpoint = location.origin + "/tus";
  uppy.use(Tus, {
    endpoint,
    withCredentials: true,
    headers: {
      "sonic-mode": id ? "update" : "create",
      "sonic-route": route,
      "data-id": id,
    },
  });
  return uppy;
};

const chooseFileEventHandler = (uppy, event) => {
  if (uppy) {
    let field = event.component.attributes["data-field"];
    const isArray = event.component.attributes["array"];
    if (isArray) {
      let tr = event.event.target;
      while (tr.tagName !== "TR") {
        tr = tr.parentElement;
      }
      field = `${field}[${tr.rowIndex - 1}]`;
    }
    currUppyField = field;
    const tus = uppy.getPlugin("Tus");
    tus.opts.headers["sonic-field"] = field;
    const dashboard = uppy.getPlugin("Dashboard");
    if (!dashboard.isModalOpen()) {
      dashboard.openModal();
    }
  }
};

const setupComponents = (data) => {
  const fileFields = data.filter(
    (c) => c.metaType === "file" || c.metaType === "file[]"
  );
  return {
    fileFields,
    contentType: data.reduce((acc, c) => {
      if (c.metaType == "file") {
        acc.push({
          ...c,
          disabled: true,
        });
        acc.push({
          ...c,
          key: undefined,
          attributes: {
            "data-field": c.key,
          },
          label: "Upload File",
          type: "button",
          action: "event",
          theme: "secondary",
          readOnly: true,
        });
      } else if (c.metaType == "file[]") {
        acc.push({
          type: "datagrid",
          label: c.label || c.key,
          key: c.key,
          components: [
            {
              ...c,
              key: c.key,
              disabled: true,
              label: singularize(c.label || c.key),
            },
            {
              key: undefined,
              label: "Upload File",
              attributes: {
                "data-field": c.key,
                array: true,
              },
              type: "button",
              action: "event",
              theme: "secondary",
              readOnly: true,
            },
          ],
        });
      } else {
        acc.push(c);
      }
      return acc;
    }, []),
  };
};

handleSubmitData = (data) => {
  console.log("data pre", JSON.stringify(data, null, 2));
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      data[key] = value.filter((v) => v[key]).map((v) => v[key]);
      if (data[key].length === 0) {
        delete data[key];
      }
    }
    if (!data[key]) {
      delete data[key];
    }
  });
  console.log("data post", JSON.stringify(data, null, 2));
  return data;
};
const getFilePreviewElement = (url, isImage, i = -1) => {
  if (url && typeof url === "string") {
    const urlParts = url.split("/");
    let field = "";
    urlParts.forEach((part) => {
      if (part.includes("f_")) {
        field = part.replace("f_", "");
      }
    });
    document.querySelector(`.file-preview-${field}-${i}`)?.remove();
    const linkInner = `<div class="d-flex"><span>${url}</span><i class="ms-2 bi bi-box-arrow-up-right"></i></div>`;
    const imageInner = `<div  style="height: 140px; max-width: max-content">
          <img style="width: 100%; height: 100%; object-fit: contain" src="${url}" />
          </div>`;
    return `<a class="file-preview file-preview-${field}-${i} d-block my-2" style="text-decoration:underline" target="_blank" rel="noopener noreferrer" href="${url}">
    ${isImage ? imageInner : linkInner}
 </a>`;
  }
  console.error("bad arguments", url, isImage);
};
const onUploadSuccess = (form) => (file, response) => {
  if (file && response) {
    const type = file.type;
    let field = currUppyField;
    let index = -1;
    if (field.includes("[") && field.includes("]")) {
      field = currUppyField.split("[")[0];
      index = currUppyField.split("[")[1].split("]")[0];
    }
    let component = form.getComponent(field);
    let element = component.element;
    if (index > -1) {
      const textComponents = component.components.filter(
        (c) => c.type === "textfield"
      );
      component = textComponents[index];
      element = document.querySelector(
        `[name="data[${field}][${index}][${field}]"]`
      );
    }
    console.log({ component, element });
    if (element) {
      element.insertAdjacentHTML(
        "afterend",
        getFilePreviewElement(
          response?.uploadURL,
          type.includes("image"),
          index
        )
      );
    }
    if (component && response?.uploadURL) {
      const url = new URL(response?.uploadURL).pathname;
      component.setValue(url);
    }
  }
};

function setupFilePreviews(fileFields, form) {
  if (fileFields.length) {
    for (const field of fileFields) {
      const component = form.getComponent(field.key);
      const value = component._data[field.key];
      const element = component?.element;
      console.log(value, component, element);
      const addPreviewElement = (value, element, i = 0) => {
        if (value && element) {
          let extensions = [
            "jpg",
            "jpeg",
            "png",
            "bmp",
            "gif",
            "svg",
            "webp",
            "avif",
          ];
          let regex = new RegExp(`\\.(${extensions.join("|")})$`, "i");
          element.insertAdjacentHTML(
            "afterend",
            getFilePreviewElement(value, regex.test(value), i)
          );
        }
      };
      if (Array.isArray(value)) {
        const trs = element.querySelectorAll("tr");
        let i = 0;
        for (const v of value) {
          const td = trs[i + 1].querySelector("td");
          const input = td.querySelector("input");
          addPreviewElement(v[field.key], input, i);
          i++;
        }
      } else {
        addPreviewElement(value, element);
      }
    }
  }
}
function newContent() {
  console.log("contentType", route);

  axios.get(`/v1/form-components/${route}`).then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);

    const { fileFields, contentType } = setupComponents(response.data);
    response.data = contentType;
    Formio.icons = "fontawesome";
    // Formio.createForm(document.getElementById("formio"), {
    Formio.createForm(document.getElementById("formio"), {
      components: response.data,
    }).then(function (form) {
      let uppy;
      if (fileFields.length) {
        const formio = document.getElementById("formio");
        const childDiv = document.createElement("div");
        childDiv.id = "files-drag-drop";
        formio.parentNode.insertBefore(childDiv, formio);
        initUppy()
          .then((u) => {
            uppy = u;
            uppy.on("upload-success", onUploadSuccess(form));
          })
          .catch((e) => {
            console.log(e);
          });
      }
      form.on("submit", function (data) {
        data.data = handleSubmitData(data.data);
        saveNewContent(data);
      });
      form.on("change", async function (event) {
        $("#contentFormSaveButton").removeAttr("disabled");
        if (event.components) {
          contentTypeComponents = event.components;
          console.log("event ->", event);
        }

        const changedKey = event.changed.component.key;
        const fileFieldWasChanged = fileFields
          .map((f) => f.key)
          .includes(changedKey);
        if (fileFieldWasChanged) {
          setupFilePreviews(fileFields, form);
        }
      });
      form.on("customEvent", function (event) {
        chooseFileEventHandler(uppy, event);
      });
    });
  });
}

function saveNewContent(data) {
  delete data.data.submit;
  delete data.data.id;

  axios.post(`/v1/${route}`, data).then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    if (response.status === 200 || response.status === 201) {
      location.href = `/admin/tables/${route}`;
    }
  });
}
function editContent() {
  const contentId = $("#formio").attr("data-id");
  route = $("#formio").attr("data-route");
  const routeWithoutAuth = route.replaceAll("/auth/", "/");

  axios
    .get(`/v1/${routeWithoutAuth}/${contentId}?includeContentType`)
    .then((response) => {
      const { fileFields, contentType } = setupComponents(
        response.data.contentType
      );
      response.data.contentType = contentType;
      // handle array values to the formio format
      if (response?.data?.data) {
        Object.keys(response.data.data).forEach((key) => {
          let value = response.data.data[key];
          try {
            value = JSON.parse(value);
          } catch (e) {
            //empty by design
          }
          if (Array.isArray(value)) {
            response.data.data[key] = value.map((v) => {
              return {
                [key]: v,
              };
            });
          }
        });
      }
      console.log("data", JSON.stringify(response.data?.data, null, 2));
      let uppy;
      Formio.icons = "fontawesome";
      // debugger;
      // Formio.createForm(document.getElementById("formio"), {
      Formio.createForm(document.getElementById("formio"), {
        components: response.data.contentType,
      }).then(function (form) {
        if (fileFields.length) {
          const formio = document.getElementById("formio");
          const childDiv = document.createElement("div");
          childDiv.id = "files-drag-drop";
          formio.parentNode.insertBefore(childDiv, formio);
          initUppy(response?.data?.data?.id)
            .then((u) => {
              uppy = u;
              uppy.on("upload-success", onUploadSuccess(form));
            })
            .catch((e) => {
              console.log(e);
            });
        }
        form.on("render", function () {
          console.log("render");
        });
        form.on("redraw", function () {
          console.log("render");
        });
        form.on("submit", function ({ data }) {
          data = handleSubmitData(data);
          if (data.id) {
            updateContent(data);
          } else {
            addContent(data);
          }
        });
        form.submission = {
          data: response.data.data,
        };
        form.on("change", async function (event) {
          $("#contentFormSaveButton").removeAttr("disabled");
          if (event.components) {
            contentTypeComponents = event.components;
            console.log("event ->", event);
          }
          const changedKey = event.changed.component.key;
          const fileFieldWasChanged = fileFields
            .map((f) => f.key)
            .includes(changedKey);
          if (fileFieldWasChanged) {
            setupFilePreviews(fileFields, form);
          }
          console.log("change");
        });

        form.on("customEvent", function (event) {
          chooseFileEventHandler(uppy, event);
        });
      });
    });
}

function addContent(data) {
  data.key = route;

  axios.post(`/v1/${route}`, data).then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    if (response.status === 201 || response.status === 204) {
      location.href = "/admin";
    }
  });
}

function updateContent(data) {
  const id = data.id;
  var content = {};
  content.data = data;
  content.table = data.table;
  delete content.data.submit;
  delete content.data.contentType;
  delete content.data.id;
  delete content.data.table;
  route = $("#formio").attr("data-route");
  axios.put(`/v1/${route}/${id}`, content).then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    if (response.status === 200) {
      location.href = `/admin/tables/${route}`;
    } else {
      alert("Error occured updating " + data.id);
    }
  });
}
function singularize(word) {
  if (word.endsWith("ses") || word.endsWith("xes") || word.endsWith("zes")) {
    return word.slice(0, -3);
  }
  if (word.endsWith("shes") || word.endsWith("ches")) {
    return word.slice(0, -4);
  }

  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  }

  return word.slice(0, -1);
}
