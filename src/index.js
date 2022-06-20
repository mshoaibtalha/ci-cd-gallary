import fetcher from './fetcher';
import './style.scss';

window.localStorage.clear();

// instead of html file:
const nav = document.createElement('nav');
const divSearch = document.createElement('div');
const searchBar = document.createElement('input');
const btnSearch = document.createElement('button');
const photoBlock = document.createElement('section');
const prevBtn = document.createElement('button');
const nextBtn = document.createElement('button');
const btnContainer = document.createElement('div');
const scrollMenu = document.createElement('div');
const footer = document.createElement('footer');
const githubLink = 'https://github.com/saltsthlm/jsfs-summer-22-lab-cicdGallery/blob/main/README-step-1.md';

nav.innerHTML = '<h1>APOLLO Picture Search<h1>';

searchBar.type = 'text';
searchBar.className = 'searchBar';
searchBar.placeholder = 'Search for';
btnSearch.textContent = 'Search';
btnSearch.className = 'searchBtn';

btnContainer.className = 'btn-container';
prevBtn.textContent = 'prev';
nextBtn.textContent = 'next';

scrollMenu.innerHTML = '<h1>Scrol menu</h1>';
footer.innerHTML = `<a href= ${githubLink}>Github logo link</a>`;

btnContainer.append(prevBtn);
btnContainer.append(nextBtn);
divSearch.append(searchBar);
divSearch.append(btnSearch);

const app = document.querySelector('body');
app.append(nav);
app.append(divSearch);
app.append(photoBlock);
app.append(btnContainer);
app.append(footer);

let pageNr = 0;
const recArr = [];

btnSearch.addEventListener('click', async () => {
  // clear the imgs from before
  const inputVal = searchBar.value;
  if (inputVal) {
    await fetcher(inputVal, photoBlock, pageNr);
    // window.localStorage.setItem(pageNr+1,photoBlock.innerHTML);
    // <section>img1 img2 img3</section>

    photoBlock.innerHTML = '';
    pageNr += 1;
    // console.log('pageNr after one search '+pageNr);
  }

  if (recArr.length === 3) { recArr.shift(); }
  recArr.push(inputVal);
  // console.log('recArr:   '+recArr);
  const recArrStr = JSON.stringify(recArr); // '['cats','dogs','birds']'
  localStorage.setItem('recommandations', recArrStr); // {'pages': '{....}', 'recommandations':'['cats','dogs','birds']'}
});

// div with buttons for PREV AND NEXT
// const paBtnContainer = document.createElement('div');

prevBtn.addEventListener('click', () => {
  if (pageNr > 1) {
    pageNr -= 1;
    const pagesObj = JSON.parse(window.localStorage.getItem('pages')); // {pages: '{1:dd, 2:ss, 3:aa}', recs: }
    // console.log(`${JSON.parse(window.localStorage.getItem('pages'))[pageNr]} pageObj`);
    const prevHtml = pagesObj[pageNr];
    photoBlock.innerHTML = prevHtml;
    // console.log(`pageNr after clicking prev ${pageNr}`);
  }
});

nextBtn.addEventListener('click', () => {
  const nextPageNr = Number(pageNr) + 1;
  const pagesObj = JSON.parse(window.localStorage.getItem('pages')); // {pages: '{1:dd, 2:ss, 3:aa}', recs: }
  const nextHtml = pagesObj[nextPageNr]; // ???
  if (nextHtml) {
    photoBlock.innerHTML = nextHtml;
    // console.log('pageNr after clicking next: '+ nextPageNr);
    pageNr += 1;
  }
});

// searchBar.addEventListener('click', autocomplete(recArr, scrollMenu));

// FOOTER with GITHUB
//! !!!!!  link to github,  SPA ???

// Append heading node to the DOM

// app.append(autoForm);
// localStorage:  {pages:'{1:ddd,2:sss,...}', recommendation: '[r1,r2,r3]'}
