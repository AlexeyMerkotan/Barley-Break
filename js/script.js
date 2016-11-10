(function($){





    var options=[];


    function Puzzle(plagin,option) {


        var plag = this;

        plag.moves=0;

        plag.timer=0;

        plag.hour=0;

        plag.minutes=0;

        plag.field=0;

        plag.timeoutId;

        options=option;
        this.init(plagin,option);

    }

    Puzzle.prototype.Click=function (plagin,p,th) {

        var a=$(th).attr('class');
        a = a.replace(/\D+/g,"");
        var block=plagin.selector;
        var namber=$.makeArray($(block+" .bl"));
        var j=0;
        for(j=0; j<=namber.length; j++)
            if ($(namber[j]).is(".id"+a))
                break;
        var i=0
        for(i=0; i<=namber.length; i++)
            if ($(namber[i]).is(".id"))
                    break;

            p.moves++;
            if(this._set(i,j)){
                this._shift(block,th,a,p);
            }
        if(this.checkGames(namber)){
            this.game_end(p);
        }


    }






    Puzzle.prototype.game_end=function(p)
    {
        var result=p.hour+' h:'+p.minutes+' m:'+p.timer+' s';
        alert(options.game_end+"!\n "+options.move+": " + p.moves + " \n "+options.timer+": " + result);
        var title = prompt('Name: ');
        $.post("save.php", { name: title, time: result ,move: moves});
    }



    Puzzle.prototype._shift=function (block,plagin,id,p) {
        $(block+" .id").addClass("id"+id);


        $(plagin).removeClass("id"+id);
        $(plagin).addClass("id");

        $(".id"+id).removeClass("id");


        $(block+" .id"+id).css("background-position",plagin.style.backgroundPosition);
        $(block+" .id"+id).css("background-image",plagin.style.backgroundImage);
        $(block+" .id"+id).css("background-size",plagin.style.backgroundSize);
        $(plagin).css("background-position","99% 99%");
        $(plagin).css("background-image","");

        $(plagin).empty();

        $(block+" .badge").empty();
        $(block+" .badge").html(p.moves);

    }

    Puzzle.prototype._set=function (i,j) {

        if( this._left(i,j) && this._right(i,j))
            if(j==i+1||j==i-1||j==i+this.field||j==i-this.field)
                return true;
        return false;
    }


    Puzzle.prototype._left=function (i,j) {
        if((i+1)%this.field==0) {
            if(j%this.field==0)
                return false;
        }
        return true;
    }


    Puzzle.prototype._right=function (i,j) {
        if((j+1)%this.field==0){
            if(i%this.field==0)
                return false;
        }
        return true;
    }


    Puzzle.prototype.checkGames=function (namber) {
        var j=0;
        for(i=0; i<=namber.length; i++)
            if ($(namber[i]).is(".id"+(i+1)))
                j++;
        if(j==9)
            return true;
        return false;

    }




    Puzzle.prototype.Moves=function (block) {


        var scroll_bar='<ul class="nav nav-pills" style="padding-top: 10px;">'+
            '<li>'+options.move+' : <span class="badge">0</span></li>'+
            '<li>'+options.timer+' : <span class="'+block+' label label-default count">0:0:0</span></li>'+
            '</ul>';
        return scroll_bar;
    }



    Puzzle.prototype.Timer=function (plagin,p) {

        if(p.minutes==59) {
            p.hour++;
            p.timer=0;
        }
        if(p.timer==59) {
            p.minutes++;
            p.timer=0;
        }
        p.timer++;
        $(plagin.selector+" .count").html(p.hour+':'+p.minutes+':'+p.timer);

        p.timeoutId=setTimeout(function() { p.Timer(plagin,p); }, 1000);
    }


    Puzzle.prototype.random=function (plagin) {

        for (var a = $.makeArray($(plagin+" .bl")), b =a.length-1 ; 0 < b; b--) {
            var e = Math.floor(Math.random() * (b + 1)),
                g = a[e];
            a[e] = a[b];
            a[b] = g
        }
        return a;

    }

    Puzzle.prototype.Remove=function (p){
        this.moves=0;
        this.timer=0;
        this.minutes=0;
        this.hour=0;

    }

    Puzzle.prototype.clearTimer=function (plagin,p) {
        clearTimeout(p.timeoutId);
    }


    Puzzle.prototype.Start=function (plagin,p) {



        var elements=this.random(plagin.selector);

        this.clearTimer(plagin,p);

        this.Remove(p);


        var block=plagin.selector;
        $(block).empty();
        for(var i=0; i<elements.length; i++){

            if (!$(elements[i]).is(".id"+options.size)) {
                var a=$(elements[i]).appendTo(block);
            } else {
                var a=$('<div />').
                addClass('bl id').
                css("width",elements[i].style.width /*100/options.field+"%"*/).
                css("height",elements[i].style.height /*100/options.field+"%"*/).
                css("background-position",elements[i].style.backgroundPosition).
                appendTo(block);
            }
            a.click(function () {
                p.Click(plagin,p,this);
            });



        }

        $(block).css("background-image","url(/img/"+this.transparency+")");
        $(block).css("background-size"," cover");


        //$('<div />', {id: 'cell-' + i})


        var b=plagin.selector.replace(/\./g, "");

        var buttom='<div class="scrol_bar_'+b+'"><button type="button" class="btn btn-default">'+options.buttom_2+'</button></div>';

        var restart=$(buttom).appendTo(block);
        restart.click(function () {
            p.Start(plagin,p);
        });


        $(this.Moves(block,p)).appendTo(".scrol_bar_"+b);

        this.Timer(plagin,p);




    }
    Puzzle.prototype.init = function(plagin,options) {

        var p=this;

        this.field=options.field;
        this.transparency=options.transparency;

        $(plagin.selector).addClass('blocks');



        for(var i=0; i<=options.size; i++)
                $('<div class="bl id'+i+'"></div>').appendTo(plagin);

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

        start.click(function () {
            p.Start(plagin,p);
        });


    }



    Puzzle.prototype.Fold=function () {
        var x=0;
        while(i=options.size){


            var j=0;
            for(j=0; j<=namber.length; j++)
                if ($(namber[j]).is(".id")){
                    x=j;
                    break;
                }

            if( this._left(i,j) && this._right(i,j))
                if(j==i+1||j==i-1||j==i+this.field||j==i-this.field)
                    return true;
            return false;


            i++;

        }
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







