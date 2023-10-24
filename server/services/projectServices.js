// const Project = require('../schema/project');
import Project from '../schema/project';
import {connect} from 'mongoose';
import config from '../../config/env';
const projectService = {};
projectService.getProjects = async() => {
    await connect(config.mongo_uri, {useNewUrlParser : true, useUnifiedTopology : true}).then(()=>console.log('DataBase connnected Listening .......')).catch(err => console.log(err))
    try{
        const projects = await Project.find();
        
        return projects;
    }catch(error){
        return error;
    }
} 

projectService.addProject = async(newProject) => {
    const existingProject = await Project.findOne({title : newProject.title});
    if(existingProject){
        return ({status : 'Failed' , error : "Project Already Exists"});
    }
    try{
        const result = Project.create(newProject);
        return ({status : 'Success'});
    }catch(error){
        return ({status : 'Failed', error : 'Failed to Create Project'});
    }
}

export default projectService ;