let campos = [document.querySelector('#data'),
              document.querySelector('#quantidade'),
              document.querySelector('#valor')
             ]

let tbody = document.querySelector('.table tbody');

let campoSubmit = document.querySelector('[type="submit"]').addEventListener('click', function(e){
  e.preventDefault();
  let tr = document.createElement('tr');
  campos.forEach(function(campo){
    let td = document.createElement('td');
    td.textContent = campo.value;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});
let button = document.querySelector('[data-js="button-clean"]').addEventListener('click', function(e){
  e.preventDefault();
debugger;  campos.forEach(function(campo, index){
    if(index === 0) {
      campo.focus();
    }
    campo.value = '';

  });
});
