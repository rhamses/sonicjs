import { Grid, h } from 'https://unpkg.com/gridjs?module';

function crEl(name, id, full = 'w-full', attrs = {}) {
  let inputWrapper, complWrapper;
  const { type, placeholder } = attrs;
  console.log('id', id);
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
    inputWrapper.classList.add('flex');
    inputWrapper.style.justifyContent = 'center';
    inputWrapper.innerHTML = `Remover 
              <svg style="height: 20px; padding-left: 10px; justify-content: center;" viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'>
                <path d='M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z' />
              </svg>`;
  } else if (id.includes('images')) {
    inputWrapper = document.createElement('input');
    inputWrapper.type = 'file';
    inputWrapper.placeholder = 'Chave do conteúdo';
  } else if (id.includes('videos_home')) {
    inputWrapper = document.createElement('label');
    const layerRadio = document.createElement('input');
    layerRadio.type = 'checkbox';
    layerRadio.id = id;
    layerRadio.name = name;
    layerRadio.addEventListener('change', (e) => {
      const value = e.target.parentElement.previousSibling.value;
      e.target.value = value;
    });
    const layerText = document.createElement('span');
    layerText.innerText = 'Mostrar na home?';
    layerText.classList.add('ml-3');
    inputWrapper.appendChild(layerRadio);
    inputWrapper.appendChild(layerText);
    inputWrapper.classList.add('border-0');
    inputWrapper.classList.add('pt-0');
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
        const divinput = document.createElement('div');
        divinput.classList.add('w-full');
        divinput.appendChild(crEl(elName, elName));
        divinput.appendChild(crEl('close', 'close'));
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(divinput);
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
          .appendChild(crEl('tags[videos_home][]', 'tags[videos_home][]'));
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Videos';
        sectionWrapper.appendChild(sectionTitle);
        sectionWrapper.appendChild(crEl('tags[videos][]', 'tags[videos][]'));
        sectionWrapper.appendChild(
          crEl('tags[videos_home][]', 'tags[videos_home][]')
        );
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
    case 'reel':
      if (document.querySelector(`#${sectionName}`)) {
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl(`tags[${section}]`, `tags[${section}]`));
        document
          .querySelector(`#${sectionName}`)
          .appendChild(crEl('close', 'close'));
        return '';
      } else {
        sectionTitle.innerText = 'Reel';
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

// CHECKBOX ORDEM VIDEO HOME
const videos_home_order = document.querySelectorAll('input[id*=videos_home');
if (videos_home_order.length > 0) {
  videos_home_order.forEach((item) =>
    item.addEventListener('change', () => {
      // reset status
      videos_home_order.forEach((item) => {
        if (item.nextSibling) item.nextSibling.remove();
      });
      // create element
      const parentItem = item.parentElement;
      const inp = document.createElement('input');
      inp.id = 'tags[videos_home_order]';
      inp.name = 'tags[videos_home_order]';
      inp.type = 'number';
      inp.placeholder = 'Digite a ordem na home';
      inp.style.order = '3';
      inp.style.marginLeft = '10px';
      inp.style.width = '150px';
      inp.classList.add('rounded-lg');
      inp.classList.add('border');
      inp.classList.add('border-gray');
      inp.classList.add('p-3');
      inp.classList.add('w-full');
      parentItem.appendChild(inp);
    })
  );
}
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

if (document.querySelector('input[name=host]')) {
  const data = document.querySelector('input[name=host]').value;
  const COLUMNS = [
    {
      id: 'id',
      hidden: true
    },
    {
      id: 'title',
      name: 'Título'
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
      id: 'createdOn',
      name: 'Criado em'
    }
  ];
  const ACTIONS = {
    name: 'Action',
    width: '300px',
    formatter: (cell, row) => {
      const a = [
        h(
          'a',
          {
            href: `/client/edit?menu=${URLParams.get(
              'menu'
            )}&posttype=${URLParams.get('posttype')}&id=${row.cells[0].data}`,
            className:
              'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
            style: 'line-height: normal'
          },
          'Editar'
        ),
        h(
          'button',
          {
            style: 'line-height: normal',
            className: 'py-2 mb-4 px-4 border rounded-md text-white bg-red-600',
            onClick: () => {
              if (confirm('Deseja remover o registro?'))
                document.body.classList.add(
                fetch(
                  '/client/list?id=' +
                    row.cells[0].data +
                    '&posttype=' +
                    new URLSearchParams(document.location.search).get(
                      'posttype'
                    ),
                  {
                    method: 'DELETE',
                    body: JSON.stringify({
                      title: row.cells[0].data
                    })
                  }
                )
                  .then((res) => {
                    document.body.classList.add('loading');
                    res.json();
                  })
                  .then((res) => {
                    document.body.classList.remove('loading');
                    location.reload();
                  })
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  document.body.classList.remove('loading');
                  location.reload();
                })
                .catch((err) => console.error(err));
            }
          },
          'Apagar'
        ),
        h(
          'button',
          {
            style: 'line-height: normal',
            className:
              'py-2 mb-4 px-4 border rounded-md text-white bg-green-600',
            onClick: () => {
              document.body.classList.add('loading');
              fetch('/v1/post-duplicate', {
                method: 'POST',
                body: JSON.stringify({
                  id: row.cells[0].data,
                  posttype: URLParams.get('posttype')
                })
              })
                .then((res) => res.json())
                .then((res) => {
                  document.body.classList.remove('loading');
                  location.reload();
                })
                .catch((err) => console.error(err));
            }
          },
          'Duplicar'
        )
      ];
      return a;
    }
  };
  const columns = COLUMNS;
  columns.push(ACTIONS);
  //
  const URLParams = new URLSearchParams(document.location.search);
  const grid = new Grid({
    columns,
    server: {
      url: `${window.location.protocol}//${window.location.host}/v1/posts-data?${data}`,
      then: (posts) => {
        const result = posts.data.map((post) => {
          const {
            id,
            nome,
            email,
            title,
            categories,
            order,
            language,
            createdOn
          } = post;
          const result = [];
          if (id) result.push(id);
          if (nome) result.push(nome);
          if (email) result.push(email);
          if (title) result.push(title);
          if (categories) result.push(categories);
          if (order) result.push(order);
          if (language) result.push(language);
          if (createdOn) result.push(createdOn);
          return result;
        });
        return result;
      }
    },
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
