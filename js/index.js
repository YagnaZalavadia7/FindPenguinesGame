var sc=0, highScore=0;
var pos = [1,2,3,4,5,6,7,8,9];
var see =[0,0,0,0,0,0,0,0,0];



$(document).ready( function()
{
    $('.penguin').hide();
    begin();     
    $('#resetBtn').click(()=>
    {
       $('.penguin').removeAttr('style');
       $('.penguin').on('click');
       $('#messageBox').css('display','none');
       startGame();
       see =[0,0,0,0,0,0,0,0,0];
       sc=0;
       $('#usc').text(sc);
    });
});

function startGame() 
{
    randomPeng(pos);
    console.log(pos);
    $('.penguin').click(function() 
    {
        var id = $(this).attr('id')

         if(pos[id-1]!=9){
         $('#'+id).css('background-image','url("images/penguin_'+pos[id-1]+'.png")');
         sc+=10;
         see[id-1]=1;
         $(this).off('click'); 
         correctAudio();
         win();
         if(sc>highScore)
         {
            highScore=sc;
            $('#highScore').text(highScore);
         }
         $('#usc').text(sc);
         }
         else
         {
            $('#'+id).css('background-image','url("images/yeti.png")');
            wrongAudio();
            for (var x=0; x<9; x++)
             {
                var id = x+1;
                if (see[x]==1) 
                {
                    $('#'+ id).animate({opacity:'0'}, 1000);    
                }
            }
            $('.penguin').off('click');
            lost();
         }  
    });   
}


function win() {
    if(sc==8){
        $('.penguin').off('click');
        $('#messageBox').css('display','block');
        $('#message').html('Congratulations!!');
        $('#yourScore').html('Your score = '+sc); 
        previewAudio();
    }
}



function lost() {
    $('#messageBox').css('display','block');
    $('#message').html('Yarrrrrrr....');
    $('#yourScore').html('Your score = '+sc);  
    $('#usc').text(sc);
//    alert("Yaaaarrrr!\nYour Score : "+sc  );
}

function randomPeng(arg) {
    arg.sort(()=> {
        return Math.random()-0.5;
    });
}



function wrongAudio() {  
    var audio = {};
    audio = new Audio();
    audio.src = 'audio/wrong.mp3';
    audio.play();
}

function correctAudio() {
    var audio = {};
    audio = new Audio();
    audio.src = 'audio/correct.mp3';
    audio.play();
}

function previewAudio() {
    var audio = {};
    audio = new Audio();
    audio.src = 'audio/preview.mp3';
    audio.play();
}

function begin(){
    $('.penguin').show();
    startGame();
}


