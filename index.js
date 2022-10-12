var rows=3;
var columns=3;

var currTile;
var otherTile;

var turns=0;

// var imgOrder=["00", "01", "02", "10", "11", "12", "20", "21", "22"];
var imgOrder=["00", "12", "10", "20", "11", "21", "02", "01", "22"];

window.onload=function(){
    for(var i=0; i<rows; i++){
        for(var j=0; j<columns; j++){

            //<img id="0-0" src="Images/00.png"></img>
            var tile=document.createElement("img");
            tile.id=i.toString()+"-"+j.toString();
            tile.src="Images/"+imgOrder.shift()+".png";
            
            //Drag Functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile=this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(e){
    e.preventDefault();
}

function dragDrop(){
    otherTile=this;
}

function dragEnd(){
    if(!otherTile.src.includes("22")){
        return;
    }

    var currCoords=currTile.id.split("-");
    var x1=parseInt(currCoords[0]);
    var y1=parseInt(currCoords[1]);

    var otherCoords=otherTile.id.split("-");
    var x2=parseInt(otherCoords[0]);
    var y2=parseInt(otherCoords[1]);

    var moveLeft=x1==x2 && y2==y1-1;
    var moveRight=x1==x2 && y2==y1+1;
    var moveUp=x1-1==x2 && y2==y1;
    var moveDown=x1+1==x2 && y2==y1;

    var isAdjacent=moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        var currImg=currTile.src;
        var otherImg=otherTile.src;
    
        currTile.src=otherImg;
        otherTile.src=currImg;

        turns++;
        document.getElementById("turns").innerHTML=turns;
    }
}