import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState } from "react";
import InputIcon from "react-multi-date-picker/components/input_icon";

function MyDatePicker({ setDateOfBirth, setDateBirth }) {
  const [value, setValue] = useState(new Date());

  const onchange = (value) => {
    if (value instanceof DateObject) value = value.toDate();
    setValue(value);
    setDateOfBirth(JSON.stringify(value));
    setDateBirth(JSON.stringify(value));
  };

  return (
    <DatePicker
      render={<InputIcon />}
      minDate="1300/1/1"
      className="w-full"
      calendar={persian}
      locale={persian_fa}
      value={value}
      onChange={onchange}
    />
  );
}

export default MyDatePicker;
