/* Fetch API */
const fetcher = async (inputVal, imageDiv, pageNr) => {
  const imgDiv = imageDiv;
  const url = `https://api.unsplash.com/search/photos?query=${inputVal}&per_page=10&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results.length === 0) {
        imgDiv.textContent = 'Image not found!';
        return;
      }
      for (let i = 0; i < data.results.length; i++) {
        const imageElement = document.createElement('img');
        imageElement.src = data.results[i].urls.small;
        imgDiv.append(imageElement);
      }
      // console.log('The fetcher is working!');

      const nextPageNr = pageNr + 1;
      // window.localStorage.setItem(pageNr+1,imageDiv.innerHTML);

      // --------set and update pages property in localstorage----------
      const pagesObjStr = window.localStorage.getItem('pages');
      let pagesObj = {};

      if (pagesObjStr) {
        // if the pages property exist in localstorage already
        pagesObj = JSON.parse(window.localStorage.getItem('pages')); // {1:a, 2:b, 3:c}
      }
      pagesObj[nextPageNr] = imgDiv.innerHTML; /// /{1:a, 2:b, 3:c, 4:xxxx}
      window.localStorage.setItem('pages', JSON.stringify(pagesObj));
      // {'pages': '{1:a, 2:b, 3:c, 4:xxxx}', ......
    }); // localstorage: {'pages': '{....}', 'recommandations':'['cats','dogs','birds']'}
};
module.exports={fetcher};
