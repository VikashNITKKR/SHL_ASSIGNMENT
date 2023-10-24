import AllProjects from "@/components/home/allProjects";
import projectController from "../../server/controllers/projectController";
import {connect} from 'mongoose'
import config from "../../config/env";


const Home=async()=> {

  await connect(config.mongo_uri, {useNewUrlParser : true, useUnifiedTopology : true});
  const allProjects = await projectController.getProjects();
  
  
  return (
    <main>
      
      <div>
        
        {allProjects && <AllProjects allProjects={JSON.stringify(allProjects)} />}
      </div>
    </main>
  )
}
export default Home ; 
