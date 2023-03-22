import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Common_Components/Loader";

const Community = () => {
  const [ecellsList, setEcellsList] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/ecells/all")
      .then((res) => setEcellsList(res.data));
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <section>
        <div className="py-4 min-h-[370px] text-center mx-auto flex flex-col items-center justify-start">
          <section className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200">
            <div className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12">
              <div className="w-full md:w-[900px] text-center my-4 p-4 md:p-2">
                <h2 className="md:font-extrabold font-bold text-3xl md:text-5xl pb-2 text-black">
                  Our Network of{" "}
                  <span className="text-accent"> Entrepreneurial Cells</span>
                </h2>
              </div>
            </div>
          </section>

          <div className="w-full p-4 flex flex-col  justify-center items-center my-4 md:flex-row md:flex-wrap">
            {ecellsList &&
              ecellsList.map((ecell) => (
                <div key={ecell._id} className="w-full h-100 bg-white rounded-lg border-2 md:shadow-md m-4 md:mx-6 md:my-10 md:w-1/5">
                  <img
                    src={`/${ecell.logo}`}
                    alt=""
                    className="w-full h-52 my-8 md:h-40 object-contain rounded-t-lg"
                  />
                  <div className="px-6 py-2">
                    <h2 className="font-bold mb-2 text-2xl text-gray-800 my-4">
                      {ecell.name}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
