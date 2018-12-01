# MockMe - A React MockUp Generator

This _**first draft of a**_ tool was quickly thrown together with help from:

* [react-dropzone](https://react-dropzone.netlify.com/)
* [html5-device-mockups](https://github.com/pixelsign/html5-device-mockups)
* [html2canvas](http://html2canvas.hertzen.com/)

And have a look at [screen](https://github.com/microweber/screen/tree/v2.0.0),
if you want to take screenshots of external websites.

Meanwhile, the Drupal module [MockMe Widget](https://github.com/timhagn/mockme)
is built and the React Module, ready for npmjs will (hopefully) follow shortly.


## Available Devices

These are the same as in [html5-device-mockups](https://github.com/pixelsign/html5-device-mockups).

| Name | Filename | Orientations | Colors |
| --- | --- | --- | --- |
| Chromebook | Chromebook | portrait | black |
| Galaxy S3 | galaxyS3 | portrait, landscape | black, white |
| Galaxy S5 | galaxyS5 | portrait, landscape | black, white, gold |
| Galaxy Tab 4 | galaxyTab4 | portrait | black, white |
| HTC One M8 | HtcOneM8 | portrait, landscape | black |
| Huawei P8 | HuaweiP8 | portrait, landscape | gold |
| iMac | iMac | portrait | black |
| iPad | iPad | portrait, landscape | black, white |
| iPad Air 2 | iPadAir2 | portrait, landscape | black, white, gold |
| iPad Pro | iPadPro | portrait, landscape | black, white, gold |
| iPhone 6 | iPhone6 | portrait, landscape | black, white, gold |
| iPhone 6 Plus | iPhone6Plus | portrait, landscape | black, white, gold |
| iPhone SE | iPhoneSE | portrait, landscape | black, white, gold, pink |
| iPhone 5 | iPhone5 | portrait, landscape | black, white |
| iPhone 6 Hand | iPhone6Hand | portrait | black, white |
| iPhone 7 Hand | iPhone7Hand | portrait | black |
| iPhone 7 Hand 2 | iPhone7Hand_2 | portrait | black |
| iPhone 7 | iPhone7 | portrait, landscape | black, white, gold, pink, red |
| Lumia 930 | Lumia930 | portrait, landscape | black, white |
| Macbook | Macbook | portrait | black, white, gold |
| Macbook 2015 | Macbook2015 | portrait | black, white, gold |
| MacbookPro | Macbook2015 | portrait | black |
| Pixel | Pixel | portrait | black, white |
| Samsung TV | SamsungTV | portrait | black |
| Surface Pro 3 | SurfacePro3 | landscape | black |
| Surface Studio | SurfaceStudio | portrait | black |

## Usage

Spin it up and drop an image on the marked dropzone.  
Below you are gonna see a preview of your image and the MockUp.  
After dropping an image, html2canvas will create a canvas you can download it from. 

See `src/DropzonePreview.js` for a simple usage example with `react-dropzone`.  
See `src/MockMeUp.js` for an in-depth view.

The class `<MockMeUp />` has the following PropTypes at the moment:

```js
MockMeUp.propTypes = {
  style: PropTypes.object,
  srcImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  deviceName: PropTypes.string,
  deviceOrientation: PropTypes.string,
  deviceColor: PropTypes.string,  
  deviceInnerWidth: PropTypes.string,
  mockUpStyle: PropTypes.string,
}
``` 

whereas the propTypes define the following:
- style: Style Object for the container component, defaults to `minWidth: '800px'`
- srcImage: A [File](https://developer.mozilla.org/en-US/docs/Web/API/File) Object or an empty String
- deviceName: One of the devices above, defaults to 'Chromebook'
- deviceOrientation: One of the device orientations above, defaults to 'portrait',
- deviceColor: One of the device colors above, defaults to the devices first color,
- deviceInnerWidth: String with CSS for inner Width, defaults to `'min-width: 100%;'`
- mockUpStyle: String with CSS to Style the inner behavior of the Image to Mock

## Initialization

Don't forget to run: `yarn` or `npm install` after cloning this Repo!

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
