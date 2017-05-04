function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = cells[j];
                            
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function init(){
    console.log("In Init");
    
    // Init my Canvas Object ( Drawing Board)
    canvas = document.getElementById('mycanvas');
    // Every drawing board comes with a pen.
    pen = canvas.getContext('2d');
    // 2d parameters gives a pen which is capable of drawing in 2d ( x and y axis) 
    W = canvas.width;
    H = canvas.height;
    male=0;
    female=0;
    GAME_OVER=false;
}

function draw(){
    console.log("In Draw");
    // Pen has eraser also
    pen.clearRect(0,0,W,H);
    
    //Change the pen color
    
    pen.fillStyle = "blue";
    // Draw a rectangle using pen
    // Draw the enemies using a for loop
    
    pen.font = "20px Arial";
    pen.fillStyle = "white";
    pen.fillText("Male "+male,20,20);
    pen.fillText("Female"+female,40,20);
}

function update(){
    console.log("In Update");
    male+=1;
    female+=1
    if(male+female==5000){
        GAME_OVER = true;
    }
}

function gameLoop(){
        draw();
        update();
        //Another way of doing this 
        // This will give you best possible frame rate that yo
        // your computer can give.
        // Fr
    
        if(GAME_OVER==false){
            window.requestAnimationFrame(gameLoop);
        }
        else{
            //Prompt is user 
            //confirm("Wanna play again");
            choice = prompt("Wanna play again ?");
            if(choice=="yes"||choice=="YES"||choice=='y'){
                restartGame();
            }
            else{
                alert("Thank You Playing");
            }
        }
}

function restartGame(){
    init();
    gameLoop();
}


// This is starting game
restartGame();
// Will call the gameLoop function after 300 ms
//setInterval(gameLoop,300);



