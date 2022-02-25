/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskBox from "../components/TaskBox";
import { TaskState, Task } from "../taskSlice";
import { RootState } from "../../index";
import { taskSlice } from "../taskSlice";
import { Box } from "@mui/material";
import { css } from "@emotion/react";

// const taskList1 = [
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
//     startDate: "",
//     endDate: "",
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
//     ],
//     startDate: "",
//     endDate: "",
//     finishedFlag: false,
//   },
// ];
//jsonデータはstateの初期値として登録。その後、更新等はstateで管理する。
//つまりここでは、stateから読み込むだけになる

const TaskList: VFC = () => {
  //まずstoreからtaskのステートを引っ張る
  const taskList: Task[] = useSelector((state: RootState) => state.task.tasks);
  const date: Date = useSelector((state: RootState) => state.date.date);
  const dispatch = useDispatch();
  // const { taskFinish } = taskSlice.actions;
  const listItems = taskList
    .filter(
      (task) =>
        task.finishedFlag === false &&
        task.startDate !== null &&
        task.startDate <= date &&
        task.endDate !== null &&
        task.endDate >= date
    )
    .map((task) => (
      <TaskBox
        id={task.id}
        title={task.title}
        abstract={task.abstract}
        subTask={task.subTask}
        startDate={task.startDate}
        endDate={task.endDate}
        finishedFlag={task.finishedFlag}
      />
    ));
  const listItemsFinished = taskList
    .filter(
      (task) =>
        task.finishedFlag === true &&
        task.startDate !== null &&
        task.startDate <= date &&
        task.endDate !== null &&
        task.endDate >= date
    )
    .map((task) => (
      <TaskBox
        id={task.id}
        title={task.title}
        abstract={task.abstract}
        subTask={task.subTask}
        startDate={task.startDate}
        endDate={task.endDate}
        finishedFlag={task.finishedFlag}
      />
    ));
  return (
    <>
      <Box>{listItems}</Box>
      <Box>{listItemsFinished}</Box>
    </>
  );
};

export default TaskList;
