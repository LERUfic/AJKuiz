var socket = io.connect();
var soal_ = [];
var userAns=[];
var userScore=[];
var activate = '';
var roomIDServer;

$(document).ready(function(){
	socket.emit('joinServerDash');
	activate = setInterval(function() {
	socket.emit('statusHubungans', 800)
	}, 1000);
	$("#myModalRoomView").modal({
  		backdrop: 'static',
  		keyboard: true
	});
});

socket.on("numberView", function(data){ 
	$("#roomNumberView").text(data);
});

$(document).on('submit','#myFormNumberView', function(e){
	e.preventDefault();
	$("#myModalRoomView").modal('hide');
	$("#myModalCat").modal({
  		backdrop: 'static',
  		keyboard: true
	});
});

$(document).on('click', '.but-cat', function(e){
	e.preventDefault();

	//socket.emit('cobaCoba');
	var cat = $(this).attr('value');
	//var e = document.getElementById("optionKategori");
	//var cat = e.options[e.selectedIndex].text;
	console.log(cat);
	socket.emit('getSoal',cat);

	$("#myModalCat").modal('hide');
});

socket.on('recvSoal', function(soal){
	soal_=soal;
	//socket.emit('debug', soal);
	//console.log(soal_);
	$("#myModalStart").modal();
});

function compare(a, b) {
	  
  var nilaiA = a.nilai;
  var nilaiB = b.nilai;
  var waktuA = a.times;
  var waktuB = b.times;

  var comparison = 0;
  if (nilaiA > nilaiB) {
    comparison = 1;
   	socket.emit('debug', "yang 1 coy");
  }
  else if (nilaiA < nilaiB) {
    comparison = -1;
    socket.emit('debug', "bodo amat");
  }
  else if((nilaiA == nilaiB) && (waktuA < waktuB)){
  	comparison = 1;
  	socket.emit('debug', "yang kedua ini");
  }
  else if((nilaiA == nilaiB) && (waktuA > waktuB)){
  	comparison = -1;
  	socket.emit('debug', "ketiga aja");
  }
  
  socket.emit('debug', "ga masuk");
  return comparison * -1;
}

function findWinner()
{
	var max = 0;
	var tmp_user='';

	for(index in userScore)
	{
		if(max==0)
		{
			max = userScore[index].nilai;
			tmp_user = userScore[index];
		}
		else if(max == userScore[index].nilai)
		{
			if(userScore[index].timeAns < tmp_user.timeAns){
				max = userScore[index].nilai;
				tmp_user = userScore[index];
			}
		}
		else if(max<userScore[index].nilai)
		{
			max = userScore[index].nilai;
			tmp_user = userScore[index];
		}
	}
	//socket.emit('debug', userScore);
	//console.log(userScore);
	//console.log(tmp_user);
	if(tmp_user!='') $('#theWinner').html("Selamat untuk <span style='font-weight:bold; font-size:24px'>"+tmp_user.username+"</span> mendapatkan skor tertinggi ("+tmp_user.nilai+")");
	$("#myModalWinner").modal({backdrop: 'static',
  	keyboard: true});
}


function sendScore()
{
	//socket.emit('debug', "masuk sendScore");
	//socket.emit('debug', userScore);
	var tmpScore=[];
	var tmpScore2=[];
	var no=0;
	for(i in userScore)
	{
		
		tmpScore.push({'id':i,'nilai':userScore[i].nilai,'username':userScore[i].username, 'times':userScore[i].timeAns});
		//socket.emit('debug', i);
	}

	tmpScore.sort(compare);

	for (i in tmpScore){
		no=no+1;
		tmpScore2.push({'id':tmpScore[i].id,'urutan':no,'nilai':tmpScore[i].nilai,'username':tmpScore[i].username, 'times':tmpScore[i].timeAns});
	}
	socket.emit('debug', tmpScore2);
	socket.emit('sendScores', tmpScore2);
	socket.emit('getWinner', tmpScore2);
	/*tmpScore.sort(function (a, b) {
  		return a.nilai - b.nilai;
	});

	var urut=0;
	var finScore=[];
	for(i in tmpScore)
	{	
		urut = urut+1;
		finScore.push({
							'id':i,
							'username' :tmpScore[i].username,
							'roomID':tmpScore[i].room,
							'nilai':tmpScore[i].nilai,
							'urutan': urut
		});
	}*/
}


function calcScore()
{
	//socket.emit('debug', "masuk calcScore");
	for(i in userAns)
	{
		//console.log("looping");
		if(soal_[parseInt(userAns[i].soal)-1].jawaban_ajkuiz==userAns[i].jawaban)
		{
			//console.log(userScore[userAns[i].id]);
			userScore[userAns[i].id].nilai+=1;
			if(userAns[i].times != null){
				userScore[userAns[i].id].timeAns = userAns[i].times;
				//socket.emit('debug', userAns[i].times);
			}
			//console.log(userScore[userAns[i].id]);
		}
	}
	findWinner();
	sendScore();
}

socket.on('recvClientAns', function(data){
	//socket.emit('debug', userAns);
	//socket.emit('debug', data);
	if(userAns.length==0)
	{
		userAns.push(data);
		//console.log(data.username)
		userScore[data.id]={
			'username' : data.username,
			'nilai': 0,
			'timeAns':data.times
		};
	}
	else
	{
		var flag_exist=0;
		for(i in userAns)
		{
			//console.log(userAns[i].id+" "+data.id+" "+userAns[i].soal+" "+data.soal);
			if(userAns[i].id==data.id&&userAns[i].soal==data.soal)
			{
				//console.log("lebih dari satu input");
				userAns[i].jawaban = data.jawaban;
				console.log(userAns[i].jawaban+"  "+data.soal);
				flag_exist=1;
				break;
			}
		}
		if(flag_exist==0) 
		{
			//console.log("belum input");
			userAns.push(data);
			userScore[data.id]={
				'username' : data.username,
				'nilai': 0,
				'timeAns':data.times
			};
		}
	}
});

function gantiSoal(noSoal,soalI)
{
	/*console.log(soalI);
	console.log("asdasd");*/
	$("#noSoal").text(noSoal+1);

	var dataSoal = {'opsiA':soalI.opsiA_ajkuiz, 'opsiB':soalI.opsiB_ajkuiz, 'opsiC':soalI.opsiC_ajkuiz,'opsiD':soalI.opsiD_ajkuiz};

	socket.emit('triggerNoSoal', noSoal+1, dataSoal);
	$("#soalnya").text(soalI.soal_ajkuiz);
	$("#pilihanA").text(soalI.opsiA_ajkuiz);
	$("#pilihanB").text(soalI.opsiB_ajkuiz);
	$("#pilihanC").text(soalI.opsiC_ajkuiz);
	$("#pilihanD").text(soalI.opsiD_ajkuiz);
}

/*socket.on('recvUserRoomId', function(data){
	roomIDServer = data;
});*/

$(document).on('click', '#but-start', function(e){
	var noSoal=0;
	var length_soal = soal_.length;

	e.preventDefault();
	$("#myModalStart").modal('hide');
	$("#dashboardContent").css('display','');

	var counter = 15;
	$("#timerCountdown").text(counter);
	gantiSoal(noSoal,soal_[noSoal]);

	clearInterval(activate)
	//socket.emit('getUserRoomId');
	//io.sockets.in(roomIDServer).emit('statusHubungan', 200);
	socket.emit('statusHubungan', 200);
	var interval = setInterval(function() {
	    counter--;
	    socket.emit('displayTimer', counter);
	    //console.log(counter);
	    $("#timerCountdown").text(counter);
	    if (counter == 0) {
	    	noSoal+=1;
	    	if(noSoal==length_soal) 
	    	{
	    		//socket.emit('debug', "masuk nosoal");
	    		clearInterval(interval);
	    		calcScore();
	    	}
	        else 
	        {		gantiSoal(noSoal,soal_[noSoal]);
	        		counter = 15;
	        		$("#timerCountdown").text(counter);
	        }
	    }
	}, 1000);
});



