import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState, useRef } from "react";

function UserPanelDatePicker({ setdate }) {
  const [value, setValue] = useState(new DateObject({ calendar: persian }));
  const datePickerRef = useRef(null); // Create a ref for the DatePicker

  const handleChange = (selectedValue) => {
    if (selectedValue instanceof DateObject) {
      setValue(selectedValue);
      const formattedDate = selectedValue.format("YYYY/MM/DD"); // Convert to string format
      setdate(formattedDate); // Pass the formatted date string
    }
  };

  const openCalendarHandler = (e) => {
    e.preventDefault(); // Prevent the form submission when button is clicked
    datePickerRef.current.openCalendar(); // Open calendar when button is clicked
  };

  return (
    <div className="w-full relative">
      {/* Button to open the calendar and show selected date */}
      <button
        onClick={openCalendarHandler} // Open the calendar when clicked
        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
      >
        {value ? value.format("YYYY/MM/DD") : "انتخاب تاریخ"}{" "}
        {/* Display selected date or default text */}
      </button>

      {/* DatePicker component */}
      <DatePicker
        ref={datePickerRef} // Attach ref to DatePicker
        minDate={new DateObject({ calendar: persian }).set({
          year: 1300,
          month: 1,
          day: 1,
        })}
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={handleChange}
        inputClass="hidden" // Hide the input field
      />
    </div>
  );
}

export default UserPanelDatePicker;
