'use strict';

//let attempts=0;
//let maxattempts=25;

let objectArray = []; // array of all objects // each time you create an object it will be pushed auto to the array

function SetImagesObject(name, src) { // constructure to create objects
    this.name = name.split('.')[0]; // I will do it on string it will return an array (I exstracted the name)
    this.src = 'Images/' + src; //'img/'+ src; I want the extension there's no need to do split
    this.clicks = 0;
    this.show = 0;

    objectArray.push(this);
}


// array for image sources 
let imageSrc = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']


// loop for creating objects
for (let i = 0; i < imageSrc.length; i++) {
    let a = new SetImagesObject(imageSrc[i], imageSrc[i]);
}

function randomNumber() { // generate random number
    return (Math.floor(Math.random() * (objectArray.length))); //To get from 0-10
}


/*   ---------------------------
   test random function
// console.log(randomNumber());
*/// ---------------------------


// call elements from html pages
// images
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdImg = document.getElementById('thirdImg');

// btns

let noItemsbtn = document.getElementById('noItemsbtn');

// input texts

let noItems = document.getElementById('noItems');

// --------------------------------------
// created things in the lists
let btnSect = document.getElementById('btnSect');

let newBtn = document.createElement('button');
newBtn.id = 'viewBTN';

let lowerSect = document.getElementById('lowerSect');
// --------------------------------------

//**************************************** */
// set actions for select and clicks
//**************************************** */


//set number of items to buy
let number_of_iterations = ['25'];
noItems.value = number_of_iterations[0];

noItemsbtn.addEventListener('click', noItemsFunction);

function noItemsFunction(event) {
    if ((noItems.value > 0) && (noItems.value <= 25)) {
        number_of_iterations.push(noItems.value);

        number_of_iterations.shift();

        noItems.parentNode.removeChild(noItems);
        let newNo = document.createElement('h4');
        let inputDiv = document.getElementById('inputDiv');
        inputDiv.appendChild(newNo);
        newNo.textContent = number_of_iterations[0];

        newNo.id = 'noItems2';
        // console.log(number_of_iterations);
    } else {
        alert('Number of Items must be more than one and less than 25 items at most');
    }
}


// show images 

let img1, img2, img3; //We will use them later for the clicking (index)
function render() {
    img1 = randomNumber();
    img2 = randomNumber();
    img3 = randomNumber();

    while (img1 === img2 || img1 === img3 || img2 === img3) {
        img1 = randomNumber();
        img2 = randomNumber();
        img3 = randomNumber();
    }

    // console.log(img1);
    // console.log(img2);
    // console.log(img3);

    objectArray[img1].show++;
    objectArray[img2].show++;
    objectArray[img3].show++;

    firstImg.setAttribute('src', objectArray[img1].src); //I will fill the source from where
    //firstImg.setAttribute('title', objectArray[img1].src); //When I hover the name will appear
    secondImg.setAttribute('src', objectArray[img2].src);
    //secondImg.setAttribute('title', objectArray[img2].src);
    thirdImg.setAttribute('src', objectArray[img3].src);
    //thirdImg.setAttribute('title', objectArray[img3].src);
}
render();

/*   ---------------------------
   test show images function
// console.log(objectArray);
*/// ---------------------------



// images clicks 
firstImg.addEventListener('click', clicked); 
secondImg.addEventListener('click', clicked);
thirdImg.addEventListener('click', clicked);

let a = 0;

function clicked(event) { //handelClicks function
//If we need the event we will use it
    a++; //attempts++;
    if (a < parseInt(number_of_iterations[0])) { //attempts<=maxattempts
        if (event.target.id === "firstImg") { 
            objectArray[img1].clicks++; //img1 index
        } else if (event.target.id === "secondImg") {
            objectArray[img2].clicks++; //I'm adding 1 to that object
        } else if (event.target.id === "thirdImg") {
            objectArray[img3].clicks++;
        }
        render();


    } else if (a == parseInt(number_of_iterations[0])) { //else //when I reaced the 10 img
        // firstImg.removeEventListener();
        // secondImg.removeEventListener();
        // thirdImg.removeEventListener();

        if (event.target.id === "firstImg") {
            objectArray[img1].clicks++;
        } else if (event.target.id === "secondImg") {
            objectArray[img2].clicks++;
        } else if (event.target.id === "thirdImg") {
            objectArray[img3].clicks++;
        }
        
        btnSect.appendChild(newBtn);

        newBtn.textContent = 'View Chart';

        firstImg.removeEventListener('click', clicked);
        secondImg.removeEventListener('click', clicked);
        thirdImg.removeEventListener('click', clicked);

    }
    //    console.log(objectArray);
}



// View last results from button 

newBtn.addEventListener('click', view);

function view(event) {

    for (let i = 0; i < objectArray.length; i++) {
        console.log(i);
        let ulEl = document.createElement('ul');
        let liEl = document.createElement('li');

        lowerSect.appendChild(ulEl);
        ulEl.appendChild(liEl);
        liEl.textContent = `${objectArray[i].name} had ${objectArray[i].clicks} votes, and was seen ${objectArray[i].show} times.`;
    }