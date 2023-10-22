const config = {
    mongo : {
        
        uri : 'mongodb+srv://yadavvikash7171:test123@cluster0.zuedijb.mongodb.net/SHL_PROJECT_DATABASE?retryWrites=true&w=majority',
        options : {
            debug : false
        },
        dbName: 'SHL_PROJECT_DATABASE',
    },
    corsOptions : {
        origin : '*',
        credentials : true,
        optionSuccessStatus : 200,
    }
}
export default config