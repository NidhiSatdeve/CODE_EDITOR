import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash';
var CodeMirror = require('react-codemirror');
export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props
  const [open, setOpen] = useState(true)
  const debouncedOnChange = debounce(onChange, 1); // Debounce onChange events by 500ms
  
  function handleChange(editor, data, value) {
    console.log(value + "curit");
    debouncedOnChange(value)
    onChange(value);
  }

  function handleChange1(value1) {
    console.log(value1 + "curit");
    debouncedOnChange(value1)
    onChange(value1);
  }
  function getInitialState() {
    return {
        code: "// Code",
    };
  };
  function updateCode(newCode) {
      console.log(newCode);
      onChange(newCode);
  };
  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          // onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <CodeMirror className="code-mirror-wrapper" value={value} onChange={updateCode}
           options = {{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true
        }} />
      {/* <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        // className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      /> */}
    </div>
  )
}
