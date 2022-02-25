import { StaticDatePicker } from "@mui/lab";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Date2 from "./helpers/jsonFormatter";

//initialStateはjsonformatterから取得。reducerはタスクの削除や新規登録、更新。
export interface SubTask {
  title: string;
  finishedFlag: boolean;
}

export type Task = {
  id: number;
  title: String;
  abstract?: String;
  subTask: SubTask[];
  startDate: Date | null;
  endDate: Date | null;
  finishedFlag: boolean;
  taskFinish?: () => void;
};

export type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = { tasks: Date2 };

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      console.log(action.payload.title);
      //当該タスクのみ更新、それ以外は更新せず
      state.tasks = state.tasks.map((task, index) =>
        index + 1 === action.payload.id ? action.payload : task
      );
      console.log(state.tasks[1].title);
    },
    //タスクの完了を行う関数
    // taskFinish: (state: TaskState, action: PayloadAction<Task>) => {
    //   console.log(action.payload.id);
    //   console.log(state.tasks[action.payload.id].finishedFlag);
    //   state.tasks[action.payload.id].finishedFlag = true;
    // return [...state.tasks, state.tasks[action.payload.id]];
  },
});
