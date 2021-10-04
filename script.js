const form = document.querySelector("#searchform");
let div = document.getElementById("demo");

AOS.init({
  easing: 'ease-in-sine',
  once:false,
});
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  div.innerHTML = "";
  let search = form.elements.query;
  //const config = { params: { q: search } }
  const config={params:{q:search.value}};
  const res = await axios.get(
    `http://api.tvmaze.com/search/shows?`,config
  );

  // console.log(res);
  console.log(res.data);
  console.log(typeof(res.data));
 if(res.data.length==0)
 {
  let not_found= document.createElement("div");
  div.innerText="no match found";
  div.classList.add('text-light','text-center');
  div.append(not_found);
 }
 else{
  appedimage(res.data);
 }
  search.value = "";
 
});

function appedimage(arg) {
  for (let i of arg) {
    if (i.show.image) {
      const img = document.createElement("IMG");
    
      img.src = i.show.image.original;
      
      img.classList.add("img-fluid","img-thumbnail","card","d-inline","m-3");
      img.onclick=function()
      {
        // window.location.href=i.show.officialSite;
        let a=document.createElement('a');
        a.href=i.show.officialSite;
        a.target="_blank";
        a.click();
        
      }
      div.append(img);
    }
  }
}

// var img = new Image();
// img.src = 'image.png';
// img.onclick = function() {
//     window.location.href = 'http://putyourlocationhere/';
// };