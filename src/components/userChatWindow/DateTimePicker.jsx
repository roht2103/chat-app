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
  return (
    <div className="datePicker">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-[#b473d7] mb-2">
          Pick Date and Time
        </p>
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
