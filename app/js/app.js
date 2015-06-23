'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });

            $('.toggleIcon').on('click', function() {
            	var elem = $(this);
            	var onIcon = elem.attr('data-on-class');
            	var offIcon = elem.attr('data-off-class');

            	if($(elem).hasClass(onIcon)) {
            		elem.removeClass(onIcon);
            		elem.addClass(offIcon);
            	} else {
            		elem.removeClass(offIcon);
            		elem.addClass(onIcon);
            	}
            });


			_userAgentInit();
		},
		_videoPlayer = function() {
			// Video settings
			$('#fullVideo').vide({
				mp4: 'videos/forsnome_new.mp4',
				webm: 'videos/forsnome_new.webm',
				// poster: 'images/still1.png',
				// posterType: 'detect',
			}, {
				volume: 1,
				playbackRate: 1,
				muted: false,
				loop: true,
				autoplay: true,
				position: '50% 50%',
				posterType: 'jpg',
				resizing: true
			});


			// Controls
			$('.toggleState').on('click', function() {
				var video = $(this).attr('data-video');
				_toggleVideoState(video);
			});

			$('.toggleSound').on('click', function() {
				var video = $(this).attr('data-video');
				_toggleVideoSound(video);
			});
		},
		_toggleVideoState = function(video) {
			var targetVideo = $('#' + video);
			var videoPlayer = targetVideo.find('video').get(0);

			if(videoPlayer.paused) {
				videoPlayer.play();
			} else {
				videoPlayer.pause();
			}
		},
		_toggleVideoSound = function(video) {
			var targetVideo = $('#' + video);
			var videoPlayer = targetVideo.find('video');
			var muteState = videoPlayer.prop('muted');

			if(muteState === true) {
				videoPlayer.prop('muted', false);
			} else {
				videoPlayer.prop('muted', true);
			}
		};

	return {
		init: _init,
		videoPlayer: _videoPlayer
	};
})(document, jQuery);

(function() {
	app.init();
	app.videoPlayer();
})();
