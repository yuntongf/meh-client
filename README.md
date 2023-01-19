# Meh

Since it is difficult to set up the local environment for this full-stack project (as it involves MongoDB setup), I deployed both the client and server on the cloud. Please go to www.mehssage.us to view the project.

## Tools and file structure
The frontend for this Twitter replica is built with React and Redux in TypeScript. The files are mostly organized based on their purpose. 

In particular, the Services folder mostly contains helper functions that are called by the frontend to access data from the server.

Pages are large components that are at the root level and the Components folder contains building blocks of those pages. 

I tried to use Redux to make the stage management more robust and clear to present. I prefer to seperate redux files with all other files in the folder, thus the store folder. It contains a folder with all the slices and reducers, a configuration file that defines object types and structures (this file is immensely useful when it comes to debugging, especially used with Typescript);

I didn't have enough time to extract the styles and put them in a more organized manner. Similarly, while I tried my best to modularize my code, some components can still be broken down to smaller pieces that will help reduce dependencies and increase robustness. In terms of commenting I typed down all the comments I have as I was coding. There can probably be more comments and they can be certainly be more precise.

## Client-side State Management

There are numerous states in the app that need to be managed: likes, saves, followers, comments, etc. For example, if a user likes a post, the client side must respond by lighting up the like button, and the server will update two things: the number of likes of the post, and the current user's liked posts. 

This turns out to be challenging especially if we are jumping pages and allowing for multiple places for user input on the same page. 

My solution is a combined use of Redux, state variables in the stateless functional components, as well as ascynchronous calls to the server. It is extremely important to keep a "single source of truth" for an app like this. This means that it is best not to have different versions of any entity in the app. For example, when a user clicks a like button, if we update the numberOfLikes to numberOfLikes + 1 with the local variables in its component, we lose the information as soon as we go to another page - the information does not persist. And to other components - siblings or parent - it is as if the user didn't do anything at all. 

To address issue, I tried to avoid pass down deep copies of objects in the component tree, as doing so might incur inconsistency between states. Instead, I pass around the reference of the obeject (in this case it is the _id (of type ObejctId) autogenerated by MongoDB which uniquely identifies an object). Whenever a component needs to access more than the reference of an object, it can tap into the Redux store and get the most up to date version of the data. This avoids manipulating large objects using props when you have a deep component tree, which can be a great source of misery.

There is always one place that needs to have the most accurate and up to date value for an entity. Some times this is the database since it is where we store the information persistently. However, it becomes a huge operational overhead to query the database about every thing. Hence, I tried to reduce the queries made to the database. In addition, by using the unique _id field and findById to query, we are guranteed some level of query performance since it is the a quick lookup using the reference. 

## Server-side Database Design

Having a nested and convoluted database representation may create operational overheads and cause a slowdown on the server side, and since there are many entities and actions involved in this app - User, Post, Comment, Follower, Chat, Message, etc. which might complicate data updates, I decided to have a "flat" structure for the database, and make use of the flexibility of MongoDB as a document database. I took advantage of the _id field that uniquely identify objects, and tried to almost "normalize" the database so that all other entries in a document are only dependent on the _id field. 

For example, in a User document, there is username, user handle, and status, which are all dependent on a userId. More importantly, I tried to use the _ids to reference objects. For example, an array of follower of the certain user is represented with a key-value pair, with key being the userId and value being an array of userIds that are reference the follower objects. Since we used a rather flat database structure, it becomes easy to "dereference" objects using their _id with findById.


## Potential Improvements

There are certainly more features that can be implemented. For example, I wanted to try integrate elastic search with MongoDB and integrate AWS S3 for user profile picture storages so they don't have to rely on autogenerated pictures. Stylewise I think my code could be cleaner and more modularized. In terms of user experience, I didn't have enough time to fine tune on the UI, and the chat feature should allow instantaneous message updates with socket.io.