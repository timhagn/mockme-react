import React from "react";

// className="form-control"

const CaptureURIInput = React.forwardRef((props, ref) => (
    <div className="js-form-item form-item js-form-type-textfield form-type-textfield">
      <label htmlFor="url">URL</label>
      <input ref={ref} type="url" className="js-text-full text-full form-text" name="url"
             placeholder="URL to screenshot" />
      <button className="js-hide button js-form-submit form-submit" onClick={props.onClick}>Grab Image</button>
      {/*<input className="js-hide button js-form-submit form-submit"*/}
             {/*data-drupal-selector="edit-field-image-0-upload-button"*/}
             {/*formNoValidate="formnovalidate" type="submit"*/}
             {/*id="edit-field-image-0-upload-button"*/}
             {/*name="field_image_0_upload_button" value="Upload">*/}
    </div>
))

export default CaptureURIInput