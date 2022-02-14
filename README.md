# Lisbon Metro API
> This app aims to create a middleware between oficial API and your frontend client.

<!-- [![Build Status][travis-image]][gh-actions-url] -->

[Metro API v1.0.1](https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1) isn't very consistent naming wise and such, so this middleware aims to smooth it a bit.

## Installation

```sh
git clone git@github.com:diconium/lisbon-metro-app-middleware.git
cd lisbon-metro-app-middleware
npm install
```

## Configuration

To make this work you'll need an API key set in your `.env` file.

```sh
cp .env.example .env
```

and set `METRO_API_KEY` with the token you get from the [API Store](https://api.metrolisboa.pt/store/);

## Fire it up!

To start this app for development purposes:

```sh
node ace serve --watch
```

If you're willing to deploy it (production) you should build it:

```sh
node ace build
```

and then deploy your newly created artifacts. Or maybe use your CI/CD to do that for you!

## Endpoints

│ Method │ Route │ Handler
|---|---|---|
│ HEAD, GET │ /lines │ LinesController.index
│ HEAD, GET │ /lines/:line │ LinesController.show
│ HEAD, GET │ /lines/:line/waitingTimes │ LinesController.waitingTimes
│ HEAD, GET │ /lines/:line/frequency/:day/:hour? │ LinesController.frequency
|---|---|---|
│ HEAD, GET │ /stations │ StationsController.index
│ HEAD, GET │ /stations/:station │ StationsController.show
│ HEAD, GET │ /stations/:station/waitingTimes │ StationsController.waitingTimes
|---|---|---|
│ HEAD, GET │ /healthcheck │ Closure

## Contributing

1. Fork it (<https://github.com/diconium/lisbon-metro-app-middleware.git>)
2. Create your feature branch (`git checkout -b feature/LISMETROMW-<XXXX>-<desc>`)
    - where `<XXXX>` is the ticket number in case you're working on a existing ticket;
    - where `<desc>` being a small description;
3. Commit your changes (`git commit -am 'feat: added some fooBar'`)
    - try to use [Semantic Commit Messages][semantic-commit-messages] whenever possible;
4. Push to the branch (`git push origin feature/LISMETROMW-<XXXX>-<desc>`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
<!-- [gh-actions-url]: https://travis-ci.org/dbader/node-datadog-metrics -->
[semantic-commit-messages]: https://sparkbox.com/foundry/semantic_commit_messages
