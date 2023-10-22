import projectController from "../../../../server/controllers/projectController";
import {connect} from 'mongoose'
import config from '../../../../config/env';
import { NextResponse } from "next/server";
import Project from "../../../../server/schema/project";
import { data } from "autoprefixer";

export async function POST(req){
    
    await connect(config.mongo.uri, {useNewUrlParser : true, useUnifiedTopology : true})
    
    const body = await req.json();
    
    const frontendRegex = /react|html|css|angular|node|javascript|no experience|react native|react js|html|angular|react|next js|next.js|next js|google auth|react js beginner level|javascript|reactjs|react native|bootstrap|material ui|react js|not specified|not mentioned|ejs|learning react.js|bootstrap|jquery|react.js|not mentioned|cjs|redux|typescript|no information provided|reactjs|interest in learning|angular js|not specified|basic knowledge|undetermined|python node js|java springboard|context api|react redux|js|html5|css3|ionic|theoretical knowledge|css|ajax|reactjs/i;
    const backendRegex = /java|python django|flask|node|python django|api|python|django|node js|django rest|spring boot|hibernate|mongo db|spring boot|java|java spring|spring|sql|mysql|oracle|nosql|node.js|node.js|spring framework|java spring framework|django|express|python|sql|express|javascript|typescript|not experienced|but a quick learner|express js|back-end frameworks and apis|prayat|none mentioned|azure apis and sas fulfillment apis|javascript api|asp.net|php|express.js|python flask|php codeigniter|django rest framework|spring and spring boot framework|rest apis|micro services architecture|scala|akka|play framework|not specified|javascript|basic knowledge|nodejs|expressjs|python django and spring frameworks|node js|fast api|fast apis|no prior experience with backend frameworks|unknown|express js|c&c|no experience|willing to learn|java springboard|java|node jsc|flask|not mentioned|spring mvc|node javascript|theoretical knowledge|firebase|.net|sql|asp.net mvc|java spring boot|ninjas/i;
    const databaseRegex = /mysql|mongodb|postgres|sql|not mentioned|mongodb|mongo db|mysql|oracle|nosql|aurora db|not mentioned|not specified|sql|postgre sql|postgresql|tnt|postman|firebase|sequel lite|aws dynamodb|sql and nosql|unknown|sqlite|prisma|no information provided|not specified|hadoop ecosystem|postgres|not discussed|unspecified|undetermined|postgresql|not provided|mssql|good understanding of data structures and algorithms|mongoose|dbms|oracle|sql & nosql|firebase|sql server/i;
    const infrastructureRegex = /docker|aws/i;
    const frontend = [];
    const backend = [];
    const database = [];
    const infrastructure = [];

    let query = {};
    let countOfTitleOccurance =0 ;
    for(var obj in body){
        let result = body[obj].match(frontendRegex);
        if(result){
            frontend.push(body[obj].toLowerCase().trim());
            continue ;
        }
        result = body[obj].match(backendRegex);
        if(result){
            backend.push(body[obj].toLowerCase().trim());
            continue;
        }
        result = body[obj].match(databaseRegex);
        if(result){
            database.push(body[obj].toLowerCase().trim());
            continue ;
        }
        result = body[obj].match(infrastructureRegex);
        if(result){
            infrastructure.push(body[obj].toLowerCase().trim());
            continue ;
        }


        countOfTitleOccurance++;
        
        if (countOfTitleOccurance==1)
        {
        query.title = { $regex: body[obj].trim() , $options : "i"    };

        }
    }
    
    if (countOfTitleOccurance>1){
        return NextResponse.json([])
    }
    

    if(frontend.length > 0) query.frontend = {$all : frontend};
    if(backend.length > 0) query.backend = {$all : backend};
    if(database.length > 0) query.database = {$all : database};
    if(infrastructure.length > 0) query.infrastructure = {$all : infrastructure};

    const response = await Project.find(query);
    return NextResponse.json(response.sort());
    
}
