import { Grid, h } from 'https://unpkg.com/gridjs?module';

function crEl(name, id, full = 'w-full', attrs = {}) {
  let inputWrapper, complWrapper;
  const { type, placeholder } = attrs;
  // Start IFs
  if (id.includes('language')) {
    // Adicionar opçÕes de INgles e Pt
    inputWrapper = document.createElement('select');
    const optionPt = document.createElement('option');
    optionPt.value = 'ptbr';
    optionPt.innerHTML = 'Portugês';
    const optionEn = document.createElement('option');
    optionEn.value = 'enUS';
    optionEn.innerHTML = 'Inglês';
    inputWrapper.appendChild(optionPt);
    inputWrapper.appendChild(optionEn);
    // inputWrapper
  } else if (id.includes('close')) {
    inputWrapper = document.createElement('button');
    inputWrapper.type = 'button';
    inputWrapper.classList.add('bg-red-100');
    inputWrapper.innerText = 'fechar';
  } else if (id.includes('images')) {
    inputWrapper = document.createElement('input');
    inputWrapper.type = 'file';
    inputWrapper.placeholder = 'Chave do conteúdo';
  } else if (type == 'checkbox') {
    complWrapper = document.createElement('span');
    complWrapper.innerText = placeholder;
    inputWrapper = document.createElement('input');
    inputWrapper.type = type ? type : 'text';
    inputWrapper.placeholder = placeholder ? placeholder : 'Chave do conteúdo';
  } else {
    inputWrapper = document.createElement('input');
    inputWrapper.type = type ? type : 'text';
    inputWrapper.placeholder = placeholder ? placeholder : 'Chave do conteúdo';
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
function addBlock(section, name) {
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
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Ficha Técnica';
        sectionWrapper.appendChild(sectionTitle);
        inputs.map((input) => sectionWrapper.appendChild(input));
        sectionWrapper.appendChild(crEl('close', 'close'));
        return sectionWrapper;
      }
      break;
    case 'images':
      const elName = 'images[]';
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl(elName, elName));
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Imagens';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(crEl(elName, elName));
        sectionWrapper.appendChild(crEl('close', 'close'));
        return sectionWrapper;
      }
      break;
    case 'videos':
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('tags[videos][]', 'tags[videos][]'));
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Videos';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(crEl('tags[videos][]', 'tags[videos][]'));
        sectionWrapper.appendChild(crEl('close', 'close'));
        return sectionWrapper;
      }
      break;
    case 'language':
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl(`tags[${section}]`, `tags[${section}]`));
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Idioma';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(
          crEl(`tags[${section}]`, `tags[${section}]`)
        );
        return sectionWrapper;
      }
      break;
    default:
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(
            crEl('tags[' + section + '][]', 'tags[' + section + '][]')
          );
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = name;
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(
          crEl('tags[' + section + '][]', 'tags[' + section + '][]')
        );
        sectionWrapper.appendChild(crEl('close', 'close'));
        return sectionWrapper;
      }
      break;
  }
}

function updateReferences() {
  // document
  //   .querySelectorAll("input[name='images[]']")
  //   .forEach((item) => (item ? item.addEventListener('change') : null));
  document
    .querySelectorAll('button[name=close]')
    .forEach((item) =>
      item ? item.addEventListener('click', removeItem) : null
    );
}

function removeItem(e) {
  if (e.target.parentElement.children.length <= 3) {
    e.target.parentElement.remove();
  } else {
    e.target.previousSibling.remove();
    // console.log('asdasd', e.target.previousSibling);
    if (e.target.previousSibling.name.includes('tag')) {
      e.target.previousSibling.remove();
    }
    e.target.remove();
  }
}
document
  .querySelectorAll('button[name=close]')
  .forEach((item) =>
    item ? item.addEventListener('click', removeItem) : null
  );
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
      const field = addBlock(
        e.target.value,
        e.target.options[e.target.selectedIndex].text
      );
      if (field) document.querySelector('#extraContentWrapper').append(field);
      e.target.value = '';
      updateReferences();
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
        id: 'language',
        name: 'Idioma'
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

if (document.querySelector('#postImage')) {
  document.querySelector('#postImage').addEventListener('change', async (e) => {
    const formdata = new FormData();
    const url =
      location.protocol + '//' + location.host + '/v1/bucket?method=tempurl';
    formdata.append('file', e.target.files[0], e.target.files[0].name);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    const imageJson = await fetch(url, requestOptions);
    const result = await imageJson.json();
    if (result && result.success) {
      document.querySelector('#imagePreview').src = result.file.url;
    }
  });
}

/**
 * 
 * 
 * 
 function teste(a, b) {
    var r = []
    r.push(a)
    if(b) {
      r.push(...b)
    }
    return r
  }

  console.log(teste("a", teste("b")))
 */
