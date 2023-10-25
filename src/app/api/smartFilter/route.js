import projectController from "../../../../server/controllers/projectController";
import {connect} from 'mongoose'
import config from '../../../../config/env';
import { NextResponse } from "next/server";
import Project from "../../../../server/schema/project";
import runPrompt from "../../../../server/services/openaiServices";


export async function POST(req){
    
    await connect(config.mongo_uri, {useNewUrlParser : true, useUnifiedTopology : true})
    
    const body = await req.json();
    const response = await runPrompt(body);
    const frontend = response.Frontend;
    const backend = response.Backend;
    const database = response.Database;
    const infrastructure = response.Infrastructure;


    

    const query = {};
    if(frontend.length > 0){
      query.frontend = {$all : frontend}; 
      for(var ind in query['frontend']['$all']){
        query['frontend']['$all'][ind] = query['frontend']['$all'][ind].toLowerCase();
      }
      
    }
    if(backend.length > 0) {
      query.backend = {$all : backend};
      for(var ind in query['backend']['$all']){
        query['backend']['$all'][ind] = query['backend']['$all'][ind].toLowerCase();
      }
    }
    if(database.length > 0) {
      query.database = {$all : database};
      for(var ind in query['database']['$all']){
        query['database']['$all'][ind] = query['database']['$all'][ind].toLowerCase();
      }
    }
    if(infrastructure.length > 0) {
      query.infrastructure = {$all : infrastructure};
      for(var ind in query['infrastructure']['$all']){
        query['infrastructure']['$all'][ind] = query['infrastructure']['$all'][ind].toLowerCase();
      }
    }
    
    const projects = await Project.find(query);
    return NextResponse.json(projects.sort());
    
}
