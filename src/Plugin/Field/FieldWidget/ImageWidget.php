<?php

namespace Drupal\mockme\Plugin\Field\FieldWidget;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\image\Plugin\Field\FieldWidget\ImageWidget as CoreImageWidget;
use Drupal\Core\Render\Element;

/**
 * Plugin implementation of the 'mockme_image_field_widget' widget.
 *
 * @FieldWidget(
 *   id = "mockme_image_field_widget",
 *   label = @Translation("MockMe Image"),
 *   field_types = {
 *     "image"
 *   }
 * )
 */
class ImageWidget extends CoreImageWidget {

  use MockMeWidgetTrait;

  /**
   * @var string  React Root.
   */
  private $mockmeRoot = 'mockme-root';

  /**
   * {@inheritdoc}
   */
//  public static function defaultSettings() {
//    return [
//      'size' => 60,
//      'placeholder' => '',
//    ] + parent::defaultSettings();
//  }

  /**
   * {@inheritdoc}
   */
//  public function settingsForm(array $form, FormStateInterface $form_state) {
//    $elements = [];
//
//    $elements['size'] = [
//      '#type' => 'number',
//      '#title' => t('Size of textfield'),
//      '#default_value' => $this->getSetting('size'),
//      '#required' => TRUE,
//      '#min' => 1,
//    ];
//    $elements['placeholder'] = [
//      '#type' => 'textfield',
//      '#title' => t('Placeholder'),
//      '#default_value' => $this->getSetting('placeholder'),
//      '#description' => t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
//    ];
//
//    return $elements;
//  }

  /**
   * {@inheritdoc}
   */
//  public function settingsSummary() {
//    $summary = [];
//
//    $summary[] = t('Textfield size: @size', ['@size' => $this->getSetting('size')]);
//    if (!empty($this->getSetting('placeholder'))) {
//      $summary[] = t('Placeholder: @placeholder', ['@placeholder' => $this->getSetting('placeholder')]);
//    }
//
//    return $summary;
//  }

  /**
   * AJAX callback.
   *
   * @param $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @param $request
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   * @throws \Exception
   */
  public function ajaxCallback(&$form, FormStateInterface &$form_state, $request) {


    $response = new AjaxResponse();
    $response->addCommand(new InvokeCommand(NULL, 'myAjaxCallback', [$this->fieldDefinition->getName()]));
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);

    $element['#process'][] = [get_class($this), 'processMockMeWidget'];
    $element['#previous_value_callback'] = $element['#value_callback'];
    $element['#value_callback'] = [get_class($this), 'valueCallbackMockMeWidget'];

    $fieldName = $element['#field_name'];
    $title = $element['#title'];
    $description = $element['#description'];
    $element['#upload_location'] .= '/mockme';

    $mockme_hidden = [
      '#type' => 'hidden',
      '#value' => '',
    ];

    $mockme_submit = [
      '#type' => 'button',
      '#value' => $this
        ->t('Save MockMe Mock Up'),
      '#ajax' => [
        'callback' => [
          $this,
          'ajaxCallback',
        ],
      ],
    ];

    $element['mockme_root'] = [
      '#type' => 'fieldset',
      '#open' => TRUE,
      '#markup' => '<div id="' . $this->mockmeRoot . '"></div>',
      '#title' => $title,
      '#description' => '',
      '#attached' => [
        'drupalSettings' => [
          'mockmeRoot' => $this->mockmeRoot,
          'fieldName' =>$fieldName,
        ],
        'library' => [
          'mockme/react',
          'mockme/component',
          'mockme/mockme',
        ],
      ],
      '#upload_location' => $element['#upload_location'],
      'mockme_hidden' => $mockme_hidden,
//      'mockme_submit' => $mockme_submit,
    ];
//    $element['mockme_hidden'] = $mockme_hidden;
    return $element;
  }


  /**
   * {@inheritdoc}
   */
//  public static function validateElement(array $element, FormStateInterface $form_state) {
//    $field_name = $element['#parents'][0];
//    $input = $form_state->getUserInput();
//    $imageData = $input[$field_name][0]['mockme_root']['mockme_hidden'];
//    $uploadLocation = $element['#upload_location'];
//
//    // Try to get Image and save it.
//    if ($file = self::saveMockUpImage($imageData, $uploadLocation)) {
//      $form_state->setValue([$field_name, 0, 'fids'], [$file->id()]);
//
//      $inputUpdated = array_merge($input, ['files' => [ $field_name . '_0' => $file->id() ] ]);
//      $form_state->setUserInput($inputUpdated);
//
//      $form_state->setValueForElement($element, [$element['mockme_hidden']['#value'] => $imageData]);
//    }
//    $form_state->setRebuild();
//  }


  /**
   * {@inheritdoc}
   */
//  public function massageFormValues(array $values, array $form, FormStateInterface $form_state)
//  {
//    foreach ($values as &$value) {
//      if (count($value['fids'])) {
//        foreach ($value['fids'] as $fid) {
//          $value['backup_fids'][] = $fid;
//        }
//      }
//    }
//
//    return $values;
//  }


  /**
   * Form API callback: Processes a screenshot widget element.
   *
   * This method is assigned as a #process callback in formElement() method.
   *
   * @param $element
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * @param $form
   *
   * @return
   */
  public static function processMockMeWidget($element, FormStateInterface $form_state, $form) {
    $element['upload']['#attributes']['class'][] = 'hidden';
    unset($element['upload_button']['#attributes']['class']);
    $element['upload_button']['#attributes']['class'][] = 'make-screenshot-button';
    $element['upload_button']['#value'] = t('Save MockMe Mock Up');

    if (!empty($element['#files']) && $element['#preview_image_style']) {
      $element['mockme_root']['#type'] = 'hidden';
    }
    else {
      $element['mockme_root']['#type'] = 'fieldset';
    }

    return $element;
  }


  /**
   * Value callback for screenshot widget element.
   *
   * @param $element
   * @param $input
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return bool|mixed
   */
  public static function valueCallbackMockMeWidget(&$element, $input, FormStateInterface $form_state) {
    $imageData = $input['mockme_root']['mockme_hidden'];
    $uploadLocation = $element['#upload_location'];

    if (empty($uploadLocation)) {
      $uploadLocation = file_default_scheme() . '://';
    }
    // Try to get Image and save it.
    try {
      if ($file = self::saveMockUpImage($imageData, $uploadLocation)) {
        $input['fids'] = ($file) ? $file->id() : '';
      }
    } catch (\Exception $exception) {

    }

    return call_user_func_array($element['#previous_value_callback'], [&$element, $input, &$form_state]);
  }


  /**
   * Saves an image sent from a browser.
   *
   * @param $imageData            URL-Base64 encoded Image String.
   * @param $destination String   URI to place file.
   * @param string $fileName      Filename without extension.
   *
   * @return \Drupal\file\FileInterface|false
   * @throws \Exception
   */
  public static function saveMockUpImage($imageData, $destination, $fileName = 'test') {
    $file = false;
    // Do we have a correct String format? Then extract Data & Type.
    if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
      $data = substr($imageData, strpos($imageData, ',') + 1);
      $type = strtolower($type[1]);

      if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new \Exception('invalid image type');
      }

      $data = base64_decode($data);
    }
    if (!empty($data)) {
      file_prepare_directory($destination, FILE_CREATE_DIRECTORY);
      $file = file_save_data($data, $destination . '/' . $fileName . '.' . $type);
    }
    return $file;
  }

}
