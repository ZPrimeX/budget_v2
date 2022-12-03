import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export const Datetime = (props) => {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  const [ctime, setTime] = useState(time);
  const [cdate, setDate] = useState(date);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    date = new Date().toLocaleDateString();
    setDate(date);
    setTime(time);
  };

  setInterval(UpdateTime);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Typography>{ctime}</Typography>
        <Typography>{cdate}</Typography>
      </CardContent>
    </Card>
  );
};

// function showTime() {
//   var date = new Date();
//   var h = date.getHours(); // 0 - 23
//   var m = date.getMinutes(); // 0 - 59
//   var s = date.getSeconds(); // 0 - 59
//   var session = "AM";

//   if (h == 0) {
//     h = 12;
//   }

//   if (h > 12) {
//     h = h - 12;
//     session = "PM";
//   }

//   h = h < 10 ? "0" + h : h;
//   m = m < 10 ? "0" + m : m;
//   s = s < 10 ? "0" + s : s;

//   var time = h + ":" + m + ":" + s + " " + session;
//   document.getElementById("MyClockDisplay").innerText = time;
//   document.getElementById("MyClockDisplay").textContent = time;

//   setTimeout(showTime, 1000);
// }

// export const Datetime = () => {
//   return (
//     <div id="MyClockDisplay" class="clock">
//       <Typography>{showTime()}</Typography>
//     </div>
//   );
// };
