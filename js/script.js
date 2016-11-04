(function($){

    options = $.extend({
        defColor:"#F0F8FF",
        hoverColor:"#FAEBD7"
    });


    size=15;

    moves=0;

    field=4;




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
            var a = new Date().getTime(); ;
        var a=$(this).html();
        var namber=$.makeArray($(".bl"));
        var j=0;
        for(j=0; j<=namber.length; j++)
            if(namber[j].innerText==a)
                break;
        var i=0
        for(i=0; i<=namber.length; i++)
            if(namber[i].innerText=="")
                    break;
        if(!Puzzle.prototype.checkGames(namber)){
           moves++;
            if(Puzzle.prototype._set(i,j)){
                namber[i].innerText=a;
                Puzzle.prototype._shift(this);
            }
        }else{
            var result = new Date().getTime() - a;
            alert("Игра окончина!\n Xодов: " + moves + " \n Игровое время: " + result);
        }


    }


    Puzzle.prototype.timer=function () {
        $("#example_1").everyTime(1000, function(i) {
            $(this).text(i);
        });
    }
    Puzzle.prototype._shift=function (plagin) {
        $(".bl").addClass("block_color");
        $(plagin).removeClass("block_color");
        $(plagin).empty();
        $(plagin).css("background","#85d0e2");
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
    Puzzle.prototype.init = function(plagin) {

            var elements=this.random();

            for(var i=0; i<elements.length; i++){
                if(elements[i]){
                    var a=$('<div class="bl block_color">'+elements[i]+'</div>').appendTo(plagin);
                }
                else
                    var a=$('<div class="bl"></div>').appendTo(plagin);
                a.mouseenter(this.hover);
                a.click(this.click);

            }

    }


    $.fn.build_puzzle=function (options) {




        new Puzzle(this);

    }



})(jQuery);





$('.block').build_puzzle();


