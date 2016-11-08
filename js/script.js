(function($){



    moves=0;

    timer=0;

    hour=0;

    minutes=0;

    var options=[];




    function Puzzle(plagin,option) {

        options=option;
        this.init(plagin,option);

    }

    Puzzle.prototype.language=function () {

    }
    Puzzle.prototype.click=function () {
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






    Puzzle.prototype.game_end=function()
    {
        var result=hour+' h:'+minutes+' m:'+timer+' s';
        alert(options.game_end+"!\n "+options.move+": " + moves + " \n "+options.timer+": " + result);
        var title = prompt('Name: ');
        $.post("save.php", { name: title, time: result ,move: moves});
    }



    Puzzle.prototype._shift=function (plagin,id) {
        $(".bl").addClass("block_color");
        $(plagin).removeAttr("id "+id);
        $("#"+id).css("background-position",plagin.style.backgroundPosition);
        $("#"+id).css("background-image",plagin.style.backgroundImage);
        $(plagin).attr('style', 'background-position: 99% 99%');
        $(plagin).removeClass("block_color");
        $(plagin).empty();
        $(".badge").empty();
        $(".badge").html(moves);

    }

    Puzzle.prototype._set=function (i,j) {

        if( Puzzle.prototype._left(i,j) && Puzzle.prototype._right(i,j))
            if(j==i+1||j==i-1||j==i+options.field||j==i-options.field)
                return true;
        return false;
    }


    Puzzle.prototype._left=function (i,j) {
        if((i+1)%options.field==0) {
            if(j%options.field==0)
                return false;
        }
        return true;
    }


    Puzzle.prototype._right=function (i,j) {
        if((j+1)%options.field==0){
            if(i%options.field==0)
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


        for (var a = $.makeArray($("div .bl")), b =a.length-1 ; 0 < b; b--) {
            var e = Math.floor(Math.random() * (b + 1)),
                g = a[e];
            a[e] = a[b];
            a[b] = g
        }
        return a;

    }


    Puzzle.prototype.Moves=function () {
        var scroll_bar='<ul class="nav nav-pills" role="tablist" style="padding-top: 10px;">'+
            '<li>'+options.move+' : <span class="badge">'+moves+'</span></li>'+
            '<li>'+options.timer+' : <span class="label label-default" id="count">0h: 0m: 0s</span></li>'+
            '</ul>';
        return scroll_bar;
    }



    Puzzle.prototype.Timer=function () {
        if(minutes==59) {
            hour++;
            minutes=0;
        }
        if(timer==59) {
            minutes++;
            timer=0;
        }
                timer++;
                $('#count').html(hour+'h: '+minutes+'m: '+timer+'s');
                setTimeout(arguments.callee, 1000);
    }


    Puzzle.prototype.Remove=function () {
        moves=0;
        timer=0;

    }
    Puzzle.prototype.Start=function () {

        Puzzle.prototype.Remove();
        var elements=Puzzle.prototype.random();
        $('.block').empty();
        for(var i=0; i<elements.length; i++){
            if(elements[i].id!=15){
                var a=$(elements[i]).appendTo('.block');
            }
            else{
                var a=$('<div class="bl" style="background-position: '+elements[i].style.backgroundPosition+'"></div>').appendTo('.block');
            }
            a.click(Puzzle.prototype.click);

        }

        $(".block").css("background-image","url(/img/"+options.transparency+")");
        $(".block").css("background-size"," cover");






        var buttom='<div class="scrol_bar"><button type="button" class="btn btn-default">'+options.buttom_2+'</button></div>';

        var restart=$(buttom).appendTo('.block');
        restart.click(Puzzle.prototype.Start);
        restart.load( Puzzle.prototype.Timer());

        $(Puzzle.prototype.Moves()).appendTo(".scrol_bar");


    }
    Puzzle.prototype.init = function(plagin,options) {




        for(var i=0; i<=options.size; i++)
                $('<div class="bl block_color" id="'+i+'"></div>').appendTo('.block');

        var y=0;
        var id=0;
        for(var i=0;i<options.field;i++){
            var x=0;
            for(var j=0;j<options.field;j++){
                $("#"+id).css("background-image","url(/img/"+options.img+")");
                $("#"+id).css("background-position",""+x+"% "+y+"%");

                x+=(132/options.field);
                id++;
            }
            y+=(132/options.field);
        }

        var buttom='<button type="button" class="btn btn-default">'+options.buttom_1+'</button>';
        var start=$(buttom).appendTo(plagin);

        start.click(this.Start);


    }


    $.fn.build_puzzle=function (options) {


        options = $.extend({
            buttom_1: 'Start',
            buttom_2: 'Restart',
            move:   'Ход',
            timer:  'Время',
            game_end:   'Игра окончина',
            size:   15,
            field:  4,
            img:"American_beauty_by_edwheeler1.jpg",
            transparency:"American_beauty_by_edwheeler.jpg",
        },options);


        new Puzzle(this,options);

    }



})(jQuery);





$('.block').build_puzzle({buttom_1 : 'Play'});


