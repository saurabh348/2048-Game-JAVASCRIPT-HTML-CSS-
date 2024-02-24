var board;
var score=0;
var rows=4;
var columns = 4;

window.onload = 
function(){
    setGame();
}

function setGame(){
    board = [
       [0,0,0,0],
       [0,0,0,0],
       [0,0,0,0],
       [0,0,0,0]
    ]
    for(let r=0; r<rows;r++){
        for(let c=0;c<columns;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString(); //setting id to created element
            let num = board[r][c];
            updateTile(tile,num);  //update tile class depending on new num\
            document.getElementById("board").append(tile);
        }
        
    }
    setTwo(); 
        setTwo(); 
    function updateTile(tile, num){
        tile.innerText="";
        tile.classList.value="";  // clear the classlist "tile x2 x4 x8"
        tile.classList.add("tile");
        if (num>0){
           tile.innerText = num;
           if (num<=4096){
            tile.classList.add("x"+num.toString());
           } 
           else{
            tile.classList.add("x8192");
           }
        }
        
    }
        document.addEventListener("keyup", (e)=>{
            if (e.code=="ArrowLeft"){
                    slideLeft();
                    setTwo();
            }
            else if (e.code=="ArrowRight"){
                slideRight();
                setTwo();
            }
            else if (e.code=="ArrowUp"){
                slideUp();  
                setTwo();  
        }
        else if (e.code=="ArrowDown"){
            slideDown(); 
            setTwo();   
    }
        })   
        
function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if (board[r][c]==0){
                return true;
            }
        }

    }
    return false;
}
        function setTwo(){
            if(!hasEmptyTile()){
                return;
            }
            
            let found = false;
            while (!found){
                let r = Math.floor((Math.random())* rows); //Math.random returns a number between 0 and 1
                let c = Math.floor((Math.random())* columns); 
                
                if(board[r][c]==0){
                    board[r][c] = 2;
                    let tile = document.getElementById(r.toString()+"-"+c.toString());
                    tile.innerText="2";
                    tile.classList.add("x2");
                    found = true;
                }
               
                
               
                
            }
          

        }

        function filterZero(row){
            return row.filter(num => num!=0);  //create a new array without zeroes
        }

        function slide(row){
            row = filterZero(row);  // 2)get rid of zeroes  ie [2,2,2]

            for(let i =0;i<row.length-1;i++){     //3)after this: [4,0,2]
                if (row[i] == row[i+1]){
                    row[i]*=2;
                    row[i+1] = 0; 
                    score+=row[i];
                    document.getElementById("score").innerText=score;   
                }    
            }
            row = filterZero(row);   //4) after this: [4,2]
            
            while (row.length<columns){
                row.push(0);      //5) after this: [4,2,0,0]
            }
            return row;
        }

        function slideLeft(){
            for(r=0;r<rows;r++){   //eg: 1)let row is [2,2,2,0]
                let row = board[r];
                row = slide(row);
                board[r] = row;

                for(c=0;c<columns;c++){
                   tile = document.getElementById(r.toString()+"-"+c.toString());
                   num = board[r][c]; 
                   updateTile(tile,num);
                }
            }
        }

        function slideRight(){
            for(r=0;r<rows;r++){   //eg: 1)let row is [2,2,2,0]
                let row = board[r];
                row.reverse();
                row = slide(row);
                row.reverse();
                board[r] = row;

                for(c=0;c<columns;c++){
                   tile = document.getElementById(r.toString()+"-"+c.toString());
                   num = board[r][c]; 
                   updateTile(tile,num);
                }
            }
        }

        function slideUp(){
                for (c=0;c<columns;c++){
                   let row = [board[0][c], board[1][c], board[2][c],board[3][c]];
                   row = slide(row);
                   board[0][c]=row[0];
                   board[1][c]=row[1];
                   board[2][c]=row[2];
                   board[3][c]=row[3];
                   
                   for(r=0;r<rows;r++){
                    tile = document.getElementById(r.toString()+"-"+c.toString());
                    num = board[r][c]; 
                    updateTile(tile,num);
                 }
                    
                   
                }
        }

        function slideDown(){
            for (c=0;c<columns;c++){
               let row = [board[0][c], board[1][c], board[2][c],board[3][c]];
               row.reverse();
               row = slide(row);
               row.reverse();
               board[0][c]=row[0];
               board[1][c]=row[1];
               board[2][c]=row[2];
               board[3][c]=row[3];
               
               for(r=0;r<rows;r++){
                tile = document.getElementById(r.toString()+"-"+c.toString());
                num = board[r][c]; 
                updateTile(tile,num);
             }
                
               
            }
    }
}