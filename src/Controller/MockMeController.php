<?php

namespace Drupal\mockme\Controller;

use DOMDocument;
use Screen\Capture;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\File\FileSystemInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class MockMeController.
 */
class MockMeController extends ControllerBase {

  /**
   * @var \Drupal\Core\File\FileSystemInterface
   */
  private $fileSystem;

  public $snapshotDir = 'public://mockme';
  public $jobsDir = 'public://mockme/jobs';

  /**
   * MockMeController constructor.
   *
   * @param \Drupal\Core\File\FileSystemInterface $fileSystem
   */
  public function __construct(FileSystemInterface $fileSystem) {
     $this->fileSystem = $fileSystem;
  }

  /**
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *
   * @return \Drupal\Core\Controller\ControllerBase|\Drupal\mockme\Controller\MockMeController
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('file_system')
    );
  }


  /**
   * Returns a given Image to the browser.
   *
   * @param $fileName
   * @param $mimeType
   *
   * @return \Symfony\Component\HttpFoundation\Response
   */
  function returnImage($fileName = '', $mimeType = '')  {
    $response = new Response();
    $response->headers->set('cache-control', "no-cache, no-store, must-revalidate");
    $response->headers->set('pragma', "no-cache");
    $response->headers->set('expires', 0);
    $response->headers->set('content-type', $mimeType);
    $response->headers->set('content-length', filesize($fileName));
    $fileContents = file_get_contents($fileName);
    $response->setContent($fileContents);
    return $response;
  }

  /**
   * Get's the OpenGraph Image "og:image" or tries to resort to "twitter:image".
   *
   * @param $url
   *
   * @return null | string
   */
  function getOpenGraphImage($url) {
    $pageContent = file_get_contents($url, false, null,0, 4096);

    $domObj = new DOMDocument();
    @$domObj->loadHTML($pageContent);

    $ogImage = null;
    $twitterImage = null;

    foreach($domObj->getElementsByTagName('meta') as $meta) {
      if($meta->getAttribute('property') === 'og:image'){
        $ogImage = $meta->getAttribute('content');
      }
      if($ogImage && $meta->getAttribute('property') === 'twitter:image') {
        $twitterImage = $meta->getAttribute('content');
      }
    }
    return $ogImage ? $ogImage : $twitterImage;
  }

  /**
   * Route to create a Screenshot.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return array|\Symfony\Component\HttpFoundation\Response
   * @throws \Screen\Exceptions\PhantomJsException
   */
  public function createScreenshot(Request $request) {
    if ($snapshotURL = $request->get('url')) {
      file_prepare_directory($this->snapshotDir, FILE_CREATE_DIRECTORY);
      file_prepare_directory($this->jobsDir, FILE_CREATE_DIRECTORY);
      $snapshotFile =
        $this->fileSystem
          ->realpath(
            $this->snapshotDir . DIRECTORY_SEPARATOR . md5($snapshotURL) . '.jpg'
          );

      // Do we have a cached file and "cache" shall not be reset?
      if (file_exists($snapshotFile) &&
          !$request->get('reset')) {
        $response = $this->returnImage($snapshotFile, 'image/jpeg');
      }
      else {
        // Try to get OpenGraph / Twitter image.
        if ($pageOGImage = $this->getOpenGraphImage($snapshotURL) &&
            !$request->get('noog')) {
          $ogImageContent =
            imagecreatefromstring(file_get_contents($pageOGImage));
          imagejpeg($ogImageContent, $snapshotFile, 100);

          $imageInfo = getimagesize($snapshotFile);
          $response = $this->returnImage($snapshotFile, $imageInfo['mime']);
        }
        else {
          // Else try to create snapshot.
          $screen = new Capture($snapshotURL);
          $screen->setImageType('jpg');

          $screen->jobs
            ->setLocation($this->fileSystem->realpath($this->jobsDir));

          // Do we have a requested width and / or height?
          if ($width = $request->get('w')) {
            $screen->setWidth(intval($width));
          }
          if ($height = $request->get('h')) {
            $screen->setHeight(intval($height));
          }

          $screen->save($snapshotFile);

          $response = $this->returnImage($screen->getImageLocation(),
            $screen->getImageType()->getMimeType());
        }
      }
      return $response;
    }
    return [];
  }

}
