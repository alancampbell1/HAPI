/*
 * These functiona are for SplashScreen capabilities. The user sees the page for 3 seconds before the 
 * redirect() function kicks in and sends the user to the LoginOptions page.
 */
    function timeout(){
      window.setTimeout("redirect()",3000)}

    function redirect(){
      window.location='LoginOptions'
      return
    }
