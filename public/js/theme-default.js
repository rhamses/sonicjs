import { Grid, h } from 'https://unpkg.com/gridjs?module';

function crEl(name, id, full = 'w-full') {
  let inputWrapper;
  console.log('id', id);
  if (id.includes('language')) {
    // Adicionar opçÕes de INgles e Pt
    inputWrapper = document.createElement('select');
    // inputWrapper
  } else {
    inputWrapper = document.createElement('input');
    inputWrapper.type = 'text';
    inputWrapper.placeholder = 'Chave do conteúdo';
  }
  inputWrapper.name = name;
  inputWrapper.id = id;
  inputWrapper.classList.add('rounded-lg');
  inputWrapper.classList.add('border');
  inputWrapper.classList.add('border-gray');
  inputWrapper.classList.add('p-3');
  inputWrapper.classList.add('mb-5');
  inputWrapper.classList.add(full);
  return inputWrapper;
}
function apField(field) {
  console.log('-===>', document.querySelector(`#${sectionWrapper}`));
}
function addBlock(section) {
  const sectionWrapper = document.createElement('section');
  const sectionTitle = document.createElement('h2');
  const sectionName = section + '--wrapper';
  sectionWrapper.classList.add('flex');
  sectionWrapper.classList.add('justify-between');
  sectionWrapper.classList.add('flex-wrap');
  sectionWrapper.classList.add('my-5');
  sectionWrapper.id = sectionName;
  sectionTitle.classList.add('w-full');
  switch (section) {
    case 'fichaTecnica':
      const inputs = [];
      for (let index = 0; index < 2; index++) {
        let sec;
        if (index % 2 === 0) {
          sec = 'title';
        } else {
          sec = 'content';
        }
        inputs.push(
          crEl(
            `tags[${section}][${sec}][]`,
            `tags[${section}][${sec}][]`,
            'w-1/2'
          )
        );
      }
      if (document.querySelector(`#${sectionName}`)) {
        inputs.map((input) =>
          document.querySelector(`#${sectionName}`).appendChild(input)
        );
        return '';
      } else {
        sectionTitle.innerText = 'Ficha Técnica';
        sectionWrapper.appendChild(sectionTitle);
        inputs.map((input) => sectionWrapper.appendChild(input));
        return sectionWrapper;
      }
      break;
    case 'images':
      const elName = 'images[]';
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl(elName, elName));
        return '';
      } else {
        sectionTitle.innerText = 'Imagens';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(crEl(elName, elName));
        return sectionWrapper;
      }
      break;
    case 'videos':
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('tags[videos][]', 'tags[videos][]'));
        return '';
      } else {
        sectionTitle.innerText = 'Videos';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(crEl('tags[videos][]', 'tags[videos][]'));
        return sectionWrapper;
      }
      break;
    case 'language':
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl(`tags[${section}][]`, `tags[${section}][]`));
        return '';
      } else {
        sectionTitle.innerText = 'Idioma';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(
          crEl(`tags[${section}][]`, `tags[${section}][]`)
        );
        return sectionWrapper;
      }
      break;
  }
}

document.querySelectorAll("a[href*='delete']").forEach((item) =>
  item.addEventListener('click', (e) => {
    if (!confirm('Deseja Apagar o Registro?')) {
      e.preventDefault();
    }
  })
);

if (document.querySelector('#extraContent')) {
  document.querySelector('#extraContent').addEventListener('change', (e) => {
    if (e.target.value) {
      const field = addBlock(e.target.value);
      if (field) document.querySelector('#extraContentWrapper').append(field);
      e.target.value = '';
    }
  });
}

if (document.querySelector('input[name=dataField]')) {
  const data = JSON.parse(
    document.querySelector('input[name=dataField]').value
  );
  const URLParams = new URLSearchParams(document.location.search);
  const grid = new Grid({
    columns: [
      {
        id: 'id',
        hidden: true
      },
      {
        id: 'title',
        name: 'Título'
      },
      {
        id: 'categories',
        name: 'Categorias'
      },
      {
        id: 'order',
        name: 'Ordem'
      },
      {
        name: 'Actions',
        formatter: (cell, row) => {
          const a = [
            h(
              'a',
              {
                href: `/client/edit?menu=${URLParams.get(
                  'menu'
                )}&posttype=${URLParams.get('posttype')}&id=${
                  row.cells[0].data
                }`,
                className:
                  'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600'
              },
              'Edit'
            ),
            h(
              'button',
              {
                className:
                  'py-2 mb-4 px-4 border rounded-md text-white bg-red-600',
                onClick: () =>
                  fetch('/client/list?id=' + row.cells[0].data, {
                    method: 'DELETE',
                    body: JSON.stringify({
                      title: row.cells[0].data
                    })
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.success) {
                        const index = data.findIndex(
                          (item) => item.id === row.cells[0].data
                        );
                        data.splice(index, 1); // Remove the record from the data array
                        grid.updateConfig({ data: data }); // Update the grid with the modified data array
                        grid.forceRender(); // Force Grid.js to re-render the table
                      } else {
                        throw Error(res);
                      }
                    })
                    .catch((err) => console.error(err))
              },
              'Delete'
            )
          ];
          return a;
        }
      }
    ],
    data: data,
    pagination: true,
    search: true
  }).render(document.getElementById('table'));
}
