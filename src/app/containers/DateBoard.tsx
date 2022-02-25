/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateSlice, DateState } from "../dateSlice";
import DateList from "./DateList";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { RootState } from "../../index";

const section = css({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "0 auto",
});

const DateBoard: VFC = () => {
  const date = useSelector((state: RootState) => state.date.date);
  const dispatch = useDispatch();
  const { decremented, incremented } = dateSlice.actions;
  return (
    <Box css={section}>
      <DateList
        date={date}
        decrement={() => dispatch(decremented())}
        increment={() => dispatch(incremented())}
      />
    </Box>
  );
};

export default DateBoard;
