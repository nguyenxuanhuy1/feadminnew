import { DatePicker as DatePickerAntd } from "antd";
import viVN from "antd/es/locale/vi_VN";
import { ErrorMessage } from "formik";
import DatePickerProps from "./interface";
import dayjs from "dayjs";
import { Fragment } from "react";

const DatePicker = ({
  label,
  isRequired,
  defaultValue,
  format,
  placeholder,
  value,
  picker,
  disabled,
  form,
  field,
  onChange,
  onBlur,
  className,
  name,
  mode,
  isMin,
  isDisableDate,
  maxDate,
  minDate,
  showTime = true,
}: DatePickerProps<any, any>) => {
  const { errors, touched } = form ?? {};

  const error = errors?.[field?.name || ""] || ("" as string);
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const onChangeField = (date: any, dateString: string) => {
    form?.setFieldValue(name || field?.name || "", dateString);
  };

  const allowedKeys = [
    "Ctrl",
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
  ];

  const onBlurField = (e: any) => {};

  const disabledDate = (current: any) => {
    if (current && maxDate && format === "YYYY") {
      return current.isBefore(maxDate, "day");
    }
    if (current && minDate && format === "YYYY") {
      return current.isAfter(minDate, "day");
    } else {
      return false;
    }
  };

  const disabledMinDate = (current: dayjs.Dayjs | null) => {
    const now = dayjs();

    if (current && current.isBefore(now)) {
      // Nếu thời gian được chọn nhỏ hơn thời gian hiện tại
      return true;
    }

    return false; // Cho phép chọn
  };
  const disabledDateTime = (current: dayjs.Dayjs | null) => {
    if (isDisableDate) {
      const now = dayjs(); // Lấy thời gian hiện tại

      if (current && current.isBefore(now)) {
        // Nếu thời gian được chọn nhỏ hơn thời gian hiện tại
        return {
          disabledHours: () => range(0, now.hour()), // Vô hiệu hóa các giờ từ 0 đến giờ hiện tại
          disabledMinutes: () => range(0, now.minute()), // Vô hiệu hóa các phút từ 0 đến phút hiện tại
          disabledSeconds: () => range(0, now.second()), // Vô hiệu hóa các giây từ 0 đến giây hiện tại
        };
      }
    }

    return {};
  };
  return (
    <div>
      <Fragment>
        <span>{label}</span>
        {isRequired && <span style={{ color: "red", margin: "0 4px" }}>*</span>}
      </Fragment>
      <DatePickerAntd
        name={name}
        className={`${className}`}
        defaultValue={defaultValue}
        format={format || "HH:mm:ss DD/MM/YYYY"}
        placeholder={placeholder}
        picker={picker}
        disabled={disabled}
        onBlur={onBlur || onBlurField}
        onChange={onChange || onChangeField}
        locale={viVN.DatePicker}
        value={
          value ||
          (field?.value && dayjs(field?.value, format || "HH:mm:ss DD/MM/YYYY"))
        }
        style={{
          width: "100%",
          color: "#495057",
          paddingLeft: "12px",
          minHeight: "38px",
          marginTop: "4px",
          borderRadius: "4px",
        }}
        onKeyDown={(e) => {
          if (
            !/^[\d/]$/.test(e.key) &&
            !allowedKeys.includes(e.key) &&
            !(e.ctrlKey && (e.key === "a" || e.key === "c" || e.key === "v"))
          ) {
            e.preventDefault();
          }
        }}
        disabledDate={isMin ? disabledMinDate : disabledDate}
        disabledTime={disabledDateTime}
        {...(showTime
          ? { showTime: { defaultValue: dayjs("00:00:00", "HH:mm:ss") } }
          : {})}
      />
      {field && touched?.[field?.name || ""] && error && (
        <ErrorMessage
          name={field?.name || ""}
          className="text-red-600"
          component="div"
        />
      )}
    </div>
  );
};

export default DatePicker;
