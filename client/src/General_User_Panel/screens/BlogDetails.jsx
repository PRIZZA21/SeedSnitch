import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Common_Components/Loader";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
    setLoading(false);
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="p-8 md:px-20 mt-16 md:py-20 ">
        <div className="flex flex-col items-center gap-20 md:gap-8 justify-center mb-5 h-auto ">
          <div className="flex flex-col w-full md:w-1/2 justify-center items-center  gap-y-6">
            <img
              src={`/${blog.banner}`}
              className="h-[400px] w-full  object-fill rounded-sm "
              alt=""
            />
            <div className="text-justify w-full">
              <h1 className="text-5xl text-left font-medium mb-2 text-[#242424]">
                {blog.title}
              </h1>
              <p className="text-[20px] font-semibold mt-6 mb-4 border-2 w-fit px-6 py-2 rounded-full">
                <span className="text-gray-600 font-normal">
                  {blog.author && blog.author.name}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="md:w-1/2 md:mx-auto"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
