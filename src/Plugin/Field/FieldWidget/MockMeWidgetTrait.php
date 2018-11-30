<?php

namespace Drupal\mockme\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\NestedArray;
use Drupal\Component\Utility\Bytes;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldFilteredMarkup;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\Element;
use Drupal\Core\Render\ElementInfoManagerInterface;
use Drupal\file\Element\ManagedFile;
use Drupal\file\Entity\File;
use Drupal\Component\Utility\Xss;

trait MockMeWidgetTrait {

  /**
   * Get the optimum chunk size.
   */
  public function getChunkSize() {
    // 500 Kb per chunk does not sound bad...
    $good_size = 1024 * 500;
    // This is what the PLUPLOAD module
    // field element takes as the default
    // chunk size.
    $size = Bytes::toInt(ini_get('post_max_size'));
    if ($size > $good_size)
      $size = $good_size;
    return $size;
  }

  /**
   * Returns the maximum configured
   * file size for the Field stroage
   * in Bytes.
   *
   * @return double|int
   */
  public function getMaxFileSize() {
    // We don't care about PHP's max post
    // or upload file size because we use
    // plupload.
    $size = $this->getFieldSetting('max_filesize');
    $size = Bytes::toInt($size);
    return $size;
  }

}
