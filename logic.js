//! ********* readyStateChange *********
//! 0   conection not inith
//! 1   conection stablish
//! 2   reuqest recived
//! 3  request processing 
//! 4  request finish and response ready
//! ********* readyStateChange *********

var list = document.querySelectorAll("ul li");
var arrDate = [] ;



for(let i = 0 ; i<list.length ; i++){
    list[i].addEventListener("click" , (e)=>{
        getRecepies(e.target.innerHTML);
    })
}







function getRecepies (query){
    var DateRequest  = new XMLHttpRequest();
    DateRequest.open("GET" , `https://forkify-api.herokuapp.com/api/search?q=${query}`);
    DateRequest.send();
    
    DateRequest.addEventListener("readystatechange" , ()=>{
    
        if(DateRequest.readyState == 4 ){
            arrDate = JSON.parse(DateRequest.response).recipes;
            Display();
        }else{
            DateRequest.addEventListener("readystatechange",(()=>{
                console.log(DateRequest.readyState);
            }))
        }
    })
}



 
function Display (){
    var cartona = `` ;
    for(let i = 0 ; i<arrDate.length ; i++){
        cartona +=`
        <div class="col-lg-3 col-sm-6  my-2">
            <div>
                <img class="img-format w-100" src="${arrDate[i].image_url}">
                <h2 class="head pt-1">${arrDate[i].title}</h2>
                <a class="btn btn-warning text-light" href="${arrDate[i].source_url}" target="_blank">source url </a>
                <a onclick = "get_detalis(${arrDate[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger text-light" target="_blank">detalis</a>
            </div>  
        </div>
       
        `
    }
    document.getElementById("rowDate").innerHTML = cartona;
}

//! fetch(ES6) 
async function get_detalis(id){
    var respones = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    var date =await respones.json();
    var dateopject = `
        <img class="w-100 img-format" src="${date.recipe.image_url}"/>
        <h1 class="fs-5 mt-2"> ${date.recipe.title} </h1>
    `
    document.getElementById("dateopjectID").innerHTML = dateopject ;
    console.log(date.recipe);
}




