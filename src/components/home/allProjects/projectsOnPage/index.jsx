import Project from "./project/index";

const ProjectsOnPage = ({
  list,
  pageNo,
  setPageNo,
  infoModelOpen,
  setInfoModelOpen,
  topRef
}) => {
  
  const answerList = [];
  for (let i = pageNo * 10; i < list.length && i < (pageNo + 1) * 10; i++) {
    answerList.push(
      <div key={i} className="projectWrapper" >
        <Project
          key={i}
          project={list[i]}
          modelOpen={infoModelOpen}
          setModelOpen={setInfoModelOpen}
        />
      </div>
    );
  }

  return (
    <div  className="main">
      

      <div ref={topRef} className="answerListWrapper ">{answerList} </div>{" "}
      <div className="paginationWrapper">
        {pageNo > 0 ? (
          <button
            onClick={() => {
              setPageNo(pageNo - 1);
              topRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
            className="   nextEnabled"
            
          >
            Previous
          </button>
        ) : (
          <button
            disabled={true}
            className="nextDisabled"
          >
            Previous
          </button>
        )}
        <div className=" pageNo ">
          <p > {pageNo +1 } </p>
        </div>
        {(pageNo + 1) * 10  < list.length ? <button
          
          onClick={() => {
            
            setPageNo(pageNo + 1);
            topRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
          className="nextEnabled"
          
        >
          Next
        </button> : <button
            disabled={true}
            className="nextDisabled"
          > Next
            
          </button> }
      </div>
    </div>
  );
};
export default ProjectsOnPage;
