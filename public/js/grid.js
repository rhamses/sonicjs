const dataGrid = new gridjs.Grid({
  columns: [
    {
      name: "Record",
      formatter: (editPath) => gridjs.html(`${editPath}`),
    },
    {
      name: "Updated",
      formatter: (dt) =>
        gridjs.html(`<time class="timeSince" datetime="${dt}">${dt}</time>`),
    },
  ],
  pagination: {
    limit: 10,
    server: {
      url: (prev, page, limit) =>
        `${prev}?limit=${limit}&offset=${page * limit}`,
    },
  },
  server: {
    url: `/admin/api/${getTable()}`,
    data: (opts) => {
      return new Promise((resolve, reject) => {
        // let's implement our own HTTP client
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              const resp = JSON.parse(this.response);
              $("#executionTime").show();
              $("#executionTime span.time").text(resp.executionTime);
              $("#executionTime span.source").text(resp.source);
              // make sure the output conforms to StorageResponse format:
              // https://github.com/grid-js/gridjs/blob/master/src/storage/storage.ts#L21-L24
              resolve({
                data: resp.data.map((record) => [
                  record.editLink,
                  record.updatedOn,
                ]),
                total: resp.total,
              });
            } else {
              reject();
            }
          }
        };
        xhttp.open("GET", opts.url, true);
        xhttp.send();
      });
    },
  },
}).render(document.getElementById("grid"));

$(document).on(".timeSince", function () {
  // $(this).html('<b>yaay!</b>');
  console.log("new time since");
});

function getTable() {
  return $("#grid").data("route");
}
