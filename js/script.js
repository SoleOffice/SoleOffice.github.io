// This is the script file

// Exports
/* exported on_send_message_action */

// doc ready action
$(function() {

    "use strict";

    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });



    /*-----------------------------------
     * ONE PAGE NAV - SMOOTH SCROLLING
     *-----------------------------------*/

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 40
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });


    /*-----------------------------------
     * VIDEO FALLBACK
     *-----------------------------------*/
	/*
    function fallback(video) {
        var img = video.querySelector('img');
        if (img)
            video.parentNode.replaceChild(img, video);
    }
	*/
	
    /*-----------------------------------
     * YOUTUBE VIDEO
     *-----------------------------------*/
	/*
    $(".youtube").each(function() {
        // Based on the YouTube ID, we can easily find the thumbnail image
        //  $(this).css('background-image', 'url(https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg)');
        // $(this).css('background-size', 'cover');
        //$(this).css('background-position', '0 100px');

        // Overlay the Play icon to make it look like a video player
        //$(this).append($('<div/>', { 'class': 'play' }));

        var videoId = $(this).data('video-id');

        $(document).on('click', '.youtube', function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1&rel=0";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', { 'frameborder': '0', 'class': 'cast-shadow', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(this).replaceWith(iframe);
        });
    });
	*/

    /*-----------------------------------
     * Twitter Widget
     *-----------------------------------*/
	/*
    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
	*/
	

});
/*End Fn*/

/* My functions */
function generate_message_form_html(name, email, msg)
{
	"use strict";
	
	var htmlStr = "";
	
	htmlStr += '<!DOCTYPE html>';
	htmlStr += '<html lang="en">';
	htmlStr += '<head>';
	htmlStr += '    <meta charset="utf-8">';
	htmlStr += '    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
	htmlStr += '</head>';
	htmlStr += '<body style="margin: 0; padding: 0; display:none;">';
	htmlStr += '	<form id="gen-formspree-simple-frm" name="gen-formspree-simple-contact-form" accept-charset="utf-8" action="https://formspree.io/macinsight@outlook.com" method="post" target="_self">';
	htmlStr += '		<input type="text" name="name" value="' + name + '">';
	htmlStr += '		<input type="email" name="email" value="' + email + '">';
	htmlStr += '		<textarea id="gen-formspree-comment" name="message" rows="20" required="required">' + msg + '</textarea>';
	htmlStr += '		<button type="submit">Send</button>';
	htmlStr += '	</form>';
	htmlStr += '	<script type="text/javascript">';
	htmlStr += '	   function gen_simulate_submit() {';
	htmlStr += '			"use strict"; ';
	htmlStr += '			var formEle = document.getElementById("gen-formspree-simple-frm"); ';
	htmlStr += '            formEle.submit(); ';
	htmlStr += '	   }';
	htmlStr += '	</script>';
	htmlStr += '</body>';
	htmlStr += '</html>';

	return htmlStr;
}


/* handle user click send message button */
function on_send_message_action()
{
	"use strict";
	
	var uname = $("#my-contact-user-name").val();
	var umail = $("#my-contact-user-email").val();
	var umsg  = $("#my-contact-message").val();
	
	var gen_html = generate_message_form_html(uname, umail, umsg);
	
	// set the height of the popoup modal window container box
	var win_height = $(window).height();
	var msg_height = (win_height < 500) ? 250 : Math.round(win_height - 250);
	$('#my_inline_frame_leave_msg_box').height(msg_height);

	// replace the generated html to inline frame
	$('#my_inline_frame_leave_a_message').attr("srcdoc", gen_html);
	
	// show
	$('#myLeaveMessageModalCenter').modal('show');
	
	// When shown, do a simulate submit action.
	$('#myLeaveMessageModalCenter').on('shown.bs.modal', function (e) {
  		// do something...
		document.getElementById('my_inline_frame_leave_a_message').contentWindow.gen_simulate_submit();
	});
}


