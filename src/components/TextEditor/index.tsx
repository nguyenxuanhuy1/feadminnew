import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
interface IProps {
  form?: any;
  field?: any;
  label?: string;
  isRequired?: boolean;
  onChange?: any;
  onlyText?: boolean;
  fixHeight?: number;
  disabled?: boolean;
  textAudio?: string;
  height?: string;
}

const options = {
  buttonList: [
    ["fontSize"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["table", "link", "image"],
    ["showBlocks", "video"],
  ],
  fontSize: [10, 11, 12, 13, 14, 16, 18, 20, 24],
};

const TextEditor = (props: IProps) => {
  const { form, field, label, isRequired, onChange, disabled, height } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const editorRef = useRef<SunEditorCore>(null);

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };
  /**
   * @type {React.MutableRefObject<SunEditor>}
   */

  const handleChange = (content: string) => {
    if (editorRef.current) {
      onChange?.(content);
    } else {
      onChange?.(content);
    }
  };

  return (
    <>
      {label && (
        <label>
          {isRequired && <span style={{ color: "red" }}>*</span>}
          {label || ""}
        </label>
      )}
      <SunEditor
        name={name}
        setContents={value}
        autoFocus={false}
        getSunEditorInstance={getSunEditorInstance}
        onChange={handleChange || field.onChange}
        setOptions={options}
        height={height || "400px"}
        onImageUpload={(e) => {}}
        disable={disabled}
      />
      {touched[name] && errors[name] && (
        <div className="err-text" style={{ color: "red" }}>
          {errors[name]}
        </div>
      )}
    </>
  );
};

export default TextEditor;
