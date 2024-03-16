const filter = document.getElementById('filter-sub');
const main = document.getElementById('main-container');
const header = document.getElementById('header');
const clear = document.getElementById('clear');

let closes = [];
let arr = [];

(async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();

    for (let curr of data) {
        const container = document.createElement('div');
        container.classList.add('container')
        container.innerHTML = `
          <div class="image-container">
            <img src="${curr.logo}" alt="logo">
          </div>
          <div class="job-info">
            <div class="first">
             <div class="important-info">
                <h1 class="company-name">
                   ${curr.company}
                </h1>
                <div class="new"></div>
                <div class="featured"></div>
             </div>
             <div>
                <a class="position">${curr.position}</a>
             </div>
             <div class="availability">
                <p>
                  ${curr.postedAt}
                </p>
                <div></div>
                <p>
                  ${curr.contract}
                </p>
                <div></div>
                <p>
                  ${curr.location}
                </p>
             </div>
            </div>
             <hr>
             <div class="tags">
                
             </div>
          </div>
        `;

        if (curr.new) {
         
          const span = document.createElement('span');
          span.classList.add('New');
          span.textContent = "NEW!";
          container.querySelector('.new').appendChild(span);
        }

        if (curr.featured) {
          const span = document.createElement('span');
          span.classList.add('Featured');
          span.textContent = "Featured";
          container.querySelector('.featured').appendChild(span);
        }else{
          container.querySelector('.featured').style.display = 'none'
        }

        let type = curr.position.split(' ');

        const btn1 = document.createElement('button');
        btn1.dataset.type = curr.role;
        btn1.textContent =curr.role;
        container.querySelector('.tags').appendChild(btn1);

        const btn2 = document.createElement('button');
        btn2.dataset.type = curr.level;
        btn2.textContent = curr.level;
        container.querySelector('.tags').appendChild(btn2);

        for (let l of curr.languages) {
          const btn = document.createElement('button');
          btn.dataset.type = l;
          btn.textContent = l;
          container.querySelector('.tags').appendChild(btn);
        }

        for (let t of curr.tools) {
          const btn = document.createElement('button');
          btn.dataset.type = t;
          btn.textContent = t;
          container.querySelector('.tags').appendChild(btn);
        }

         main.appendChild(container);

    }

    const buttons = main.querySelectorAll('.tags button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        filterType(button.dataset.type);
        updateContainer();
      });
    });
  
})();

clear.addEventListener('click', () => {
  arr = [];
  filter.innerHTML = "";
  main.querySelectorAll('.container')
       .forEach((container) => container.classList.remove("remove"));
  filter.closest('.filter').style.display = 'none';

});

function addFilter () {
  filter.innerHTML = "";
  for (let i of arr) {
    const el = document.createElement('div');
    el.classList.add('span');
    el.innerHTML = `
     <p>${i}</p>
     <button aria-label="remove button">
      <img src="images/icon-remove.svg" alt="remove-icon" />
     </button> 
    `

    filter.appendChild(el);
    filter.closest('.filter').style.display = "flex";

    closes = [];
    closes.push(el.querySelector('button'));
    closes.forEach(close => {
      close.addEventListener('click', () => {
        filter.removeChild(close.closest('.span'));
        arr.splice(arr.indexOf(close.previousElementSibling.textContent), 1);
        updateContainer();

        if (filter.innerHTML) {
           filter.closest('.filter').style.display = 'flex';
           
        }else{
           filter.closest(".filter").style.display = 'none';
        }
      });
    });

  }

}

function filterType (type) {
  if (!arr.includes(type)) {
    arr.push(type);
    addFilter();

  }

}

function updateContainer () {
  const container = main.querySelectorAll('.container');
  container.forEach(container => {
    const buttons = container.querySelectorAll('button');

    let check = [];
    for (let i of buttons) {
      check.push(i.dataset.type);
    }

    let include = true;
    for (let j of arr) {
       if (!check.includes(j)) {
        include = false;

       }
    }


    if (!include) {
      container.classList.add('remove');

    }else{
       container.classList.remove('remove');
    }
  });

}

function changeBg () {
  
  if (document.body.clientWidth < 700) {
    header.style["background-image"] = "url(images/bg-header-mobile.svg)";

  }else{
    header.style["background-image"] = "url(images/bg-header-desktop.svg)";
  }
}

changeBg();

window.onresize = changeBg;
