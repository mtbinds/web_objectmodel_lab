const {GraphQLInt} = require("graphql");
const {GraphQLDate} = require("graphql-iso-date/dist");
const {GraphQLFloat} = require("graphql");
const {GraphQLDateTime} = require("graphql-iso-date/dist");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql")

const { User, Annonce, Comment, Message, Reply, Review } = require("../models")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    avatarId: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    resetPasswordToken: { type: GraphQLString },
    resetPasswordExpires: { type: GraphQLDateTime }

  }),
})

const AnnonceType = new GraphQLObjectType({
  name: "Annonce",
  description: "Annonce type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    status: { type: GraphQLString },
    publication: { type: GraphQLString },
    image: { type: GraphQLString },
    imageId: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    //availability: { type: GraphQLDate },
    createdAt: { type: GraphQLDateTime },
    author: {
      type: UserType,
      resolve(parent, args) {

        return User.findById(parent.id)

        return Annonce.findById(parent.authorId)

      },
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ id: parent.id })
      },
    },
    messages: {
      type: GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find({ id: parent.id })
      },
    },
    likes: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ id: parent.id })
      },
    },
    reviews: {
      type: GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ id: parent.id })
      },
    },
    rating: { type: GraphQLInt }

  }),
})

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment type",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id)
      },
    }
  }),
})

const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message type",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id)
      },
    },
    replies: {
      type: GraphQLList(ReplyType),
      resolve(parent, args) {
        return Reply.find({ id: parent.id })
      },
    }
  }),
})

const ReplyType = new GraphQLObjectType({
  name: "Reply",
  description: "Reply type",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    author: {
      type: UserType,
      resolve(parent, args) {

        return User.findById(parent.id)

        return Reply.findById(parent.userId)

      },
    }
  }),
})

const ReviewType = new GraphQLObjectType({
  name: "Review",
  description: "Review type",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    rating: { type: GraphQLInt },
    createdAt: { type: GraphQLDateTime },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id)
      },
    }
  }),
})



module.exports = { UserType, AnnonceType, CommentType, MessageType, ReplyType, ReviewType }


//module.exports = UserType
