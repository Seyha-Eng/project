function getURl() {
    var url =  "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){   
    requestApi();
    $('#recipe').on('change',()=>{
        var choseRecipe = $('#recipe').val();
        getRecipe(chooseRecipe);
    })
});

function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getURl(),
        success: (data) => chooseRecipe(data.recipes),
        error:() => console.log("Cannot get data"),
    })
}
var allData = [] //Globle array 
function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#recipe').append(option);
}
function getRecipe(recipe){
    switch(recipe){
        
    }
}