"use client";

import EndBtns from "./endBtns";
import StartBtns from "./startBtns";

function TimeActionsBtn({ work }) {
  return (
    <>
      {work.is_time_tracking ? (
        <EndBtns work={work} />
      ) : (
        <StartBtns work={work} />
      )}
    </>
  );
}

export default TimeActionsBtn;
