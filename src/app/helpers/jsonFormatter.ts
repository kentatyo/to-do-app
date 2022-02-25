import Data from "../data/taskData.json";
import { TaskState, Task } from "../taskSlice";

// const sampleData = [
//   {
//     id: 1,
//     title: "aaaaa",
//     abstract: "bbbbbbbbbbbbbb",
//     subTask: [
//       {
//         title: "cccc",
//         finishedFlag: true,
//       },
//       {
//         title: "dddd",
//         finishedFlag: false,
//       },
//     ],
//     startDate: "07-09-2021",
//     endDate: "08-09-2021",
//     finishedFlag: false,
//   },
//   {
//     id: 2,
//     title: "eeeeeeee",
//     abstract: "ffffffffffffffff",
//     subTask: [
//       {
//         title: "gggg",
//         finishedFlag: false,
//       },
//       {
//         title: "hhhhh",
//         finishedFlag: false,
//       },
//       {
//         title: "iiiiiiii",
//         finishedFlag: false,
//       },
//     ],
//     startDate: "09-09-2021",
//     endDate: "10-09-2021",
//     finishedFlag: false,
//   },
// ];

//これをオブジェクト内をループで回して、新しいオブジェクト配列を生成し、エクスポート
let Date2: Task[] = Data.map((task) => {
  //日付文字列を日付型のDateオブジェクトに変換
  let startDate = new Date(task.startDate);
  let endDate = new Date(task.endDate);
  //Date型のものをstartDateに書き込んだ新しいオブジェクトを生成
  let rObj: Task = {
    ...task,
    startDate: startDate,
    endDate: endDate,
  };
  return rObj;
});

console.log(Date2);
export default Date2;
