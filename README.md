#Blog Spritzer

## Synopsis

This is a simple tool for adding a Spritz reader to you blog/article based website.
Currently it only supports blogger, but it could be (and will be) re-written to be less coupled to bloggers HTML markdown.

## Demo
A live demo is avaliable from my blog: http://www.mcrook.com/
Just click on Spritz this post!

## Why?

After being shown Spritz by another work colleague I really wanted to add it to my blog. Initially I didn't have a developer sdk invite so I reverse engineered the Spritzlet bookmark bar tool to Spritz my blog. Unfortunately, due to Bloggers weird default HTML markdown I had to do allot of work in the Template and even after that it still didn't work 100%.

I emailed Spritz asking for help in attempting to optimise my HTML even more in attempt to get it to work, they ended up sending me  a developer SDK access invite so I decided this could be my first go!

## Installation

For initial testing, using my clientId probably won't break everything, but if you plan to use this as more than just a test, you will need to goto http://www.spritzinc.com/developers/ and apply for developer access. If too many people start using my clientId I'm sure I'll get an email from Spritz informing me and I will have to restrict my clientId to my domain :( and that would be a bummer.

Ok, now for the instructions:
1. Currently to install to your blogger you need to add a Html/JavaScript gadget and paste the code in to there.
2. You will need to goto your Pages section of your blogger, from there create a new page called "login_success" or what ever you want. Change the input to HTML and copy/paste the following code:

```javascript
<script type="text/javascript">
   var hash = window.location.hash;
   var origin = window.location.protocol + "//" + window.location.host;

   // also set token as window.name, just as a crazy fail safe
   window.name = hash;

   // postMessage does not work reliably in IE, pass the value through localStorage
            if (typeof(localStorage) !== 'undefined') {
                try {
                 localStorage.setItem("spritz.authResponse", hash);
             }
             catch(e) {
              if(console) {
               console.log(e, 'Can\'t write to localStorage');
              }
             }
            }

            if (window.opener) {
               window.opener.postMessage(hash, origin);
            }
  </script>

<br />
<h1>Login Success</h1>
<div>
Unfortunately Currently I cannot redirect you back to the blog you were reading, just close this popup window and login again on the Spritz reader, this will log you in :)</div>
```

Don't worry that when you browse the page it looks blank, this is used by Spritz to manage user sesions.

##### NOTE:
I haven’t tested these instructions from scratch in a new blog, so there might be some missing information. This will be fixed soon.

## Future Plans
1. Test on a new blank Blogger blog.
2. Test that the template of the blog doesn't break it
3. de-couple from Blogger through taking the JQuery selectors out and replace for configurable values so the user can substitute the tags of their HTML markup as most blogs/article based sites follow the same format.
4. Potentially turn this into a Blogger Gadget aswell, thought I initially tried to make this a Gadget, but got weird errors from blogger when I coppied/pasted their examples to test :|

## Contributors

Currently just me :) but happy for any help

## License

See LICENSE
