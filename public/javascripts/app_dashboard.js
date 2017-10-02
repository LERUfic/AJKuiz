var socket = io.connect();
var soal_ = [];
var userAns=[];
var userScore=[];
var activate = '';
$(document).ready(function(){
	socket.emit('joinServerDash');
	activate = setInterval(function() {
	    socket.emit('statusHubungan', 800)
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
	console.log(cat);
	socket.emit('getSoal',cat);

	$("#myModalCat").modal('hide');
});

socket.on('recvSoal', function(soal){
	soal_=soal;
	//console.log(soal_);
	$("#myModalStart").modal();
});

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
		else if(max<userScore[index].nilai)
		{
			max = userScore[index].nilai;
			tmp_user = userScore[index];
		}
	}

	//console.log(userScore);
	//console.log(tmp_user);
	if(tmp_user!='') $('#theWinner').html("Selamat untuk <span style='font-weight:bold; font-size:24px'>"+tmp_user.username+"</span> mendapatkan skor tertinggi ("+tmp_user.nilai+")");
	$("#myModalWinner").modal({backdrop: 'static',
  	keyboard: true});
}


function sendScore()
{
	var tmpScore=[];
	for(i in userScore)
	{
		tmpScore.push({'id':i,'nilai':userScore[i].nilai});
	}

	socket.emit('sendScore', tmpScore);


}

function calcScore()
{
	
	for(i in userAns)
	{
		//console.log("looping");
		if(soal_[parseInt(userAns[i].soal)-1].jawaban_ajkuiz==userAns[i].jawaban)
		{
			//console.log(userScore[userAns[i].id]);
			userScore[userAns[i].id].nilai+=1;
			//console.log(userScore[userAns[i].id]);
		}
	}

	findWinner();
	sendScore();

	//console.log(userScore);
};

socket.on('recvClientAns', function(data){
	if(userAns.length==0)
	{
		userAns.push(data);
		//console.log(data.username)
		userScore[data.id]={
			'username' : data.username,
			'nilai': 0
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
			'nilai': 0
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
	socket.emit('statusHubungan', 200)
	var interval = setInterval(function() {
	    counter--;
	    $("#timerCountdown").text(counter);
	    if (counter == 0) {
	    	noSoal+=1;
	    	if(noSoal==length_soal) 
	    	{
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



