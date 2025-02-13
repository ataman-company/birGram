import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState } from "react";
import InputIcon from "react-multi-date-picker/components/input_icon";

function UserPanelDatePicker({ setdate }) {
  const [value, setValue] = useState(new DateObject({ calendar: persian }));

  const handleChange = (selectedValue) => {
    // if (selectedValue instanceof DateObject) {
    //   setValue(selectedValue);
    //   setdate(selectedValue.toDate()); // ✅ Pass the Date object directly
    // }
    if (selectedValue instanceof DateObject) {
      setValue(selectedValue);
      const formattedDate = selectedValue.format("YYYY/MM/DD"); // Convert to string format
      setdate(formattedDate); // ✅ Pass the formatted date string
    }
  };

  return (
    <div className="w-full">
      <DatePicker
        render={<InputIcon />}
        minDate={new DateObject({ calendar: persian }).set({
          year: 1300,
          month: 1,
          day: 1,
        })} // ✅ Use DateObject
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={handleChange}
        inputClass="w-full"
        // ✅ Use inputClass instead of className
      />
    </div>
  );
}

export default UserPanelDatePicker;
