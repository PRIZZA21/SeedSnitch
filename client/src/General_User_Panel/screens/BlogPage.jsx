import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item key={x + 1}>
            <Link key={x + 1} to={`/blogs/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const BlogPage = () => {
  const [blogList, setBlogList] = useState([]);
  const { pageNumber } = useParams() || 1;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();
  const blog_detailsHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    axios
      .get(`/api/blogs?pageNumber=${pageNumber}`)
      .then((res) => {
        setBlogList(res.data.all_blogs);
        setPage(res.data.page);
        setPages(res.data.pages);
      });
  }, [pageNumber]);

  return (
    <div className="bg-white relative">
      <Infobar start_text={"Blogs"} end_text={''}/>

      <div className="py-10 flex flex-col md:flex-row md:justify-center md:flex-wrap gap-2 mx-3 md:mx-auto">
        {blogList &&
          blogList.map((blog) => (
            <div key={blog._id} className="flex flex-col items-center justify-around gap-y-8 w-full md:w-1/4 mx-2 pb-8 border-[1px] hover:shadow-2xl ease-in duration-200 mb-5 rounded-2xl">
              <div
                className="w-full h-52 cursor-pointer rounded-t-2xl"
                onClick={() => blog_detailsHandler(blog._id)}
              >
                <img
                  src={`/${blog.banner}`}
                  className="object-cover w-full h-full rounded-t-2xl"
                  alt=""
                />
              </div>

              <div className="flex flex-col items-center md:items-center">
                <span
                  className="font-[500] text-center text-xl text-gray-700 mx-2 cursor-pointer"
                  onClick={() => blog_detailsHandler(blog._id)}
                >
                  {blog.title}
                </span>
                {/* <span className="font-semibold text-gray-600">
                  {blog.author && blog.author.name}
                </span> */}
              </div>
            </div>
          ))}
      </div>
      <div className="my-8">
        <Paginate pages={pages} page={page} />
      </div>
    </div>
  );
};

export default BlogPage;
