import { useState } from "react";
import cross from "../../assets/cross.svg";
import { Button } from "antd";
export default function DateTimePicker({
  setShowTimePicker,
  isScheduled,
  setScheduled,
  date,
  setDate,
  time,
  setTime,
}) {
  //   console.log(date);
  //   console.log(time);
  return (
    <div className="datePicker">
      <div className="flex justify-between items-center">
        <h1>date time picker</h1>
        <img
          src={cross}
          className="h-7 cursor-pointer"
          onClick={() => setShowTimePicker(false)}
          alt=""
        />
      </div>
      <div>
        <input onChange={(e) => setDate(e.target.value)} type="date" />
        <input type="time" onChange={(e) => setTime(e.target.value)} />
        <Button
          className="cursor-pointer p-1 m-1"
          type="submit"
          onClick={() => {
            if (date && time) {
              setScheduled(true);
              setShowTimePicker(false);
            }
          }}
        >
          Schedule
        </Button>
      </div>
    </div>
  );
}
