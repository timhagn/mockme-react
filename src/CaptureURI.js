import React from "react";

const CaptureURIInput = React.forwardRef((props, ref) => (
    <div>
      <label htmlFor="url">URL</label>
      <input ref={ref} type="url" className="form-control" name="url"
             placeholder="URL to screenshot" />
      <button onClick={props.onClick}>Grab Image</button>
    </div>
))

export default CaptureURIInput