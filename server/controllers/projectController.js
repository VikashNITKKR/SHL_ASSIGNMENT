// const projectService = require('../services/projectService');

import projectService from '../services/projectServices'
const projectController = {};

projectController.getProjects = async(req,res) => {
    try{
        const projects = await projectService.getProjects();
        return projects.sort();
    }catch(error){
        return error;
    }
}

export default projectController;