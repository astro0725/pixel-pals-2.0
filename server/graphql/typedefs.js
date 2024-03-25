const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
  game(id: ID!): Game
  games: [Game!]!

  user(id: ID!): User
  users: [User!]!
  users(filter: UserFilter): [User!]!

  connectionsByUserId(userId: ID!): Connections

  getSocialsByUserId(userId: ID!): Socials

  showcaseByUserId(userId: ID!): Showcase

  post(id: ID!): Post
  posts: [Post!]!
  posts(page: Int, limit: Int, tag: String, keyword: String): [Post!]!

  guide(id: ID!): Guide
  guides: [Guide!]!
  guides(page: Int, limit: Int, tag: String, keyword: String): [Guide!]!

  reactions(contentId: ID!, contentType: ContentType!): [Reaction!]!

  comment(id: ID!): Comment
  comments: [Comment!]!
}

type Mutation {
  addGame(title: String!, splashArt: String!): Game
  updateGame(id: ID!, title: String, splashArt: String): Game
  deleteGame(id: ID!): Game

  createUser(username: String!, password: String!, email: String!): User
  updateProfileImage(userId: ID!, newImage: Upload!): User
  followUser(userId: ID!, followUserId: ID!): User
  unfollowUser(userId: ID!, unfollowUserId: ID!): User
  deleteUser(id: ID!): User

  updateConnections(userId: ID!, steamId: String, playstationId: String, riotId: String, xboxId: String, battlenetId: String, epicGamesId: String): Connections

  updateSocials(userId: ID!, twitch: String, tiktok: String, facebook: String, instagram: String, twitter: String): Socials

  updateShowcase(userId: ID!, games: [ID!], socials: [ID!], connections: [ID!], isVisible: Boolean): Showcase

  createNotification(type: NotificationType!, message: String!, userId: ID!, relatedContentId: ID, onModel: String): Notification

  createPost(content: String!, image: Upload,, authorId: ID!, tags: [String]): Post
  likePost(postId: ID!, userId: ID!): Post
  deletePost(postId: ID!): Post

  createGuide(content: String!, images: Upload, authorId: ID!, tags: [String]): Guide
  likeGuide(guideId: ID!, userId: ID!): Guide
  dislikeGuide(guideId: ID!, userId: ID!): Guide
  deleteGuide(guideId: ID!): Guide

  createReply(content: String!, authorId: ID!): Reply
  deleteReply(replyId: ID!): Reply

  createComment(content: String!, authorId: ID!): Comment
  deleteComment(commentId: ID!): Comment

  addReaction(contentId: ID!, contentType: ContentType!, userId: ID!, emoji: String!): Reaction
  removeReaction(contentId: ID!, contentType: ContentType!, userId: ID!, emoji: String!): Reaction
}

type Subscription {
  notificationReceived: Notification!
}

input UserFilter {
  username: String
  profileImage: String
  name: String
}

enum ContentType {
  comment
  reply
  post
  guide
}

enum NotificationType {
  new_follower
  new_message
  content_like
  comment_on_post
}

type Game {
  id: ID!
  title: String!
  splashArt: String!
  createdAt: String!
  updatedAt: String!
}

type User {
  id: ID!
  username: String!
  password: String!
  email: String!
  profileImage: String
  name: String
  bio: String
  posts: [Post!]!
  guides: [Guide!]!
  chatrooms: [Chatroom!]!
  profileHeader: String
  showcases: [Showcase!]!
  following: [User!]!
  followers: [User!]!
  blockedUsers: [User!]!
  friends: [User!]!
  postCount: Int!
  guideCount: Int!
  blockedCount: Int!
  followingCount: Int!
  followerCount: Int!
  friendCount: Int!
}

type Connections {
  id: ID!
  steamId: String
  playstationId: String
  riotId: String
  xboxId: String
  battlenetId: String
  epicGamesId: String
  createdAt: String!
  updatedAt: String!
}

type Socials {
  id: ID!
  twitch: String
  tiktok: String
  facebook: String
  instagram: String
  twitter: String
  createdAt: String
  updatedAt: String
}

type Showcase {
  id: ID!
  userId: User!
  games: [Game!]!
  socials: [Socials!]!
  connections: [Connection!]!
  isVisible: Boolean!
  createdAt: String!
  updatedAt: String!
  gameCount: Int!
  socialCount: Int!
  connectionsCount: Int!
}

type Notification {
  id: ID!
  type: NotificationType!
  message: String!
  user: User!
  relatedContentId: ID
  createdAt: String!
}

type Post {
  id: ID!
  content: String!
  image: [Image!]
  author: User!
  likes: [User!]!
  reply: [Reply!]!
  reactions: [Reaction!]!
  tags: [String!]!
  createdAt: String!
  updatedAt: String!
  replyCount: Int!
}

type Guide {
  id: ID!
  content: String!
  images: [Image!]
  author: User!
  likes: [User!]!
  dislikes: [User!]!
  comments: [Comment!]!
  reactions: [Reaction!]!
  tags: [String!]!
  createdAt: String!
  updatedAt: String!
  commentCount: Int!
}

type Image {
  url: String!
}

type Reply {
  id: ID!
  content: String!
  author: User!
  createdAt: String!
  updatedAt: String!
}

type Comment {
  id: ID!
  content: String!
  author: User!
  createdAt: String!
  updatedAt: String!
}

type Reaction {
  id: ID!
  contentId: ID!
  contentType: ContentType!
  user: User!
  emoji: String!
  createdAt: String!
  updatedAt: String!
}
`;

module.exports = typeDefs;