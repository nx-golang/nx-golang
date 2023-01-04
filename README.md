# NxGolang

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a> A set of nx plugins for golang frameworks

# Plugins
## [@nx-golang/gin](./packages/gin/README.md)

nx-golang/gin is an opinionated  gin setup which uses [Uber fx](https://github.com/uber-go/fx) and [Swaggo](https://github.com/swaggo/swag)

- It makes golang/gin code possible in nx repo.
- It makes your controllers/middlewares/routes/servies/repositories code consistent.
- It uses dependency injection.
- It supports auto generated OpenAPI doc from source.
#### Generators 

- [x] Application

- [ ] Controller

- [ ] Service

- [ ] Repostiory

- [ ] Model

#### Executors

- [x] build

- [x] lint

- [x] test

- [x] serve* (minimum support)

- [ ] swagger-gen

- [ ] mockgen


## cobra(TBD)
## kubebuilder(TBD)
