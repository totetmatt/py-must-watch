// Asynchronously load the YouTube API
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> (and YouTube player) after the YouTube API is loaded
var player;

function onPlayerReady(evt) {

    
    var scope = angular.element($("body")).scope();
    scope.$apply(function(){
        if(scope.currentVideo!==null) {
            var currentVideoId = scope.youtubeIdFromUri(scope.currentVideo.videos.youtube);
            player.loadVideoById(currentVideoId);
       }
   })
    
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: calculatePlayerHeight().toString(),
        width: '100%',
        videoId: null,
        events: {
            'onReady': onPlayerReady
        }
    });

    $(window).resize(function() {
        var newPlayerHeight = calculatePlayerHeight();
        player.setSize('100%', newPlayerHeight);
    });
}

