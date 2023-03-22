import React from "react";
import Infobar from "../../Common_Components/Infobar";

const ComingSoon = () => {
  return (
    <div className="w-full h-[500px]">
      <div className="w-full">
        <Infobar start_text="Coming" end_text="Soon" />
        <div className="w-full text-center">
          <p className="my-8 font-light text-2xl">
            Stay tuned for more updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
