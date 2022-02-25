/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { VFC } from "react";
import { Typography, Tab, Tabs, Box } from "@mui/material";
import { css } from "@emotion/react";

const section = css({
  textAlign: "center",
  width: "33%",
});

const center = css({
  color: "green",
});

//storeから日付のstateを取得し、コンポーネントに渡す
interface Props {
  date?: Date;
  decrement?: () => void;
  increment?: () => void;
}

const DateList: VFC<Props> = ({
  date = new Date(),
  decrement = () => undefined,
  increment = () => undefined,
}) => {
  //天気データを取得
  const getWeatherInfo = async () => {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&exclude=current,minutely,hourly,alerts&lang=ja&appid=55770612dfcbe4ca9ec8fd2c78b47de2"
    );
    const { results } = await res.json();
    console.log(results.lat);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs sx={{ width: "100%" }}>
        <Tab
          onClick={decrement}
          css={section}
          label={date.getMonth() + 1 + "/" + (date.getDate() - 1)}
        />

        <Tab
          css={[section, center]}
          label={date.getMonth() + 1 + "/" + date.getDate()}
        />

        <Tab
          onClick={increment}
          css={section}
          label={date.getMonth() + 1 + "/" + (date.getDate() + 1)}
        />
      </Tabs>
    </Box>
  );
};

export default DateList;
