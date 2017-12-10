var numSquares = 6;
var colors = [];
var pickedColor; //goal color
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    //difficulty level event listeners
    setupModeButtons();
    setupSquares();
    reset(); //will pick colors and set everything up
}

function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //ternary operator does same as if/else
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        //looping [i] thru each item in array 'colors'
        //gives index space 0 of 'squares' the properties of index space 0 in 'colors'.
        //add click listeners to squares:
        squares[i].addEventListener("click", function(){
        //grab color of clicked square
        var clickedColor = this.style.background; //this = clicked square
        //compare color to picked square
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!"
            resetButton.textContent = "Play again?"
            changeColors(clickedColor); //calls function from below to change all squares to correct color
            h1.style.background = clickedColor; //changes h1 bg to clickedColor
        } else {
            this.style.background = "#232323" //changes wrong square to bg color
            messageDisplay.textContent = "Try Again"
        }
        });
    }
}

function reset(){
    //on click, generate new colors
    colors = generateRandomColors(numSquares);
    //pick new random color from arr
    pickedColor = pickColor();
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //loop thru 6 squares, check if there is matching color,
    //if so, set bg color to same as from array colors[i]
    //last 3 squares, colors[i] will be none
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block"; //brings bag last 3 squares
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "#steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
})

function changeColors(color){
    //loop thru all squares
    for(var i = 0; i < squares.length; i++){
    //change each color to match given color
    squares[i].style.background = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length); //generate random #, then * by length of colors array
    return colors[random];
}

function generateRandomColors(num){
    //make array
    var arr = []
    //repeat num times
    for(var i = 0; i < num; i++){ //calls 6 times
        //get random color, push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor(){
    //pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"; //creating random # from above vars
}


// //putting both easyBtn and hardBtn into one loop
// for(var i = 0; i < modeButtons.length; i++){
//     modeButtons[i].addEventListener("click", function(){
//         modeButtons[0].classList.remove("selected");
//         modeButtons[1].classList.remove("selected");
//         this.classList.add("selected");
//         //ternary operator does same as if/else
//         this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
//         reset();
//         //pick new colors
//
//         //pick a new pickedColor
//
//         //update page to reflect changes
//     });
// }
//putting all of the reset functions into one function to be called

// easyBtn.addEventListener("click", function(){
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++){
//         if(colors[i]){
//             squares[i].style.background = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// });
//
// hardBtn.addEventListener("click", function(){
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++){
//             squares[i].style.background = colors[i];
//             squares[i].style.display = "block";
//     }
// });

// resetButton.addEventListener("click", function(){
//     reset();
    //cleaned up w/ reset function above

    // //on click, generate new colors
    // colors = generateRandomColors(numSquares);
    // //pick new random color from arr
    // pickedColor = pickColor();
    // //change colorDisplay to match pickedColor
    // colorDisplay.textContent = pickedColor;
    // //change colors of squares
    // this.textContent = "New Colors";
    // messageDisplay.textContent = "";
    // for(var i = 0; i < squares.length; i++){
    //     squares[i].style.background = colors[i];
    // }
    // h1.style.background = "#steelblue";
// })

// for(var i = 0; i < squares.length; i++){
//     //looping [i] thru each item in array 'colors'
//     //gives index space 0 of 'squares' the properties of index space 0 in 'colors'
//
//     //add click listeners to squares
//     squares[i].addEventListener("click", function(){
//     //grab color of clicked square
//     var clickedColor = this.style.background; //this = clicked square
//     //compare color to picked square
//     if(clickedColor === pickedColor){
//         messageDisplay.textContent = "Correct!"
//         resetButton.textContent = "Play again?"
//         changeColors(clickedColor); //calls function from below to change all squares to correct color
//         h1.style.background = clickedColor; //changes h1 bg to clickedColor
//     } else {
//         this.style.background = "#232323" //changes wrong square to bg color
//         messageDisplay.textContent = "Try Again"
//     }
//     });
// }
