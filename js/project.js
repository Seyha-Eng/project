//get url 
function getURl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
//function start process
$(document).ready(function () {
    requestApi();
    $('#recipe').on('change', () => {
        var recipeId = $('#recipe').val();
        getRecipe(recipeId);
        //click get value add from input
        $("#plus").on("click", function(){
            increases();
        });
        //click get value minus from input
        $("#minus").on('click', function(){
            descreases();
        })
    })
});

//request API
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getURl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
//get name of select option
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `<option value="${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}
//get data of each element from API
var quan = [];
var oldGuest = 0;
function getRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            eachRecipe(item.name, item.iconUrl); //call from eachRecipe function
            eachIngredient(item.ingredients); //call from eachIngredient function
            numberGuests(item.nbGuests); // call from numberGuests function
            eachInstructions(item.instructions); //call from eachInstructions function
            getQuantiy = item;
            oldGuest = item.nbGuests;
        }
    });
}
//display recipe name and image to html
function eachRecipe(name, img) {
    var result = "";
    result += `
        <div class="col-3"></div>
        <div class="col-3"><h2>${name}</h2></div>
        <div class="col-3"><img src="${img}" width="200px"></div>
        <div class="col-3"></div>
    `;
    $('#recipe-result').html(result);
}
//get ingredient display to html
$('#text-ingredient').hide();   //hide of ingredient
$('#line').hide();  //hide of line
function eachIngredient(ingredients) {
    result = "";
    ingredients.forEach(element => {
        result += `
        <tr>
            <td><img src="${element.iconUrl}" class="img-fluid" width="50px"></td>
            <td>${element.quantity + " " + element.unit[0]}</td>
            <td>${element.name}</td>
        </tr>
        `;
    });
    $("#ingredient").html(result);
    $('#text-ingredient').show();   //show of ingredient
    $('#line').show();  //show of line
}
//get number of guests 
function numberGuests(members) {
    var result = "";
    result += `
        <div class="col-3"></div>
        <div class="col-3"><h5>Number of persons</h5></div>
        <div class="col-3">
            <form action="#">
                <div class="input-group mb-3 border">
                    <div class="input-group-prepend">
                        <button class="btn btn-primary" id="minus" type="button">-</button>
                    </div>
                    <input type="text" id="persons" width="10px" value="${members}" min="1" max="15" disabled
                        class="form-control text-center">
                    <div class="input-group-append">
                        <button class="btn btn-success" id="plus" type="button">+</button>
                    </div>
                </div>
            </form>
            <hr>
        </div>
        <div class="col-3"></div>
    `;
    $("#input-number").html(result);
}
//loop step of instruction display to html
$('#text-instruction').hide();  //hide of instruction
function eachInstructions(instructions) {
    var split = instructions.split('<step>');
    var result = "";
    for (let i = 1; i < split.length; i++) {
        result += `
    <h6 class="text text-info">Step:${i}</h6>
    <p>${split[i]}</p>
    `;
        $('#instruction').html(result);
        $('#text-instruction').show();  //show of instruction
    }
}
//icreases guest when click on button
var inputValue;
function increases(){
    var value = $("#persons").val();
    inputValue = parseInt(value) + 1;
    if (inputValue <= 15){
        $("#persons").val(inputValue);
        computeQuantity($("#persons").val());
        
    }
}
//descreases guest when click on button
function descreases(){
    var value = $("#persons").val();
    inputValue = parseInt(value) - 1;
    if (inputValue >= 1){
        $("#persons").val(inputValue);
        computeQuantity($("#persons").val());
    }        
}
//comput the numbers of guest and display to html
function computeQuantity(compute){
    var quantity;
    var newQuantity;
    var result = "";
    getQuantiy.ingredients.forEach(item => {
    
        quantity = item.quantity/oldGuest;
        newQuantity = quantity*compute;
        result += `
        <tr>
        <td><img src="${item.iconUrl}" style="width:50px"></td>
        <td id='quantity' class='text-danger'>${newQuantity}</td>
        <td class='text-success'>${item.unit[0]}</td>
        <td>${item.name}</td>
        </tr>
    `;
    $("#ingredient").html(result);
    })
    
 }
