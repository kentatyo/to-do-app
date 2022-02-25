//このコンポーネントは使っていない

import { FC } from "react";

//propsで受け取った日付を表示するコンポーネント
type Props = {
  month: number;
  day: number;
};

const DateBox: FC<Props> = (props) => {
  const { month, day } = props;
  //   const day = date.getDate;
  return (
    <>
      <h1>
        {month}/{day}
      </h1>
    </>
  );
};

export default DateBox;
