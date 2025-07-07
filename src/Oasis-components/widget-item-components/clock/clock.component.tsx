import React from "react";
import ReactClock from "@uiw/react-clock";

type ClockProps = {
  width?: number;
  height?: number;
  value?: Date;
  run?: boolean;
} & React.SVGProps<SVGSVGElement>;
function ClockWidget() {
  const clockProps: ClockProps = {
    width: 100,
    height: 100,
    value: new Date(),
    run: true,
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <ReactClock {...clockProps} />
      </div>
    </>
  );
}

export default ClockWidget;
