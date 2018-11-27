<?php

namespace Drupal\mockme\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
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
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
//    $element = parent::formElement($items, $delta, $element, $form, $form_state);

    $element['mockme_root']['#markup'] = '<div id="' . $this->mockmeRoot . '"></div>';
    $element['mockme_root']['#attached']['drupalSettings']['mockmeRoot'] = $this->mockmeRoot;
    $element['mockme_root']['#attached']['library'] = [
      'mockme/react',
      'mockme/component',
    ];

    return $element;
  }

}
