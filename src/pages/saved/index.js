import { Pagination } from "@material-ui/core";
import { useDataContext } from "../../components/dataContext";
import { useLayoutEffect, useState } from "react";
import Wrapper from "../../components/sectionWrapper";
import { Link } from "react-router-dom";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "../../components/Loader";
export default function Saved() {
  const [Page, setPage] = useState(1);
  const { promiseInProgress } = usePromiseTracker();
  const [Data, setData] = useState({
    number: 0,
    items: [],
  });
  const limit = 4;

  const { Setter } = useDataContext();

  function handleChange(e, value) {
    setPage(parseInt(value, 10));
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function setSkip(page) {
    return (parseInt(page, 10) - 1) * limit;
  }
  async function getData() {
    await sleep(500);
    await Setter.posts(setSkip(Page), limit, false).then((data) =>
      setData(data)
    );
  }
  useLayoutEffect(() => {
    trackPromise(getData());
  }, [Page, Setter]);

  return (
    <Wrapper className="bg-qosgray min-h-screen py-28 bg-opacity-80">
      <div className="grid grid-cols-2 lg:grid-cols-4 justify-end pl-24 items-center lg:h-80 mt-20 gap-4 lg:max-w-screen-lg max-w-screen-sm mx-auto">
        {Data.items.map((data, index) => (
          <Link key={index} to={`/home/edit/${data._id}`}>
            <HistoryPost {...data} />
          </Link>
        ))}
        <Loader enable={promiseInProgress} />
      </div>
      <Pagination
        count={Math.floor(Data.number / 4)}
        onChange={handleChange}
        page={Page}
        showFirstButton
        showLastButton
        className="mx-auto block max-w-max mt-4"
      />
    </Wrapper>
  );
}

function HistoryPost({ title, poster, resume, index, _id: id }) {
  const { Setter } = useDataContext();
  return (
    <div className="bg-qosgray shadow-lg w-60 rounded-md p-4">
      <h4 className="text-mH3 opacity-70 text-center  overflow-hidden">
        {title}
      </h4>
      <div className="mb-4">
        <img
          src={poster}
          alt={index}
          className="max-w-full w-full h-40 mr-2 rounded-md mt-4"
        />
        <p className="my-4 text-msm">{resume}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            Setter.deletePost(id);
          }}
          className="bg-qosred bg-opacity-80 text-qosgray font-medium py-1 block  px-3 rounded-md"
        >
          Delete
        </button>
        <button className="bg-qosgreen bg-opacity-80 text-qosgray font-medium py-1 block  px-3 rounded-md">
          Publish
        </button>
      </div>
    </div>
  );
}
