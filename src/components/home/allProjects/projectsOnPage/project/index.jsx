"use client";
import ProjectDetails from "./projectDetails/projectDetails";
import "./project.css";
import { Montserrat, Signika } from "next/font/google";
import { Modal } from "antd";

const signika = Signika({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] }); 

const Project = ({ project, modelOpen, setModelOpen }) => {
  return (
    <div className="main_container" >
      <div
        onClick={(e) => {
          setModelOpen(project._id.toString());
          e.stopPropagation();
        }}
        className= "project_container"
        
      >
        <h3 className={signika.className}>{project?.title}</h3>
        <div className= "infoWrapper">
          <div className= "infoContainer">
            <p>Project Technologies</p>
            <div className="text-ellipsis values_container">
            <p className={montserrat.className}>
              
                {project?.technologies?.length
                  ? project?.technologies.join(",")
                  : "---"}
              
            </p>
            </div>
          </div>

          <div className="infoContainer">
            <p>Technical Skillset Frontend</p>
            <div className="text-ellipsis values_container">
            <p className={montserrat.className}>
              
                {project?.frontend?.length
                  ? project?.frontend.join(",")
                  : "---"}
              
            </p>
            </div>
          </div>

          <div className="infoContainer">

            <p>Technical Skillset Backend</p>
            <div className="text-ellipsis values_container">
            <p className={montserrat.className}>
              
                {project?.backend?.length ? project?.backend.join(",") : "---"}
             
            </p>
            </div>
          </div>

          <div className="infoContainer">
            <p>Technical Skillset Databases</p>
            <p className={montserrat.className}>
              {project?.database?.length ? project?.database.join(",") : "---"}
            </p>
          </div>

          <div className="infoContainer">
            <p className={montserrat.className}>
              Technical Skillset Infrastructure
            </p>
            <p>
              {project?.infrastructure?.length
                ? project?.infrastructure.join(",")
                : "---"}
            </p>
          </div>
        </div>
      </div>

      <div className="inner-container">

        <Modal
        
          open={modelOpen == project._id.toString()} 
          onOk={()=>setModelOpen('')} 
          onCancel={()=>setModelOpen('')} 
          okButtonProps={{style:{display:'none'}}} 
          cancelButtonProps={{style:{display:'none'}}}
            
          destroyOnClose={true}
          // width={window.innerWidth < 576 ? '100%' : '35%'}
        // Set the modal content based on screen size
        bodyStyle={{ maxHeight: window.innerHeight * 0.7, overflowY: 'auto', fontSize : "18px" }}
        // Adjust the mask style for responsiveness
        maskStyle={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ProjectDetails
            project={project}
            setModelOpen={setModelOpen}
            modelOpen={modelOpen}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Project;
