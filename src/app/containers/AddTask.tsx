/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState, VFC } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  Divider,
  FormGroup,
} from "@mui/material";
import TaskBox from "../components/TaskBox";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { taskSlice, Task } from "../taskSlice";
import { RootState } from "../../index";

const style1 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style = {
  calender: css({
    textAlign: "center",
    width: "35%",
    margin: "1rem",
  }),
  calenderBox: css({
    display: "flex",
    justifyContent: "center",
  }),
  calenderText: css({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  }),
  buttonBox: css({
    display: "flex",
    justifyContent: "center",
    margin: "1rem auto",
  }),
};

const AddTask: VFC = () => {
  // タスクをstateに登録するため
  const dispatch = useDispatch();
  const { addTask } = taskSlice.actions;

  //モーダルの表示に関するstate
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const today = new Date();

  // 登録済みのタスクリストの数を求めたい;
  const taskList: Task[] = useSelector((state: RootState) => state.task.tasks);

  //追加するタスクの型の初期値
  const initialTask: Task = {
    id: taskList.length + 1,
    title: "",
    subTask: [],
    startDate: null,
    endDate: null,
    finishedFlag: false,
  };

  //追加するタスクのためのstate
  const [newTask, setNewTask] = useState(initialTask);

  const [inputError, setInputError] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} css={style.buttonBox}>
        タスク新規追加
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style1}>
          <Typography variant="h6">新規タスク</Typography>
          <TextField
            label="タスクタイトル"
            required
            margin="normal"
            fullWidth
            value={newTask.title}
            error={inputError}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            helperText={inputError ? "タイトルは必須です" : ""}
          />
          <TextField
            label="タスク概要"
            multiline
            rows={4}
            margin="normal"
            fullWidth
            value={newTask.abstract}
            onChange={(e) =>
              setNewTask({ ...newTask, abstract: e.target.value })
            }
          />
          <Divider />
          <FormGroup>
            <TextField label="サブタスク" margin="normal" fullWidth />
          </FormGroup>
          <Divider />
          <div css={style.calenderBox}>
            <div css={style.calender}>
              <DesktopDatePicker
                label="開始予定日"
                inputFormat="MM/dd/yyyy"
                value={newTask.startDate}
                onChange={(newValue: Date | null) => {
                  setNewTask({ ...newTask, startDate: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <Typography css={style.calenderText}>～</Typography>
            <div css={style.calender}>
              <DesktopDatePicker
                label="終了予定日"
                inputFormat="MM/dd/yyyy"
                value={newTask.endDate}
                onChange={(newValue: Date | null) => {
                  setNewTask({ ...newTask, endDate: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={newTask.startDate !== null ? newTask.startDate : today}
              />
            </div>
          </div>
          <Divider />
          <div css={style.buttonBox}>
            <Button
              variant="outlined"
              onClick={() => {
                if (newTask.title !== "") {
                  setInputError(false);
                  dispatch(addTask(newTask));
                  setNewTask(initialTask);
                  handleClose();
                } else {
                  setInputError(true);
                }
              }}
            >
              タスク新規追加
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddTask;
