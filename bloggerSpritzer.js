<style>
#spritzer {
	cursor: pointer;
    display: block;
    float: right;  
    z-index: 4;
    padding: 0px;
    margin: 0px;
    position: absolute; /*newly added*/
    top: 5px;/*newly added*/
}

.imgBtn{
	position: absolute;
	right: -25px;
	top: -25px;
	width: 75px;
	height: 75px;
	z-index: 3;
	cursor: pointer; 
	cursor: hand;
}
</style>

<!-- Initilizes Spritz settings -->
<div id="spritzer"></div>
<span><a href="http://www.spritzinc.com/">Site has been Spritz'd</a></span>

<script type="text/javascript">
    var SpritzSettings = {
           clientId: "6318149caf0bf1895",
           redirectUri: "http://www.mcrook.com/p/loginsuccess.html"
    };
</script>

<!-- get the spritz API -->
<script type="text/javascript" src="//sdk.spritzinc.com/js/1.2/js/spritz.min.js"></script>

<!-- injects Spritz this post to every post, this causes a spritz dialogue to play the article -->
<script type="text/javascript">
(function() {
	var spritzController = null;

	/// When we close the spritzer, hide it
	var onSpritzClose = function(){
		$("#spritzer").hide();
	}

	/// once we get valid spritz text back from the api
	/// show the spritzer, and start spritzing
	var onSpritzifySuccess = function(spritzText) {
		$("#spritzer").show();
		spritzController.startSpritzing(spritzText);
	};
	
	/// If there are issues getting data back from the 
	/// api, show the error
	var onSpritzifyError = function(error) {
		alert("Unable to Spritz: " + error.message);
	};

	/// When we receive the next spritz this post event,
	/// stop spritzing (so while the spritz text is loaded
    /// the spritzer doesn't continue showing the old text)
	/// then grab the blog post, remove all "pre code" as 
	/// users probably don't want to read code elements
	/// then move the spritzer to the top of the post.
	/// call the api which converts the raw article text
	/// into spritz text
	function onStartSpritzClick(event) {
		// stop spritzing so the delay of sending info to the api doesn't make it look funny
		spritzController.stopSpritzing()
		var post = $(".post.hentry.content", this.parentElement.parentElement);
		var blogPostText = $(post).find(".post-body.entry-content").html();
		
		var virtEle = document.createElement('div');
		virtEle.innerHTML =  blogPostText;
		$(virtEle).find("pre:has(code)").remove();

		var text = $(virtEle).text();
		var locale = "en_us;";
		
		// Send to SpritzEngine to translate
		$("#spritzer").prependTo(this.parentElement);
		
		SpritzClient.spritzify(text, locale, onSpritzifySuccess, onSpritzifyError);
	};
	
	
	/// Custom Options settings
	var customOptions = {
            placeholderText:    { startText: '' },
			redicleWidth: 	    $(".post.hentry.content").width() -30,	// Specify Redicle width
			redicleHeight: 	    76,		// Specify Redicle height
			header: {                                                       // Enable close button in header
            	close: true,
            	closeHandler: onSpritzClose
        	}
	};

	/// places a Spritz This Post button on the top right corner of 
	/// every post, then attaches an even handler to the article's
	/// containing div which will recieve the bubbled up click event
	/// and fire the event, passing the img which was clicked back.
	var createSpriterizeButtons = function(){
		var posts = $(".date-outer");
		$.each(posts, function( key, value ) {
  			$(this).append("<div><img class='imgBtn' src='http://imageshack.com/a/img661/1017/ZmjfvX.png'></img> this post</div>");
		});

  		$(".blog-posts.hfeed").on("click", ".imgBtn", onStartSpritzClick);
	}

	/// Initilizes SPRITZ and attaches to spritzer
	var init = function() {
		$("#spritzer").hide();

		createSpriterizeButtons();		
		 
 		// Construct a SpritzController passing the customization options
 		spritzController = new SPRITZ.spritzinc.SpritzerController(customOptions);
 		
 		// Attach the controller's container to this page's "spritzer" container
 		spritzController.attach($("#spritzer"));
	};
	
	
	$(document).ready(function() {
		init();
	});

	
})();

</script>
