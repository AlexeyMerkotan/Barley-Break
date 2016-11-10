<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>barley-break</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>



<div class="row">
    <div class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 ">
        <h1> Barley-Break </h1>
        <div class="block "></div>

        <div class="block1"></div>

        <div class="block5"></div>

    </div>
</div>


<script src="js/jquery-2.1.0.js"></script>
<script src="js/script.js"></script>
<script src="js/bootstrap.min.js"></script>
<script>
    $(function () {
        $('.block').build_puzzle({buttom_1 : 'Play'});
        $('.block1').build_puzzle({ size:   80, field:  9});
        $('.block5').build_puzzle({img: 'multfilm_Futurama_minion_Bender_25222.jpg',size:   8, field:  3,transparency:''});
    })
</script>
</body>
</html>