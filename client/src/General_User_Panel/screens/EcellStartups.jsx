import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";
import Loader from "../../Common_Components/Loader";

const EcellStartups = () => {

  const {id} = useParams()
  const [ecell, setEcell] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/ecells/details/${id}`).then((res) => {setEcell(res.data);});
    setLoading(false);
  }, []);

  let navigate = useNavigate()

  const ecell_click_handler = (id) => {
    navigate(`/community/ecell/${id}`)
  }

  if (loading) return <Loader />;

  return (
    <div>
      {ecell &&
      <Infobar
        start_text={"Startups with"}
        end_text={ecell.name}
        invert_text_color={true}
      />
      }
      <section>
        <div className="py-4 min-h-[60vh] text-center mx-auto flex flex-col items-center justify-start">
          <div className="startup-container w-full p-4 flex flex-row justify-center items-center mx-4 md:flex-row md:flex-wrap">
           { ecell && ecell.startups && ecell.startups.map((x) => (
                <div className="startup-card my-6 mx-6 px-8 py-4 w-1/4 ">
                  <div>
                    <div className="flex row-flex justify-between">
                      <div className="startup-card-title pb-2">
                        {" "}
                        {x.name}
                      </div>
                      <img src={`/${x.logo}`} className="rounded-full w-10 h-10" />
                    </div>
                    <div className="startup-card-description text-justify">
                      {x.description}
                    </div>
                  </div>
                </div>
            ))
           }
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcellStartups;
