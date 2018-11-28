import React from "react";

const CaptureURIInput = React.forwardRef((props, ref) => (
    <div className="js-form-item form-item js-form-type-textfield form-type-textfield">
      <label htmlFor="url">URL to snap</label>
      <input ref={ref}
             type="url"
             className="js-text-full text-full form-text"
             name="url"
             placeholder="URL to screenshot" />
      <input className="button js-form-submit form-submit"
             formNoValidate="formnovalidate"
             type="button"
             name="field_image_0_upload_button"
             onClick={props.onClick}
             value="Grab Image" />
    </div>
))

export default CaptureURIInput