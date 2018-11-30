(function($, Drupal) {
  Drupal.behaviors.mockme = {
    attach: function (context, settings) {
      console.log(context === document, context.valueOf());
      if (context.toString() === '[object HTMLFormElement]') {
        const $container = document.getElementById(settings.mockmeRoot);
        if ($container && typeof RenderMockMe !== 'undefined') {
          new RenderMockMe($container, settings);
        }
      }
    }
  };

  //argument passed from InvokeCommand
  $.fn.myAjaxCallback = function (argument)
  {
    // TODO: save image via Controller -> returns fid -> set fid in upload_button -> call file.triggerUploadButton()
    console.log('myAjaxCallback is called.');

    var fieldName = argument.replace('_', '-')
    // Now Click the fields upload Button.
    // $('.field--name-' + fieldName)
    //   .find('[id^="edit-' + fieldName + '"][id$="-upload-button"]')
    //   .trigger('mousedown');
  };
})(jQuery, Drupal);
