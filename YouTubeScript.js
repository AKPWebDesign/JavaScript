//load the YouTube IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//define players array
var players = [];

//define array for players we've logged
var logged = [];

//when YouTube API is ready
function onYouTubeIframeAPIReady() {
    //counter for player ids
    var i = 0;

    //loop through all players on page
    $(".player").each(function(){
        //set an id for this player
        $(this).attr("id", "player-"+i);
        //create a player
        tempPlayer = new YT.Player($(this).attr("id"), {
            height: '255',
            width: '420',
            videoId: $(this).data("videoId"),
            events: {
                onStateChange: onPlayerStateChange
            }
        });

        //add the player to our array
        players.push(tempPlayer);

        //increment our counter
        i++;
    });
}

//occurs when player state changes
function onPlayerStateChange(data) {
    //1 == playing
    if(data.data === 1) {
        if(logged[data.target.A.videoData.video_id] === undefined) {
            console.log(data.target.A.videoData.title);
            logged[data.target.A.videoData.video_id] = true;
        }
    }
}