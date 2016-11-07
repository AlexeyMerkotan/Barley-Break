(function($){

    options = $.extend({
        defColor:"#F0F8FF",
        hoverColor:"#FAEBD7"
    });


    size=15;

    moves=0;

    field=4;

    timer=0;

    name_picture="American_beauty_by_edwheeler_";

    type_picture="jpg";




    function Puzzle(plagin,options) {


        this.init(plagin);

    }



    Puzzle.prototype.hover=function  () {


        $(this).css("background",options.defColor)
            .mouseenter( function(){
                $(this).css("background",options.hoverColor);
            })
            .mouseleave( function(){
                $(this).css("background",options.defColor);
            });
    }
    Puzzle.prototype.click=function () {
        if(moves==0)
            timer = new Date().getTime();
        var a=$(this).attr('id');
        var namber=$.makeArray($(".bl"));
        var j=0;
        for(j=0; j<=namber.length; j++)
            if(namber[j].id==a)
                break;
        var i=0
        for(i=0; i<=namber.length; i++)
            if(namber[i].id=="")
                    break;
        if(!Puzzle.prototype.checkGames(namber)){
           moves++;
            if(Puzzle.prototype._set(i,j)){
                namber[i].id=a;
                Puzzle.prototype._shift(this,a);
            }
        }else{
            Puzzle.prototype.game_end();
        }


    }



    Puzzle.prototype.Time=function () {



    }

    
    Puzzle.prototype.game_end=function()
    {
        alert("Игра окончина!\n Xодов: " + moves + " \n Игровое время: " + result);
        var title = prompt('Name: ');
        $.post("save.php", { name: title, time: result ,move: moves});
    }



    Puzzle.prototype._shift=function (plagin,id) {
        $(".bl").addClass("block_color");
        $(plagin).removeAttr("id "+id);
        $("#"+id).html('<img src="/img/American_beauty_by_edwheeler_'+id+'.jpg">');
        $(plagin).removeClass("block_color");
        $(plagin).empty();
        $(".badge").empty();
        $(".badge").html(moves);

    }

    Puzzle.prototype._set=function (i,j) {

        if( Puzzle.prototype._left(i,j) && Puzzle.prototype._right(i,j))
            if(j==i+1||j==i-1||j==i+field||j==i-field)
                return true;
        return false;
    }


    Puzzle.prototype._left=function (i,j) {
        if((i+1)%field==0) {
            if(j%field==0)
                return false;
        }
        return true;
    }


    Puzzle.prototype._right=function (i,j) {
        if((j+1)%field==0){
            if(i%field==0)
                return false;
        }
        return true;
    }


    Puzzle.prototype.checkGames=function (namber) {
        for(var i=0; i<namber.length; i++){
            if(namber[i].innerText!=i+1){
                return false;
            }
        }
        return true;
    }

    Puzzle.prototype.random=function () {

        var i=[];
        for(var a=0; a<=size;a++)
            i.push(a);
        for (var a = i, b = size; 0 < b; b--) {
            var e = Math.floor(Math.random() * (b + 1)),
                g = i[e];
            i[e] = i[b];
            i[b] = g
        }
        return i;

    }



    Puzzle.prototype.Moves=function (moves) {
        var scroll_bar='<ul class="nav nav-pills" role="tablist">'+
            '<li role="presentation">Ход : <span class="badge">'+moves+'</span></li>'+
            '<li role="presentation">Время : <span class="badge">'+timer+'</span></li>'+
            '</ul>';
        return scroll_bar;
    }
    Puzzle.prototype.Start=function () {

        moves=0;
        $('.block').empty();
        var elements=Puzzle.prototype.random();

        for(var i=0; i<elements.length; i++){
            if(elements[i]){
                var a=$('<div class="bl block_color" id="'+elements[i]+'"><img src="/img/'+name_picture+elements[i]+'.'+type_picture+'" alt="/img/'+name_picture+elements[i]+'.'+type_picture+'"></div>').appendTo('.block');
            }
            else{
                var a=$('<div class="bl"></div>').appendTo('.block');
            }
            a.click(Puzzle.prototype.click);

        }
        $(".block").css("background-image","url(/img/American_beauty_by_edwheeler.jpg)");
        $(".block").css("background-size"," cover");
        var restart=$('<div class="scrol_bar"><button type="button" class="btn btn-default">Restart</button></div>').appendTo('.block');
        restart.click(Puzzle.prototype.Start);
        $(Puzzle.prototype.Moves(moves)).appendTo(".scrol_bar");

    }
    Puzzle.prototype.init = function(plagin) {


        for(var i=0; i<=size; i++){
            $('<div class="bl block_color"><img src="/img/'+name_picture+(i+1)+'.'+type_picture+'" alt="/img/'+name_picture+(i+1)+'.'+type_picture+'"></div>').appendTo(plagin);
        }
        var start=$('<button type="button" class="btn btn-default">Start</button>').appendTo(plagin);


        start.click(this.Start);


    }


    $.fn.build_puzzle=function (options) {




        new Puzzle(this);

    }



})(jQuery);





$('.block').build_puzzle();


