var socket = io();
var supportVibrate = "vibrate" in navigator;
var username = "";

$(document).ready(function(){

  $('#myModal').modal({
  	backdrop: 'static',
  	keyboard: true
	});
	var myRoomID = null;
});

window.onresize = function (event) {
  applyOrientation();
}

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
    	alert('Best view in landscape mode');
  }
}

$(document).on('submit','#myForm', function(e){
	e.preventDefault();
	username =$('#username').val();
	if(username!='')
	{
		$('#myModal').modal('hide');
		$('#myModalRoom').modal();
	}
	else alert("Nama tidak boleh kosong");

});

$(document).on('submit','#myFormRoom', function(e){
	e.preventDefault();
	var roomname =$('#roomname').val();
	if(roomname!='')
	{
		
		$("#userApp").text(username);
		$("#myModalReady").modal({
	  		backdrop: 'static',
	  		keyboard: true
		});
		$("#haiUser").text(username);
		$("#haiRoom").text(roomname);
		//socket.emit('room', socket.id,username);
		socket.emit('user', socket.id, username);
		$('#myModal').modal('hide');
	}
	else alert("Nama tidak boleh kosong");

});

socket.on('status', function(status){
	if (status == 200) {
		$("#clientContaint").css('display','');
		$("#myModalReady").modal('hide');
	}
})

$(document).on('click','.but-ans', function(e){
	e.preventDefault();

	$('.but-ans').css('background-color','#555555');
	$(this).css('background-color','#50c878');
	//$('.but-ans').css('background-color','red');
	var noSoal = $('#noSoal').text();
	var answer = $(this).attr('value');
	var username = $("#userApp").text();
	var room = $("#roomApp").text();
	var data = {	
					'id': '/#'+socket.id,
					'username':username,
					'soal':noSoal,
					'jawaban':answer
	};

	socket.emit('receiveClient',data);
});

socket.on('recvNoSoal', function(noSoal, soalData)
{
	$('.but-ans').css('background-color','#555555');
	$('#opsiA').text(soalData.opsiA);
	$('#opsiB').text(soalData.opsiB);
	$('#opsiC').text(soalData.opsiC);
	$('#opsiD').text(soalData.opsiD);
	$('#noSoal').text(noSoal);
	navigator.vibrate(1000);
});

socket.on("errorMsg", function(data) {
  $("#errMsg").empty();
  $("#errMsg").show();
  $("#errMsg").append(data.msg + " Try <strong>" + data.proposedName + "</strong>");
    toggleNameForm();
    toggleChatWindow();
});

socket.on("sendRoomID", function(data) {
    myRoomID = data.id;
});

socket.on('recvScore', function(userScore){
	var tmp_id = '/#'+socket.id;
	//console.log(userScore);
	/*if( userScore[tmp_id].nilai!=undefined)
	{
		$("#userScore").text(userScore[tmp_id].nilai);
	}
	else $("#userScore").text(0);
*/
	var flag_score=0;
	for(i in userScore)
	{
		if(userScore[i].id==tmp_id)
		{
			$("#userScore").text(userScore[i].nilai);
			flag_score=1;
			break;
		}
	}

	if(flag_score==0) $("#userScore").text(0);
	$("#myModalWinner").modal({
  	backdrop: 'static',
  	keyboard: true
	});
})


