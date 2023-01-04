nx-golang/gin is an opinionated  gin setup which uses [Uber fx](https://github.com/uber-go/fx) and [Swaggo](https://github.com/swaggo/swag)

- It makes golang/gin code possible in nx repo.
- It makes your controllers/middlewares/routes/servies/repositories code consistent.
- It uses dependency injection.
- It supports auto generated OpenAPI doc from source.

## Setting Up @nx-golang/gin

To create a new workspace with @nx-golang/gin, run the following command:

```shell
npx create-nx-workspace my-workspace
```

Yarn users can use the following command instead:

```shell
yarn create nx-workspace my-workspace
```

To add the @nx-golang/gin plugin to an existing workspace, run one the following commands:

```shell
npm install -D @nx-golang/gin
```

```shell
yarn add -D @nx-golang/gin
```

### Create Applications

You can add a new @nx-golang/gin application with the following command:

```shell
nx g @nx-golang/gin:app gin-app
```

### Create Controllers/Middlewares/Services (TBD)
<!-- 
You can add a new @nx-golang/gin library with the following command:

```shell
nx g @nx-golang/gin:lib gin-lib
```

To make the library `buildable`, use the following command:

```shell
nx g @nx-golang/gin:lib gin-lib --buildable
```

To make the library `publishable`, use the following command:

```shell
nx g @nx-golang/gin:lib gin-lib --publishable --importPath=@my-workspace/gin-lib
```

> Read more about [building and publishing libraries here](/more-concepts/buildable-and-publishable-libraries). -->

## Using @nx-golang/gin

### Build

You can build an application with the following command:

```shell
nx build gin-app
```

### Serve (TBD)

You can serve an application with the following command:

```shell
nx serve gin-app
```
<!-- 

The `serve` command runs the `build` target, and executes the application.

By default, the serve command will run in `watch` mode. This allows code to be changed, and the @nx-golang/gin application to be rebuilt automatically. -->

#### Debugging (TBD)
<!-- 
@nx-golang/gin applications also have the `inspect` flag set, so you can attach your debugger to the running instance.

Debugging is set to use a random port that is available on the system. The port can be changed by setting the port option in the `serve` target in the `project.json`. Or by running the serve command with `--port <number>`.

For additional information on how to debug Node applications, see the [Node.js debugging getting started guide](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). -->

### Lint

You can lint an application with the following command:

```shell
nx lint gin-app
```

### Unit Test

You can run unit test for an application with the following command:

```shell
nx test gin-app
```

You can run unit test for a library with the following command:

```shell
nx test gin-lib
```

## More Documentation

TBD
