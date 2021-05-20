# Simple Blog

### Todo
- Database conection with mongodb (their object style can be a benefit here because of the content simplicity)

- Database:
    - [x] Connection and configuration(mongodb)
      - What happened? 
        - The server doesn't connect with database, I'm not sure if this is because of values used for host and ports.
    - [x] Posts
    - [x] Tags
    - [ ] Users

- API:
    - [ ] Return information about each user
    - [x] JSW authentication basic
      - [ ] Complementations
    - [ ] Store only password hash when a user is create
    - [x] Needs to return all the users
    - [x] Needs to return all the posts
    - [x] Can be possible to create new posts
    - [x] Delete and update the posts
    - [ ] Do the samethings with tags
    - [ ] Understand how to make a panel only for my access without login or if I need to make new posts directly on backend, maybe use some markdown and commit them to github for use as base of posts
    - [ ] Try to deploy
      - [ ] Docker -> mongodb and node.js
      - [ ] Heroku
    - [ ] Possibilitie of insert images

- React:
    - [ ] Pagination
    - [ ] Maybe use proxy functions 
    - [ ] Immutabilitie 

- Docker containers
  - [ ] Mongodb 
  - [ ] Node.js with application
