"use client";
import ProjectsOnPage from "./projectsOnPage";
import { useEffect, useRef, useState } from "react";
import NavBar from "./navBar";
import "./allProjects.css";

import NoElementsFound from "./noElementsFound";

const AllProjects = ({ allProjects }) => {
  const [tempProjectsList, setTempProjectList] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [infoModelOpen, setInfoModelOpen] = useState();
  const [pageNo, setPageNo] = useState(0);
  const [search, setSearch] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const topRef = useRef(null);
  
  const convertIntoJson = async () => {
    const res = await JSON.parse(allProjects);
    setTempProjectList(res);
  };
  useEffect(() => {
    convertIntoJson();
  }, []);

  // FilterProjects Api Call
  const filterProjects = async () => {
    
    if (search.length) {
      let res = null;
      if(selected == 1){
        const projects = await fetch(
          `${window.location.origin}/api/filterProjects`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(search),
          }
          
        );
        res = await projects.json();
      }else{
        const projects = await fetch(
          `${window.location.origin}/api/smartFilter`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(search),
          }
        );
        res = await projects.json();
      }
      if(res)
      setFilteredProjects([...res]);
      setSearchOpen(true);
    }
  };

  return (
    <div
    ref ={topRef}
      
      className="index_container"
    >
    

      <NavBar
        setSearch={setSearch}
        filterProjects={filterProjects}
        search={search}
        setSelected={setSelected}
        setSearchOpen={setSearchOpen}
        setPageNo ={setPageNo} 
        searchOpen={searchOpen}
      
      />

      {/* If not any searchInput AllProjects will be Shown else Filtered Projects */}
      <div>
        {/* projects-grid  */}
        {searchOpen == false && tempProjectsList ? (
          <ProjectsOnPage
            topRef ={topRef}
            list={tempProjectsList}
            pageNo={pageNo}
            setPageNo={setPageNo}
            infoModelOpen={infoModelOpen}
            setInfoModelOpen={setInfoModelOpen}
          />
        ) : (
          <div>
          { filteredProjects?.length ? <ProjectsOnPage
          topRef ={topRef}
            list={filteredProjects}
            pageNo={pageNo}
            setPageNo={setPageNo}
            infoModelOpen={infoModelOpen}
            setInfoModelOpen={setInfoModelOpen}
          />  : <div> <NoElementsFound /> </div> }
          </div>
        )}
        
      </div>
    </div>
  );
};
export default AllProjects;
