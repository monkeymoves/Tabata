$(document).ready(function(){
    document.body.style.backgroundColor = "lightseagreen";

    console.log('All assets are loaded' + document.getElementById('prep_time').value)
    let userSetup = {
        PrepTime : document.getElementById('prep_time').value,
        hangTime : document.getElementById('hang_time').value,
        restTime: document.getElementById('rest_time').value,
        SetRest : document.getElementById('set_rest').value,
        NoOfReps : document.getElementById('reps').value,
        NoOFSets : document.getElementById('sets').value,
    }

    let clock = document.getElementById('clockdiv');
    let werkoutSpan = clock.querySelector('.werkout');
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');
    let messageSpan = clock.querySelector('.message');
    let timeSpan = clock.querySelector('.time');
    let counterReps = document.getElementById('reps').value;
    let counterSets = document.getElementById('sets').value;

    

    function populateTimer(){
        userSetup.PrepTime =  document.getElementById('prep_time').value;
        userSetup.hangTime =  document.getElementById('hang_time').value;
        userSetup.restTime = document.getElementById('rest_time').value;
        userSetup.SetRest  = document.getElementById('set_rest').value;
        userSetup.NoOfReps =  document.getElementById('reps').value;
        userSetup.NoOFSets =  document.getElementById('sets').value;
        counterReps = document.getElementById('reps').value;
        counterSets = document.getElementById('sets').value;
     
    }


//function to convert secs to milliseconds for the purpose of counding down 
function convertTime(secs) {
    var currentTime = Date.parse(new Date());
    var countDown = new Date(currentTime + secs * 1000);
    return countDown
}

//works out the time remaining 
function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

function initializeClock(endtime, whattodonext){
    
    function updateClock(){
      var t = getTimeRemaining(endtime);
      werkoutSpan.innerHTML = 'reps: ' +  counterReps + '  <br>  ' + 'sets: ' +  counterSets ;   // t.days +
      minutesSpan.innerHTML = ('0'+t.minutes).slice(-2)+':';
      secondsSpan.innerHTML = ('0'+t.seconds).slice(-2);

      if(t.total<1){
        clearInterval(timeinterval);
        whattodonext()
        
      }
    }
    updateClock(); // run function once at first to avoid delay
    var timeinterval = setInterval(updateClock,1000);  
}

let displayRep = 0
let displaySet = 0

function hangTime(){
    if (counterReps > 0){
        
        displayRep = displayRep + 1 
    }
    messageSpan.innerHTML = 'HANG ' + displayRep
    document.body.style.backgroundColor = "coral"; 
    document.body.style.backgroundImage = "";    

    if (counterReps > 0 ){

        --counterReps
        initializeClock(convertTime(userSetup.hangTime), restTime)
        // if (counterSets == 1 ){
        //     --counterSets

        // }
    } 
    else if (counterSets > 1 ){
        --counterSets
        messageSpan.innerHTML = 'SET REST'
        displayRep = 0
        counterReps = userSetup.NoOfReps
        initializeClock(convertTime(userSetup.SetRest), hangTime)
        document.body.style.backgroundColor = "MediumSlateBlue  ";
    } else {
        // alert("completed") 
        minutesSpan.innerHTML = ''
        secondsSpan.innerHTML = ''
        werkoutSpan.innerHTML = 'reps: ' +  counterReps + '  <br>  ' + 'sets: ' +  (counterSets-1) ;   // t.days +

        messageSpan.innerHTML = ' DONE!'
        document.body.style.backgroundImage = "url('https://media.giphy.com/media/pHb82xtBPfqEg/giphy.gif)"; 

        $(".inputShowHide").toggle()
        $(".mybuttons").toggle()
        $(".werkout").toggle()

        populateTimer()
        // document.body.style.backgroundColor = "MediumSlateBlue";
  
   }
}
    

 
function restTime(){
    messageSpan.innerHTML = ' REST'

    document.body.style.backgroundColor = "lightseagreen";
    initializeClock(convertTime(userSetup.restTime), hangTime)
}

function clickbutton(){
    timeSpan.innerHTML = ''
    messageSpan.innerHTML = ' PREP'
    document.body.style.backgroundColor = "MediumSlateBlue";
    document.body.style.backgroundImage = "url('smith.jpg')"; 
    setTimeout(function(){
      document.body.style.backgroundColor = "MediumSlateBlue";
      document.body.style.backgroundImage = ""; 
    },4000)
    document.body.style.color = "red";
    
    $(".inputShowHide, .mybuttons").toggle()
    $(".werkout").toggle()

    initializeClock(convertTime(userSetup.PrepTime), hangTime )
}

function setmaxHangs(){
  userSetup.hangTime =  10
  userSetup.PrepTime =  30
  userSetup.restTime = 180
  userSetup.SetRest  = 0
  userSetup.NoOfReps =  6
  userSetup.NoOFSets =  0
  counterReps = 6
  counterSets = 0
  document.getElementById('prep_time').value = 30
  document.getElementById('hang_time').value = 10
  document.getElementById('rest_time').value = 180
  document.getElementById('set_rest').value = 0
  document.getElementById('reps').value = 6
  document.getElementById('sets').value = 0
  // messageSpan.innerHTML = 'MAX'

}

 

function setRepeaters(){
  userSetup.hangTime =  7
  userSetup.PrepTime =  30
  userSetup.restTime = 3
  userSetup.SetRest  = 60
  userSetup.NoOfReps =  6
  userSetup.NoOFSets =  10
  counterReps = 6
  counterSets = 12
  document.getElementById('prep_time').value = 30
  document.getElementById('hang_time').value = 7
  document.getElementById('rest_time').value = 3
  document.getElementById('set_rest').value = 60
  document.getElementById('reps').value = 6
  document.getElementById('sets').value = 12
  // messageSpan.innerHTML = 'REPS'
}
document.getElementById("clickMe").onclick = clickbutton;
document.getElementById("maxHang").onclick = setmaxHangs;
document.getElementById("repeaters").onclick = setRepeaters;


$('.input-number-increment').click(function() {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val + 1);
    console.log(val)
    populateTimer()
  });
  
  $('.input-number-decrement').click(function() {
    var $input = $(this).parents('.input-number-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val - 1);
    console.log(val)
    populateTimer()

    console.log(userSetup)
  })
  
  

})


