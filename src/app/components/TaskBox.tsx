/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState, VFC } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TextField,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { taskSlice, Task } from "../taskSlice";
import { SubTask } from "../taskSlice";

const style = {
  content: css({
    display: "flex",
    justifyContent: "center",
  }),
  subTaskBox: css({
    display: "flex",
    justifyContent: "left",
    margin: "0.5rem",
  }),
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
  finished: css({
    backgroundColor: "gray",
  }),
  item: css({
    margin: "0 auto",
  }),
  buttonBox: css({
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem auto",
  }),
};

function sleep(msec: number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(() => {});
    }, msec);
  });
}

const TaskBox: VFC<Task> = (props) => {
  // //DatePickerに関する記述（あとで直す）
  // const [value, setValue] = React.useState<Date | null>(new Date());
  // const handleChange = (newValue: Date | null) => {
  //   // setValue(newValue);
  //   setCurrentTask({ ...currentTask, startDate: newValue });
  // };

  //入力変更をstateに反映させるため
  const dispatch = useDispatch();
  const { updateTask } = taskSlice.actions;
  const [currentTask, setCurrentTask] = useState(props);
  let tempTitle: string = "";
  const [inputError, setInputError] = useState(false);

  //ここでサブタスクを表示するコンポーネントを作成する
  // {/* このコンポーネントにはprops.subTaskでサブタスクのオブジェクトが来ている
  //         ここにサブタスクのループを回す */}
  //サブタスク
  const subTaskList = currentTask.subTask.map((subTaskItem, targetIndex) => (
    <div css={style.subTaskBox}>
      <Checkbox
        checked={subTaskItem.finishedFlag}
        onChange={(e) => {
          let updateSubTask = {
            ...subTaskItem,
            finishedFlag: !subTaskItem.finishedFlag,
          };
          // 更新されたsubTask配列
          let updateSubTaskList = currentTask.subTask.map(
            (subTaskItem, index) =>
              index === targetIndex ? updateSubTask : subTaskItem
          );
          setCurrentTask({ ...currentTask, subTask: updateSubTaskList });
        }}
      />
      <TextField
        label=""
        defaultValue={subTaskItem.title}
        fullWidth
        onChange={(e) => {
          // ここでやりたいことは、subTask配列のうちの1つのsubTaskオブジェクトのタイトルの更新
          // そのためには、stateには更新されたsubTask配列を渡す必要がある。ただし当該subTask以外は更新する必要がない
          // どのsubtaskなのかを把握するために、更新する
          //
          // 更新された当該subTask
          let updateSubTask = { ...subTaskItem, title: e.target.value };
          // 更新されたsubTask配列
          let updateSubTaskList = currentTask.subTask.map(
            (subTaskItem, index) =>
              index === targetIndex ? updateSubTask : subTaskItem
          );
          setCurrentTask({ ...currentTask, subTask: updateSubTaskList });
        }}
      />
    </div>
  ));

  return (
    <Accordion css={style.item}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        css={currentTask.finishedFlag ? style.finished : {}}
      >
        <TextField
          label="タスクタイトル"
          defaultValue={currentTask.title}
          margin="normal"
          fullWidth
          css={style.content}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, title: e.target.value })
          }
        />
      </AccordionSummary>
      <AccordionDetails css={currentTask.finishedFlag ? style.finished : {}}>
        <TextField
          label="タスク概要"
          multiline
          rows={2}
          defaultValue={currentTask.abstract}
          margin="normal"
          css={style.content}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, abstract: e.target.value })
          }
        />
        <Divider />
        <div>
          {subTaskList}
          <div css={style.subTaskBox}>
            <Checkbox disabled />
            <TextField
              label="サブタスクを追加"
              margin="normal"
              fullWidth
              onChange={(e) => {
                tempTitle = e.target.value;
              }}
              error={inputError}
              helperText={inputError ? "追加するサブタスクが空です" : ""}
            />
            <Button
              onClick={() => {
                if (tempTitle !== "") {
                  setInputError(false);
                  // 追加された当該subTask
                  let updateSubTask: SubTask = {
                    title: tempTitle,
                    finishedFlag: false,
                  };
                  // 更新されたsubTask配列
                  let updateSubTaskList = [
                    ...currentTask.subTask,
                    updateSubTask,
                  ];
                  setCurrentTask({
                    ...currentTask,
                    subTask: updateSubTaskList,
                  });
                } else {
                  setInputError(true);
                }
              }}
            >
              追加
            </Button>
          </div>
        </div>

        <Divider />
        <div css={style.calenderBox}>
          <div css={style.calender}>
            <DesktopDatePicker
              label="開始予定日"
              inputFormat="MM/dd/yyyy"
              value={currentTask.startDate}
              onChange={(newValue: Date | null) =>
                setCurrentTask({ ...currentTask, startDate: newValue })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <Typography css={style.calenderText}>～</Typography>
          <div css={style.calender}>
            <DesktopDatePicker
              label="終了予定日"
              inputFormat="MM/dd/yyyy"
              value={currentTask.endDate}
              onChange={(newValue: Date | null) =>
                setCurrentTask({ ...currentTask, endDate: newValue })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <Divider />
        <div css={style.buttonBox}>
          <Button
            variant="outlined"
            onClick={() => {
              setCurrentTask({ ...currentTask, finishedFlag: true });
              // await sleep(5000);
              dispatch(updateTask(currentTask));
            }}
            css={style.buttonBox}
          >
            タスク完了
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(updateTask(currentTask));
            }}
            css={style.buttonBox}
          >
            内容の更新
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskBox;
