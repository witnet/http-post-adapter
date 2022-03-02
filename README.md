# http-post-adapter

HTTP service that makes an HTTP-POST request with the arguments given.

## Configurable environment variables

#### PORT

`Default: 3000`

Port where the server will be listening.
 
#### RATE_LIMIT_DURATION

`Default: 1`

Number of seconds before reset the number of requests.

#### REQUEST_PER_DURATION

`Default: 3`

Maximum number of request can be done over `RATE_LIMIT_DURATION`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/witnet/http-post-adapter/LICENSE)