const timeArray = require("./timearray.json");
function time() {
  try {
    const date = new Date();
    /*
    যদি India বাদে অন্য দেশের Hosting Service use করা হয়
    তাহলেও নিচের Code গুলি সঠিকভাবে কাজ করবে
    কারণ এটি সরাসরি India Hour Minute get করে না এটি 
    UTC (আন্তর্জাতিক সময়) get করে। এটি UTC র সাথে 6 ঘণ্টা যোগ, 30 মিনিট বিয়োগ করে। 
    [যেহেতু UTC Time, India Time এর থেকে 5 Hour 30 Minute এগিয়ে আছে]
    */
    let indiaHour = date.getUTCHours() + 6;
    let indiaMinute = date.getUTCMinutes() - 30;
    if (indiaHour > 24) {
      indiaHour = indiaHour - 24;
    }
    if (indiaMinute < 0) {
      indiaMinute = 60 + indiaMinute;
      indiaHour--;
    }
    const timeObj24 = {};
    const timeObj12 = {};
    timeArray.forEach(iv => {
      // 24 hour
      let hour = iv.hour + indiaHour;
      let minute = iv.minute + indiaMinute;
      if (hour > 24) {
        hour = hour - 24;
      }
      if (hour < 1) {
        hour = 24 + hour;
      }
      if (minute > 59) {
        hour++;
        minute = minute - 60;
      }

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }

      timeObj24[iv.country] = `${hour}:${minute}`;
      // 12 hour
      if (+hour > 12) {
        hour = +hour - 12;
        if (hour < 10) {
          hour = "0" + hour;
        }
        timeObj12[iv.country] = `${hour}:${minute} PM`;
      } else {

        timeObj12[iv.country] = `${hour}:${minute} AM`;
      }
    })
    console.log(timeObj24);
    return {
      hour24: timeObj24,
      hour12: timeObj12
    }
  } catch ({ message }) {
    console.log(message);
  }
}

module.exports = time;