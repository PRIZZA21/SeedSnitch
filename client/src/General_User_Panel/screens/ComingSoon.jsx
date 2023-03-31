import React from "react";
import Infobar from "../../Common_Components/Infobar";
import soon from "../../assets/soon.png";
const ComingSoon = () => {
  return (
    <div className="w-full ">
      <div className="w-full ">
        {/* <Infobar start_text="Coming" end_text="Soon" invert_text_color={true} /> */}
        <div className="w-full  md:pt-8 pt-12 flex justify-center">
          <img src={soon} alt="" />
          {/* <h1 className="text-center font-normal text-3xl">
            Stay tuned for more updates.
          </h1> */}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
