import {model , Schema ,models } from 'mongoose'

const ProjectSchema = new Schema({

    title : {
        type: String,
        required : true
    },

    technologies : [
    ],

    frontend : [
        
    ],

    backend : [
        
    ],

    database : [
         
    ],

    infrastructure : [
        
    ],

    desc : {
        type : String
    }

},{collection : 'projects_collection'});

const Project = models.Project || model('Project', ProjectSchema);

export default Project ; 
