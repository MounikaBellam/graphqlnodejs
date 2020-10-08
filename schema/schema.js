var graphql = require('graphql');
var _ = require('lodash');

var {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    } = graphql;

//data source
var friends = [
    {id:'1', name:'aaa', score:10},
    {id:'2', name:'bbb', score:9},
    {id:'3', name:'ccc', score:7},
    {id:'4', name:'ddd', score:8},
    {id:'5', name:'eee', score:8},
    {id:'6', name:'fff', score:9},
    {id:'7', name:'ggg', score:10},
    {id:'8', name:'hhh', score:6}
]

var locations = [
    { id:'1', location:'chennai', friendid:'1' },
    { id:'2', location:'bengaluru', friendid:'2' },
    { id:'3', location:'tokyo', friendid:'3' },
    { id:'4', location:'jodhpur', friendid:'4' },
    { id:'5', location:'chennai', friendid:'5' },
    { id:'6', location:'chennai', friendid:'6' },
    { id:'7', location:'tokyo', friendid:'7' },
    { id:'8', location:'tokyo', friendid:'8' }
]

var FriendType = new GraphQLObjectType({
    name:'Friend',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        score: {type: GraphQLInt},
        location: {
            type: LocationType,
            resolve(parent, args){
                return _.find(locations, {friendid: parent.id})
            }

        }
    })
})

var LocationType = new GraphQLObjectType({
    name:'Location',
    fields: () => ({
        id: {type: GraphQLID},
        location: {type: GraphQLString},
        friendid: {type: GraphQLID},
        friends: {
            type: FriendType,

        }
    })
})

var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        friends: {
            type: FriendType,
            args:{id : {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from data source
                console.log(typeof(args.id));
                return _.find(friends, {id: args.id});                
            }
        },
        locations: {
            type: LocationType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(typeof(args.id));
                return _.find(locations, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})