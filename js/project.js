function getURl() {
    var url =  "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){   
    requestApi();
    $('#recipe').on('change',()=>{
        var recipeId = $('#recipe').val();
        getRecipe(recipeId);
    })
});
//request API
function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getURl(),
        success: (data) => chooseRecipe(data.recipes),
        error:() => console.log("Cannot get data"),
    })
}
var allData = [];
function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `<option value="${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}
//
function getRecipe(id){
    allData.forEach(item =>{
        console.log(item);
        if(item.id == id){
            eachRecipe(item.name,item.iconUrl);
            input(item.nbGuests);
            eachIngredient(item.ingredients);
        }
    })
}
function eachRecipe(name,img){
    var result ="";
    result +=`
    <h1>${name}</h1>
    <img src ="${img}" width ="100">
    `;
    $('#recipe-result').html(result);
}
//get ingredient
function eachIngredient(ingredients){
    result = "";
    ingredients.forEach(element => {
        result += `
        <tr>
            <td><img src="${element.iconUrl}" class="img-fluid" width="50px"></td>
            <td>${element.quantity + " " + element.unit[0] }</td>
            <td>${element.name}</td>
        </tr>
        `;
    });
    $("#ingredient").html(result);
}
function input(member){
    var result = "";
    result += `    
    `;
    $("#input").html(result);
}

