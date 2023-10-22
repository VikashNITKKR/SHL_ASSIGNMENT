"use client";
import Backdrop from "@/components/backdrop/backdrop";
import classes from "./projectDetails.module.css";
import { Montserrat, Signika } from "next/font/google";

const signika = Signika({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const ProjectDetails = ({ project, setModelOpen, modelOpen }) => {
  return (
    <>
    
        <div className={[classes.title, signika.className].join(" ")}>
          {project?.title}
        </div>

        <div className={classes.infoWrapper}>
          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ") }>
              Project Technologies
            </p>
            <p className={montserrat.className}>
              {project?.technologies?.length
                ? project?.technologies.join(",")
                : "---"}
            </p>
          </div>

          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ")}>
              Technical Skillset Frontend
            </p>
            <p className={montserrat.className}>
              {project?.frontend?.length ? project?.frontend.join(",") : "---"}
            </p>
          </div>

          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ")}>
              Technical Skillset Backend
            </p>
            <p className={montserrat.className}>
              {project?.backend?.length ? project?.backend.join(",") : "---"}
            </p>
          </div>

          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ")}>
              Technical Skillset Databases
            </p>
            <p className={montserrat.className}>
              {project?.database?.length ? project?.database.join(",") : "---"}
            </p>
          </div>

          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ")}>
              Technical Skillset Infrastructure
            </p>
            <p className={montserrat.className}>
              {project?.infrastructure?.length
                ? project?.infrastructure.join(",")
                : "---"}
            </p>
          </div>

          <div className={classes.infoContainer}>
            <p className={[classes.tech, signika.className].join(" ")}>
              Description
            </p>
            <p className={montserrat.className}>
              {project?.desc?.length ? project?.desc : "---"}
            </p>
          </div>
        </div>
      
    </>
  );
};
export default ProjectDetails;
