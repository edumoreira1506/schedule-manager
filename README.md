## Schedule manager


## Dependencies

```
Docker >= 19.03
Docker-compose >= 1.26
```

## Setup

Clone the project.
```console
$ git clone git@github.com:edumoreira1506/schedule-manager.git
$ cd schedule-manager
```

Build docker image:
```console
$ docker build .
```

Exists 3 containers configurated: 
- API container
- Database container
- Client container

To up some specific container run:
```console
$ docker-compose up [container-name]
```

> Note: replace [container-name] per api | client

To up all necessary application run:
```console
$ docker-compose up client
```

This commando will up api, database and client containers, you can access now:
- http://localhost:3000 - Client application
- http://localhost:3500 - API
- http://localhost:3500/docs - API docs

Also, you can login on client application using:
```
admin@admin.com
Password102030
```

To run api tests run:
```console
$ cd api && yarn test
```

To run client tests run:
```console
$ cd client && yarn test
```

Also, you can see all the e2e tests running:
```console
$ cd e2e && yarn start
```
