/*****simple audioplayerQuiz app
******authored by Yangfan
******git
******/

function newQ(n, genre){
	$('#choice1').text(questions[genre][n].choice1);
	$('#choice2').text(questions[genre][n].choice2);
	$('#choice3').text(questions[genre][n].choice3);
	$('#choice4').text(questions[genre][n].choice4);
}
function gameOver(pts){
	$('#modal4').openModal();
	$('.audio').remove();
	$('#audioplayer').remove();
	$('#choices').remove();
	$('.progress').show().delay(1000).fadeOut();
	$("#scoreboard").show();
	$.ajax({
		type: "GET",
		url: "https://web.njit.edu/~yc439/smt/run.php",
		data: {name:name, pts:pts},
		success:function(result){
			$('#scoreboard table tbody').append(result);
		}
	});
}

function cat(selector){
	$(selector).click(function(){
		if($(this).text() == questions[genre][n].answer){
			Materialize.toast('Nice!', 1000);
			n = Math.floor(Math.random()*questions[genre].length);
     		console.log(n);
			newQ(n, genre);
			pts += 100;
			streak += 1;
			//add score and starts
			$('.score #counter').text(pts);
			//$('.stars').append("<i class=\"small material-icons\">stars</i>");
			//load muisc
			$('source').attr("src", questions[genre][n].song);
			$('#audioplayer').get(0).load();
	    	$('#audioplayer').get(0).play();
	    	if(streak % 4 == 0){
	    		Materialize.toast('Superb!',1000);
	    		$('#spongebob').show().delay(1500).fadeOut();
	    	}
		}
    	else{
   			streak = 0;
   			Materialize.toast('Nope!', 1000);
			n = Math.floor(Math.random()*questions[genre].length);
     		console.log(n);
			newQ(n, genre);
			pts -=100;
			$('.score #counter').text(pts);
			$('.stars img:last-child').remove();
			//load audioplayer
			$('source').attr("src", questions[genre][n].song);
			$('#audioplayer').get(0).load();
	    	$('#audioplayer').get(0).play();
	    	if($('.stars img').length == 0){
				gameOver(pts);
			}
    	}
	});	
}
// will be moved up due to hoisting
var pts = 0;
var count = 0;
var n;
var genre;
var foo = 1 ;
var streak = 0;

$( document ).ready(function(){
	$('.modal-trigger').leanModal();
	$(".button-collapse").sideNav();

	$("#homeB").click(function(){
		name = document.getElementById('icon_prefix').value;
		console.log(name);
		if(name == 'undefined' || name == ""){
			$('#no_name').text("please enter a name!");
		}else{
			$('#sign_in').hide();
			$("#intro").hide();
			$("#genre").show();
			Materialize.showStaggeredList('#genre');
		}
	});
	$(".pop").click(function(){
		$("#genre").hide();
	    $(".progress").show().delay(1000).fadeOut();
	    $('#audioplayer').css('visibility','visible');
	    genre = 'pop';
	    n = Math.floor(Math.random()*questions[genre].length);
	    $('source').attr("src", questions[genre][n].song);
	    $('#audioplayer').get(0).load();
	    $('#audioplayer').get(0).play();
	    newQ(n, genre);
	    $("#choices").fadeIn("slow","swing");
	    console.log(genre);
	});
 	$(".hhRB").click(function(){
		$("#genre").hide();
	    $(".progress").show().delay(1000).fadeOut();
	    $('#audioplayer').css('visibility','visible');

	    genre = 'hhRB';
	    n = Math.floor(Math.random()*questions[genre].length);
	    $('source').attr("src", questions[genre][n].song);
	    $('#audioplayer').get(0).load();
	    $('#audioplayer').get(0).play();
	    newQ(n, genre);
	    $("#choices").fadeIn("slow","swing");
	    console.log(genre);
	});
 	$(".edm").click(function(){
		$("#genre").hide();
	    $(".progress").show().delay(1000).fadeOut();
	    $('#audioplayer').css('visibility','visible');

	    genre = 'edm';
	    n = Math.floor(Math.random()*questions[genre].length);
	    $('source').attr("src", questions[genre][n].song);
	    $('#audioplayer').get(0).load();
	    $('#audioplayer').get(0).play();
	    newQ(n, genre);
	    $("#choices").fadeIn("slow","swing");
	    console.log(genre);
	});	
	 $(".rock").click(function(){
		$("#genre").hide();
	    $(".progress").show().delay(1000).fadeOut();
	    $('#audioplayer').css('visibility','visible');

	    genre = 'rock';
	    n = Math.floor(Math.random()*questions[genre].length);
	    $('source').attr("src", questions[genre][n].song);
	    $('#audioplayer').get(0).load();
	    $('#audioplayer').get(0).play();
	    newQ(n, genre);
	    $("#choices").fadeIn("slow","swing");
	    console.log(genre);
	});	
	cat('#choice1');
	cat('#choice2');
	cat('#choice3');
	cat('#choice4');

});

