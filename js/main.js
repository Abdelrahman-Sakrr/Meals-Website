// navHandling Sliding In
	function openNav(){
		$('.myNav').animate({translate:'50%'} , 500)
		$('.exitBtn').css('display', 'block')
		$('.menuButton').css('display' , 'none');
		$('.listStyle').slideDown(1000)
	}
function closeNav(){

		$('.myNav').animate({translate:'0%'} , 500);
		$('.exitBtn').css('display', 'none');
		$('.menuButton').css('display' , 'block');

}
// when document ready show some data
$(document).ready(function(){
	searchByName("");
})
function lookUpFullMealByIdInMainSection(){

	$(".myCategories").on('click' , async function(){
		let y = ($(this).attr('id'));
		// console.log(y);
		let load = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${y}`)
		let finalLoad = await load.json();
		// console.log(finalLoad.meals);
		let content = ``;
		for(let i = 0 ; i < finalLoad.meals.length ; i++){
			content+= `
			<div class="col-md-6">
				<div class="text-center">
					<div class="">
						<img src="${finalLoad.meals[i].strMealThumb}" class="w-75" alt="">
					</div>
					<h3 class="text-white">${finalLoad.meals[i].strMeal}</h3>
				</div>
			</div>
			<div class="col-md-6">
				<div class="text-white">
					<h2>Instructions</h2>
						<p>${finalLoad.meals[i].strInstructions}</p>
						<h4>Area : <span>${finalLoad.meals[i].strArea}</span></h4>
						<h4>Category : <span>${finalLoad.meals[i].strCategory}</span></h4>
						<h4>Recipes :</h4>
						<div class="mealBtns my-2 w-100">
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure1}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure2}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure3}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure4}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure5}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure6}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure7}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure8}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure9}</button>


						</div>
						<h4>Tags :</h4>
						<span class="px-3 py-2 my-2  rounded-3 btn btn-info">Pie</span>
						<br>
						<span class="px-3 py-2  rounded-3 btn btn-danger ">Source</span>
						<span class="px-3 py-2  rounded-3 btn btn-success ">Youtube</span>
					</div>
			</div>
	`
		}
		$('#categoryDetails').css('display' , 'none');
		$('#areas').css('display' , 'none');
		
		document.getElementById('category').innerHTML=content;
	});
}

async function searchByName(){
	$(".mySpinner").css('display' , "block")
	let InputByName =$(".myInput1").val();
	
	let load = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${InputByName}`)
	let finalLoad = await load.json();
	// console.log(finalLoad.meals);
	if(finalLoad.meals){
		displayMeals(finalLoad.meals);
	}
	else{
		InputByName==""
	}


	// console.log(finalLoad.meals);
	// displayMeals(finalLoad.meals);
	$(".mySpinner").css('display' , "none")
}


$("#search").on("click" , function(){
	$(".inputs").css("display" , "block")
})
function displayMeals(finalLoad){

	let content = ``

	for(let i = 0 ;i<finalLoad.length ; i++){

	content += `	<div class="col-md-3 rounded-4 my-2">
						<div class="myCategories myDiv w-100 mine" id='${finalLoad[i].idMeal}'>
							<img src="${finalLoad[i].strMealThumb}" class="w-100 myImage" alt="">
							<div class="myLayer text-center">
								<h2>${finalLoad[i].strMeal}</h2>
							</div>
						</div>
					</div>`;



	}
	document.getElementById('category').innerHTML = content;
	lookUpFullMealByIdInMainSection();
	

}


async function searchByFirstLetter(){
	let InputByFirstLetter =$(".myInput2").val();
	if(InputByFirstLetter==""){
		InputByFirstLetter = "a"
	}
	$(".mySpinner").css('display' , "block")
	let load = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${InputByFirstLetter}`)
	let finalLoad = await load.json();
	
	// console.log(load);
	
	// console.log(finalLoad.meals);
	displayMeals(finalLoad.meals)
	finalLoad.meals ? displayMeals(finalLoad.meals) : displayMeals([])
	$(".mySpinner").css('display' , "none")
}
function closeSearch(){
	$(".inputs").css('display' , "none");
	closeNav()
};
//######################## general function to display Meals ########################



// ######################## start category api functions ########################


$('#categories').on('click' , async function(){
	$(".mySpinner").css('display' , "block")
	let load = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`)
	let finalLoad = await load.json();
	$('.myNav').animate({translate:'0%'} , 500);
	$('.exitBtn').css('display', 'none');
	$('.menuButton').css('display' , 'block');
	displayCategoryMeals(finalLoad.categories);
	loadCategoryDetails();
	closeNav();
	$(".mySpinner").css('display' , "none")

})



function loadCategoryDetails(){
	$(".mySpinner").css('display' , "block")
	$(".myCategories").on("click",async function(){
	let x = $(this).attr('data-id')
	// console.log(x);
	let load = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
	// console.log(load);
	let finalLoad = await load.json();
	// console.log(finalLoad);
displayCategoryDetails(finalLoad.meals);
	})
	$(".mySpinner").css('display' , "none")
}
function displayCategoryMeals(finalLoad){

	let content = ``

	for(let i = 0 ;i < finalLoad.length ; i++){

	content += `	<div class="col-md-3 rounded-4 my-2">
						<div class="myCategories w-100" id='${finalLoad[i].idCategory}' data-id = ${finalLoad[i].strCategory}>
							<img src="${finalLoad[i].strCategoryThumb}" class="w-100 myImage" alt="">
							<div class="myLayer text-center">
								<h2>${finalLoad[i].strCategory}</h2>
								<p>${finalLoad[i].strCategoryDescription}</p>
							</div>
						</div>
					</div>`;



	}
	document.getElementById('category').innerHTML = content;
	lookUpFullMealById();
	

}
function displayCategoryDetails(finalLoad){
		// strMeal
		// strMealThumb
		//idMeal
		let content = ``;
		for(let i = 0; i<finalLoad.length; i++){
			content +=`<div class="col-md-3 rounded-4 my-2" >
						<div class="categoryMeals myDiv w-100" id="${finalLoad[i].idMeal}">
							<img src="${finalLoad[i].strMealThumb}" class="w-100 myImage" alt="">
							<div class="myLayer text-center">
								<h2>${finalLoad[i].strMeal}</h2>
							</div>
						</div>
					</div>`
		}
		$('.Category').css('display', 'none');
		document.getElementById('categoryDetails').innerHTML += content;
		lookUpFullMealById();
		$('.CategoryDetails').css('display' , 'block');
}

// ######################## end category api functions ########################



//######################## start area api functions ########################
$("#area").on('click' , function(){
	areaApi();
	closeNav();
})
async function areaApi(){
	$(".mySpinner").css('display' , "block")
	let load = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
	let finalLoad = await load.json();
	displayAreas(finalLoad.meals);
	$(".mySpinner").css('display' , "none")
}
function displayAreas(finalLoad){
	let content = ``;
	for(let i = 0 ; i<finalLoad.length;i++){
		content += `
		<div class="col-md-3" >
		<div class="text-center text-white m-2 insideAreas" id="${finalLoad[i].strArea}">
			<i class="fa-solid fa-house fs-1"></i>
			<h3 class="m-3 myArea">${finalLoad[i].strArea}</h3>
		</div>
	</div>`
	}	
	document.getElementById('category').innerHTML = ""
	document.getElementById('areas').innerHTML = content

	$(".insideAreas").on('click' , function(){
	displayFoodInsideArea($(this).attr('id'));		
	})		
}
function lookUpFullMealById(){

	$(".myDiv").on('click' , async function(){
		let y  =$(this).attr('id');
		// console.log(x);
		let load = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${y}`)
		// console.log(load);
		let finalLoad = await load.json();
		let content = ``;
		for(let i = 0 ; i < finalLoad.meals.length ; i++){
			content+= `
			<div class="col-md-6">
				<div class="text-center">
					<div class="">
						<img src="${finalLoad.meals[i].strMealThumb}" class="w-75" alt="">
					</div>
					<h3 class="text-white">${finalLoad.meals[i].strMeal}</h3>
				</div>
			</div>
			<div class="col-md-6">
				<div class="text-white">
					<h2>Instructions</h2>
						<p>${finalLoad.meals[i].strInstructions}</p>
						<h4>Area : <span>${finalLoad.meals[i].strArea}</span></h4>
						<h4>Category : <span>${finalLoad.meals[i].strCategory}</span></h4>
						<h4>Recipes :</h4>
						<div class="mealBtns my-2 w-100">

							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure1}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure2}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure3}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure4}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure5}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure6}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure7}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure8}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure9}</button>
						</div>
						<h4>Tags :</h4>
						<span class="px-3 py-2 my-2  rounded-3 btn btn-info">Pie</span>
						<br>
						<span class="px-3 py-2  rounded-3 btn btn-danger ">Source</span>
						<span class="px-3 py-2  rounded-3 btn btn-success ">Youtube</span>
					</div>
			</div>
	`

		}
		$('#categoryDetails').css('display' , 'none');
		$('#areas').css('display' , 'none');

		document.getElementById('showSingleMeal').innerHTML=content
	});

	
	
}
async function displayFoodInsideArea(x){
		let load = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
		let finalLoad = await load.json();
		// console.log(finalLoad.meals);
		let content = ``;
		for(let i = 0;i<finalLoad.meals.length; i++){
			content+=`<div class="col-md-3 rounded-4 my-2">
						<div class="myCategories w-100 myDiv" id="${finalLoad.meals[i].idMeal}">
							<img src="${finalLoad.meals[i].strMealThumb}" class="w-100 myImage" alt="">
							<div class="myLayer text-center">
								<h2>${finalLoad.meals[i].strMeal}</h2>
							</div>
						</div>
					</div>`
		}
		// console.log(content);
		document.getElementById("areas").innerHTML = content;
		lookUpFullMealById();
		closeNav();
}
	//######################## end area api functions ########################


{/*	//######################## start ingredintes  api functions ######################## */}
async function ingredintesList(){
	$(".mySpinner").css('display' , "block")
	let load = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
	let finalLoad = await load.json();
	closeNav();
		displayIngredintes(finalLoad.meals.slice(0,20));
		$(".mySpinner").css('display' , "none")
		// $(this).attr('id')

} 

function displayIngredintes(finalLoad){
    let content = ``;
    for (let i = 0; i < finalLoad.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${finalLoad[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${finalLoad[i].strIngredient}</h3>
                        <p>${finalLoad[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
	document.getElementById('category').innerHTML = ""
	document.getElementById("ingredintesContent").innerHTML=content
}
async function getIngredientsMeals(ingredients) {
	$(".mySpinner").css('display' , "block")
    let load = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    // console.log(load);
	finalLoad = await load.json()
	// console.log(finalLoad);
    displayInsideIngredintes(finalLoad.meals)
	$(".mySpinner").css('display' , "none")
}
function displayInsideIngredintes(finalLoad){
	let content = ``
	for(let i = 0 ;i < finalLoad.length ; i++){
	content += `	<div class="col-md-3 rounded-4 my-2">
						<div class="myCategories w-100" id='${finalLoad[i].idMeal}' >
							<img src="${finalLoad[i].strMealThumb}" class="w-100 myImage" alt="">
							<div class="myLayer text-center">
								<h2>${finalLoad[i].strMeal}</h2>
								
							</div>
						</div>
					</div>`;
	}
	document.getElementById('category').innerHTML = ""
	document.getElementById('areas').innerHTML = ""
	document.getElementById("ingredintesContent").innerHTML=content
	lookUpFullMealByIdIngredintes();
}

function lookUpFullMealByIdIngredintes(){

	$(".myCategories").on('click' , async function(){
		
		let y = ($(this).attr('id'));
		// console.log(y);
		let load = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${y}`)
		let finalLoad = await load.json();
		// console.log(finalLoad.meals);


		let content = ``;
		for(let i = 0 ; i < finalLoad.meals.length ; i++){
			content+= `
			<div class="col-md-6">
				<div class="text-center">
					<div class="">
						<img src="${finalLoad.meals[i].strMealThumb}" class="w-75" alt="">
					</div>
					<h3 class="text-white">${finalLoad.meals[i].strMeal}</h3>
				</div>
			</div>
			<div class="col-md-6">
				<div class="text-white">
					<h2>Instructions</h2>
						<p>${finalLoad.meals[i].strInstructions}</p>
						<h4>Area : <span>${finalLoad.meals[i].strArea}</span></h4>
						<h4>Category : <span>${finalLoad.meals[i].strCategory}</span></h4>
						<h4>Recipes :</h4>
						<div class="mealBtns my-2 w-100">

							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure1}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure2}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn ">${finalLoad.meals[i].strMeasure3}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure4}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure5}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure6}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure7}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure8}</button>
							<button class="px-3 py-2  m-3 rounded-3 myMealRecBtn">${finalLoad.meals[i].strMeasure9}</button>
						</div>
						<h4>Tags :</h4>
						<span class="px-3 py-2 my-2  rounded-3 btn btn-info">Pie</span>
						<br>
						<span class="px-3 py-2  rounded-3 btn btn-danger ">Source</span>
						<span class="px-3 py-2  rounded-3 btn btn-success ">Youtube</span>
					</div>
			</div>
	`

		}
		$('#categoryDetails').css('display' , 'none');
		$('#areas').css('display' , 'none');
		// console.log(content);
		document.getElementById("ingredintesContent").innerHTML='';
		document.getElementById('showSingleMeal').innerHTML=content;
	});
}


/*	//######################## end ingredintes  api functions ######################## */



//######################## start contact us ########################
function ContactUs(){
	$("section").css("display" , "none")
	$(".form").css("display" , "block")
	closeNav();
}
function NameRegex(){
	let nameReg = /^[a-z0-9A-Z_-]{3,15}$/
	if(nameReg.test($(".name").val())){
		$(".name").addClass("is-valid")
		$(".name").removeClass("is-invalid")
	}else{
		$(".name").removeClass("is-valid")
		$(".name").addClass("is-invalid")	
	}
	return nameReg.test($(".name").val())
}
function EmailRegex(){
	let emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
	if(emailReg.test($(".email").val())){
		$(".email").addClass("is-valid")
		$(".email").removeClass("is-invalid")
	}else{
		$(".email").removeClass("is-valid")
		$(".email").addClass("is-invalid")	
	}
	return emailReg.test($(".email").val())
}
function PhoneRegex(){
	let phoneReg = /^[0,1][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
	if(phoneReg.test($(".phone").val())){
		$(".phone").addClass("is-valid")
		$(".phone").removeClass("is-invalid")
	}else{
		$(".phone").removeClass("is-valid")
		$(".phone").addClass("is-invalid")	
	}
	return phoneReg.test($(".phone").val())
}
function PasswordRegex(){
	let passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
	if(passReg.test($(".password").val())){
		$(".password").addClass("is-valid")
		$(".password").removeClass("is-invalid")
	}else{
		$(".password").removeClass("is-valid")
		$(".password").addClass("is-invalid")	
	}
	return passReg.test($(".password").val())
}
function AgeRegex(){
	let ageReg = /^(?:1[01][0-9]|120|1[8-9]|[2-9][0-9])$/
	if(ageReg.test($(".age").val())){
		$(".age").addClass("is-valid")
		$(".age").removeClass("is-invalid")
	}else{
		$(".age").removeClass("is-valid")
		$(".age").addClass("is-invalid")	
	}
	return ageReg.test($(".age").val())
}
function RePasswordRegex(){
	let rePassReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
	if(rePassReg.test($(".repassword").val())){
		$(".repassword").addClass("is-valid")
		$(".repassword").removeClass("is-invalid")
	}else{
		$(".repassword").removeClass("is-valid")
		$(".repassword").addClass("is-invalid")	
	}
	return rePassReg.test($(".repassword").val())
}



function SubmitForm(){

	if (NameRegex() &&
EmailRegex() &&
PhoneRegex() &&
AgeRegex() &&
PasswordRegex() &&
RePasswordRegex()) {
	Swal.fire({
		icon: "success",
		title: "Good job!",
		text: "You Submitted the Form Successfully!",
	  });
	  
}
else{
Swal.fire({
		icon: "error",
		title: "Oops...",
		text: "Something went wrong!",
	  });
}

}
////######################## end contact us ########################
