(function($){





    var options=[];



    function Puzzle(plagin,option) {


        plag=Puzzle.prototype;

        Puzzle.prototype.moves=0;

        Puzzle.prototype.timer=0;

        Puzzle.prototype.hour=0;

        Puzzle.prototype.minutes=0;

        options=option;
        this.init(plagin,option);

    }

    Puzzle.prototype.click=function () {


        var a=$(this).attr('class');
        a = a.replace(/\D+/g,"");
        var block=this.parentNode.classList[0];
        var namber=$.makeArray($("."+block+" .bl"));
        var j=0;
        for(j=0; j<=namber.length; j++)
            if ($(namber[j]).is(".id"+a))
                break;
        var i=0
        for(i=0; i<=namber.length; i++)
            if ($(namber[i]).is(".id"))
                    break;
        if(!Puzzle.prototype.checkGames(namber)){
            Puzzle.prototype.moves++;
            if(Puzzle.prototype._set(i,j)){
                //namber[i].id=a;
                Puzzle.prototype._shift(block,this,a);
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



    Puzzle.prototype._shift=function (block,plagin,id) {
        $("."+block+" .id").addClass("block_color");
        $("."+block+" .id").addClass("id"+id);


        $(plagin).removeClass("id"+id);
        $(plagin).removeClass("block_color");
        $(plagin).addClass("id");

        $(".id"+id).removeClass("id");


        $("."+block+" .id"+id).css("background-position",plagin.style.backgroundPosition);
        $("."+block+" .id"+id).css("background-image",plagin.style.backgroundImage);
        $(plagin).css("background-position","99% 99%");
        $(plagin).css("background-image","");

        $(plagin).empty();
        $("."+block+" .badge").empty();
        $("."+block+" .badge").html(Puzzle.prototype.moves);

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




    Puzzle.prototype.Moves=function () {

        var scroll_bar='<ul class="nav nav-pills" role="tablist" style="padding-top: 10px;">'+
            '<li>'+options.move+' : <span class="badge">'+  this.moves+'</span></li>'+
            '<li>'+options.timer+' : <span class="label label-default count">0h: 0m: 0s</span></li>'+
            '</ul>';
        return scroll_bar;
    }



    Puzzle.prototype.Timer=function () {
        if(plag.minutes==59) {
            plag.hour++;
            plag.minutes=0;
        }
        if(plag.timer==59) {
            plag.minutes++;
            plag.timer=0;
        }
        plag.timer++;
        $('.count').html(plag.hour+'h: '+plag.minutes+'m: '+plag.timer+'s');
        setTimeout(arguments.callee, 1000);
    }


    Puzzle.prototype.random=function (plagin) {

        var block=plagin.parentNode.classList[0];
        for (var a = $.makeArray($("."+block+" .bl")), b =a.length-1 ; 0 < b; b--) {
            var e = Math.floor(Math.random() * (b + 1)),
                g = a[e];
            a[e] = a[b];
            a[b] = g
        }
        return a;

    }

    Puzzle.prototype.Remove=function () {
        Puzzle.prototype.moves=0;
        Puzzle.prototype.timer=0;
        Puzzle.prototype.minutes=0;
        Puzzle.prototype.hour=0;

    }
    Puzzle.prototype.Start=function () {

        //Puzzle.prototype.Remove();
        Puzzle.prototype.init;

        var elements=Puzzle.prototype.random(this);
        var block=this.parentNode.classList[0];
        $('.'+block).empty();
        for(var i=0; i<elements.length; i++){

            if (!$(elements[i]).is(".id"+options.size)) {
                var a=$(elements[i]).appendTo('.'+block);
            } else {
                var a=$('<div class="bl id" style="  width:'+100/options.field+'%; height: '+100/options.field+'%;     background-position: '+elements[i].style.backgroundPosition+'"></div>').appendTo('.'+block);
            }

            a.click(Puzzle.prototype.click);



        }

        $('.'+block).css("background-image","url(/img/"+options.transparency+")");
        $('.'+block).css("background-size"," cover");






        var buttom='<div class="scrol_bar_'+block+'"><button type="button" class="btn btn-default">'+options.buttom_2+'</button></div>';

        var restart=$(buttom).appendTo('.'+block);
        restart.click(Puzzle.prototype.Start);
        restart.load( Puzzle.prototype.Timer());

        $(Puzzle.prototype.Moves()).appendTo(".scrol_bar_"+block);


    }
    Puzzle.prototype.init = function(plagin,options) {



        $(plagin.selector).addClass('blocks');



        for(var i=0; i<=options.size; i++)
                $('<div class="bl block_color id'+i+'"></div>').appendTo(plagin);

        $(plagin.selector+" .bl").css("background-size",options.field+"00%");
        $(plagin.selector+" .bl").css("width",100/options.field+"%");
        $(plagin.selector+" .bl").css("height",100/options.field+"%");
        var y=0;
        var id=0;
        for(var i=0;i<options.field;i++){
            var x=0;
            for(var j=0;j<options.field;j++){
                $(plagin.selector+" .id"+id).css("background-image","url(/img/"+options.img+")");
                $(plagin.selector+" .id"+id).css("background-position",""+x+"% "+y+"%");

                x+=(100/(options.field-1));
                id++;
            }
            y+=(100/(options.field-1));
        }

        var buttom='<button type="button" class="btn btn-default">'+options.buttom_1+'</button>';
        var start=$(buttom).appendTo(plagin.selector);

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







