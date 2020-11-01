const auth = "563492ad6f91700001000001fb37b94a951142bdb652934ad4c597a2";
const btn = document.querySelector('.btn');
const input = document.querySelector('input');


let pagenr = 1;
let search = false;
let query = "";


input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;
});

async function CuratedPhotos(pagenr){
    const data = await fetch(`https://api.pexels.com/v1/curated?per_page=6$page=${pagenr}`, 
    {
    method:"GET", 
    headers: {
    Accept: "application/json", 
    Authorization: auth,
},
}
    );
    const result = await data.json();
   result.photos.forEach((photo) => {
       const pic = document.createElement("div");
       pic.innerHTML= `<img src=${photo.src.large}>
         <a href=${photo.photographer_url} id="aStyle">${photo.photographer}</a>
`;
document.querySelector(".gallery").appendChild(pic);
   });
}






async function SearchPhotos(query,pagenr){
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=6`, 
    {
    method:"GET", 
    headers: {
    Accept: "application/json", 
    Authorization: auth,
},
}
    );
    const result = await data.json();
   result.photos.forEach((photo) => {
       const pic = document.createElement("div");
       pic.innerHTML= `<img src=${photo.src.large}>
         <a href=${photo.photographer_url} id="aStyle">${photo.photographer}</a>
`;
document.querySelector(".gallery").appendChild(pic);
   });
}

btn.addEventListener("click", () => {
    if(input.value === "")return;
    clear();
    search=true;
    SearchPhotos(query, pagenr);
});

function clear(){
    input.value="";
    document.querySelector(".gallery").innerHTML="";
}



