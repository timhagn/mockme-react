(function($, Drupal)
{
  Drupal.behaviors.mockme = {
    attach: function (context, settings) {
      const $container = document.getElementById(settings.mockmeRoot);
      if (typeof window.mockmeRenderer !== 'undefined') {
        window.mockmeRenderer.reRender($container);
      }
      else if (typeof renderMockMe !== 'undefined') {
        const $mockmeRenderer = new renderMockMe($container, settings);
        window.mockmeRenderer = $mockmeRenderer;
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
