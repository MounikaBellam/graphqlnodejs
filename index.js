var express = require('express');
var {graphqlHTTP} = require('express-graphql');//when there are multiple exports then we need to import in braces the required one
var schema = require('./schema/schema');

var app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(3000, () => {
    console.log("App listening on port 3000");
    
})