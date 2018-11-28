<?php

namespace Drupal\mockme\Plugin\Field\FieldWidget;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Element\ManagedFile;
use Drupal\image\Plugin\Field\FieldWidget\ImageWidget;

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
class MockMeImageFieldWidget extends ImageWidget {

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
   * @return \Drupal\Core\Ajax\AjaxResponse
   */
  public function ajaxCallback($form, FormStateInterface $form_state, $request) {
//    $item = [
//      '#type' => 'item',
//      '#title' => $this
//        ->t('Ajax value'),
//      '#markup' => microtime(),
//    ];
//    $response = new AjaxResponse();
//    $response
//      ->addCommand(new HtmlCommand('#ajax-value', $item));
    $response = new AjaxResponse();
    $response->addCommand(new InvokeCommand(NULL, 'myAjaxCallback', [$this->fieldDefinition->getName()]));
    return $response;

  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $parentElement = parent::formElement($items, $delta, $element, $form, $form_state);

    unset($parentElement['#type']);
    unset($parentElement['#description']);

    $parentElement['#upload_location'] .= '/mockme';

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
      '#open' => true,
      '#markup' => '<div id="' . $this->mockmeRoot . '"></div>',
      '#title' => $parentElement['#title'],
      '#description' => $parentElement['#description'],
      '#attached' => [
        'drupalSettings' => [
          'mockmeRoot' => $this->mockmeRoot,
        ],
        'library' => [
          'mockme/react',
          'mockme/component',
        ],
      ],
      'mockme_submit' => $mockme_submit,
    ];

    return array_merge($parentElement, $element);
  }

  public static function process($element, FormStateInterface $form_state, $form) {
    $processed = parent::process($element, $form_state, $form);

    $processed['upload']['#type'] = 'hidden';
    $processed['upload_button']['#type'] = 'hidden';
    $processed['remove_button']['#type'] = 'hidden';

    unset($processed['#description']);

    return $processed;
  }

}
