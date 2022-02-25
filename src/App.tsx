/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import DateBoard from "./app/containers/DateBoard";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TaskList from "./app/containers/TaskList";
import AddTask from "./app/containers/AddTask";
import { Box } from "@mui/material";
import { css } from "@emotion/react";

const style = {
  whole: css({
    width: "60%",
    minWidth: "350px",
    margin: "0 auto",
  }),
};

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box css={style.whole}>
          <DateBoard />
          <TaskList />
          <AddTask />
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default App;
