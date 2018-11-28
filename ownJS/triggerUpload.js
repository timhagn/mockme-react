(function($)
{
  //argument passed from InvokeCommand
  $.fn.myAjaxCallback = function(argument)
  {
    // TODO: save image via Controller -> returns fid -> set fid in upload_button -> call file.triggerUploadButton()

    console.log('myAjaxCallback is called.');
    //set some input field's value to 'My arguments'
    $('#some-wrapper input').attr('value', argument);
  };
})(jQuery);
