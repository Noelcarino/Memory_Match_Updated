
$(document).ready()

var i = 1;
var appLibrary1 = [
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/clock.png",
    "../MemoryMatch/images/clock.png",
    "../MemoryMatch/images/clock.png",
    "../MemoryMatch/images/clock.png",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/netflix.jpg",

];
var appLibrary3 = [
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/snap.png",
    "../MemoryMatch/images/tsumtsum.jpeg",
    "../MemoryMatch/images/tsumtsum.jpeg",
    "../MemoryMatch/images/venmo.jpg",
    "../MemoryMatch/images/venmo.jpg",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/instagram.jpeg",
    "../MemoryMatch/images/clock.png",
    "../MemoryMatch/images/clock.png",
    "../Memorymatch/images/phone.jpeg",
    "../Memorymatch/images/phone.jpeg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/lyft.jpg",
    "../MemoryMatch/images/lyft.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/facebook.jpg",
    "../MemoryMatch/images/facebook.jpg",
    "../MemoryMatch/images/pokemongo.jpg",
    "../MemoryMatch/images/pokemongo.jpg",
];

var appLibrary2 = [
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/uber.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/spotify.jpg",
    "../MemoryMatch/images/lyft.jpg",
    "../MemoryMatch/images/lyft.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/netflix.jpg",
    "../MemoryMatch/images/facebook.jpg",
    "../MemoryMatch/images/facebook.jpg",
    "../MemoryMatch/images/pokemongo.jpg",
    "../MemoryMatch/images/pokemongo.jpg",
]




var firstAppClicked= null;
var secondAppClicked = null;
var attempts = null;
var matchedAppsScore = null;
var matchedAppsArray = [];
var accuracy = matchedAppsScore/attempts;
var michael = 1;
var games_played = 0;




function startApp(){
    var shuffledApps = shuffle(appLibrary1);
    // var shuffledApps2 = shuffle(appLibrary1);

    // loadApps(shuffledApps);
    loadApps(shuffledApps);

    // These functions Below Work now!
    // flashing();

    $(".app-back").click(handleAppClick);
    

}

function flipApp(){

    firstAppClicked.removeClass('hidden');
    secondAppClicked.removeClass('hidden');
}

function handleAppClick(event){
    
    if (secondAppClicked){
        flipApp();
        return;
    }

    $(event.currentTarget).addClass('hidden');

    if (firstAppClicked == null) {
        firstAppClicked = $(event.currentTarget);
    } else {
        attempts++;
        $(".attempts-holder").text(attempts);
        secondAppClicked = $(event.currentTarget);
        
        var url1 = firstAppClicked.next().css('background-image');
        var url2 = secondAppClicked.next().css('background-image');
        
        if (url1 == url2) {
            matchedAppsScore++;
            accuracy = matchedAppsScore/attempts* 100 + "%";
            $(firstAppClicked).parent().addClass('hidden');
            $(secondAppClicked).parent().addClass('hidden');

            

            if (matchedAppsScore % (appLibrary1.length / 2) == 0) {
                $(".screen").empty();
                startApp();
                michael++;
            }
            

            if (matchedAppsScore == 12 ){
                startApp();
                firstAppClicked = null;
                secondAppClicked = null;

                
            }

            console.log("score: ", matchedAppsScore);
            console.log("accuracy: ", accuracy);
            
            $(".apps-matched-holder").text(matchedAppsScore);
            $(".accuracy-holder").text(parseFloat(accuracy).toFixed(2) + "%");
            $(".attempts-holder").text(attempts)
            $(".games-played-holder").text(games_played);

            matchedAppsArray.push(url1, url2);
            // flipApp();
            firstAppClicked = null;
                secondAppClicked = null;
            
        } else {
            setTimeout(function() {
                flipApp();
                firstAppClicked = null;
                secondAppClicked = null;
            }, 1000) 
            accuracy = matchedAppsScore/attempts * 100 + "%";
            console.log("score: ", matchedAppsScore);
            console.log("accuracy: ", accuracy);
            $(".accuracy-holder").text(parseFloat(accuracy).toFixed(2)+"%");


            
            // $(".accuracy-holder").text(toFixed(accuracy,2));
        }
    }
}

function flashing() {
    var lightsOut = setInterval( lightsOut, 1000);
    var lightsOn = setInterval( lightsOn, 2000);

    function lightsOut(){
        $(".screen").addClass("screen-dark"); 
    }
    function lightsOn() {
        $(".screen").removeClass("screen-dark");
    }
}



function loadApps(appDeck){

    for (var i = 0; i < appDeck.length; i++) {

        app_container = $("<div>")
            .addClass("app app:hover app-container")
            
        app_back = $("<div>")
            .addClass("app app:hover app-back")
            .attr("style", "background-image :url(\'../MemoryMatch/images/apple-logo.jpg\')")
            
        app_face = $("<div>")
            .addClass('app app:hover')
            .attr("style", "background-image: url(\'"+appDeck[i]+"\')")
            
        $(app_container).appendTo(".screen");
        $(app_back).appendTo(app_container);
        $(app_face).appendTo(app_container);
    }
}

function shuffle(array){
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

var timeleft = 60;


function startTime(time){

    var start = setInterval(myTimer, 1000);
    function myTimer(){
       
        if (time == 0){
            matchedAppsScore = 0;
            attempts = 0;
            accuracy = 0;
            alert("stop");
            startApp();
            $('.screen').empty();
            $('.start').removeClass('hidden');
            clearInterval(startTime);
            firstAppClicked = null;
            secondAppClicked = null;
        }
        $('.timer-holder').text(time + "s");
        time--;
        console.log("test: ", time);
    }

    
    console.log("test:", time);
    
    startApp();
    $('.start').addClass('hidden');
    

    
}

function reset() {
    // $('.start').removeClass('hidden');
    i++;
    if (i % 2 == 0){
        $(".screen").addClass("toggleHomeButton-Off");
        $(".screen").empty();
        $(".time-holder").empty();
        console.log("testdasdf:);)");
    } else {
        $(".screen").removeClass("toggleHomeButton-Off");
        $('.app').removeClass("toggleHomeButton-Off")
        $('.start').removeClass('hidden');
        // loadApps();
        for (var j = 0; j < michael; j++) {
            startApp();
        }
    }
}


