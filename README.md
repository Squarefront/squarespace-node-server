# Squarespace Node Server
> A local Squarespace development server in [node.js](http://nodejs.org/).

> Mostly just a copy and reorganization of [Brandon Kitajchuk's node-squarespace-server project](https://github.com/NodeSquarespace/node-squarespace-server) so we can add a few other ideas without bothering his project. Full credit goes to him.


### About
This project enables developers to build [Squarespace developer templates](http://developers.squarespace.com) locally by running a node.js proxy server to interface with a Squarespace site. It watches your template and recompiles when changes are made.


### Installation
```shell
npm i -g squarespace-node-server
```

#### Updating
```shell
npm update -g squarespace-node-server
```


### Usage
Navigate to your Squarespace developer template folder, find your `template.conf` file and add the following lines to your template.conf. These entries have zero effect on your live website and merely serves as a configuration reference.

#### Site URL
The `siteurl` below is the reference website you're interfacing with in order to authenticate, download and cache content locally.

```json
"server": {
    "siteurl": "https://yoursite.squarespace.com"
}
```

If you are using a site-wide password, then you would have the following:

```json
"server": {
    "siteurl": "https://yoursite.squarespace.com",
    "password": "yoursitewidepassword"
}
```

If you are running a site in sandbox trial mode, then you would have the following:

```json
"server": {
    "siteurl": "https://yoursite.squarespace.com",
    "sandbox": true
}
```

And you will want to add this to your `.gitignore`:

```shell
# Ignore server cache
.sqs-cache
```

#### API

```shell
# View api
sqs

# Print package version
sqs --version

# Run the server
sqs server

# Run the server with forever
sqs server --forever

# Stop server started with forever
sqs server --fornever

# Run the server on a specific port
sqs server --port=8000

# Silence the server logging
sqs server --quiet

# Open new tab in browser
sqs server --open

# Change Squarespace authenticatedAccount state
sqs server --auth

# Bust local cache
sqs buster
```

This runs the [express](http://expressjs.com) server on the relevant port. The default is `localhost:5050`.



### Troubleshooting
These are the most common causes for issues running the server and how to resolve them.

- Unsupported JSON-T syntax that Squarespace's template compiler supports, but this project doesn't. Contribute!
- Make sure you use the `https` protocol for your siteurl.
- Make sure you use the `"sandbox": true` setting in your template.conf if using an account in trial mode.
- When in doubt, bust your local cache with `sqs buster` and try again.
- If all else fails, [open an issue](issues/new).



### Workflow
You can use any front-end workflow you like when working with a custom Squarespace template. At the very least the separation of your source files and your actual template is recommended.



### Login
You will first be prompted with a login page. Enter your email and password for __YOUR__ Squarespace account ( used for logging into `/config` ) that is associated with __THIS__ Squarespace site. This information is stored in OS X keychain.



### Performance and Caching
When you make initial requests to the pages of your site, they will likely be slow. For every page the module needs to request both full `html` (for headers and footers parsing) and `json` (for rendering). That's 2 requests. For every `squarespace:query` and `squarespace:block-field` tag the module must make another request. Well, that's a lot of requests for sure. Luckily, the module caches everything via a `.sqs-cache` directory in your template root. This is good to speed things up. But, sometimes you want to pull down the latest and greatest content from your site. You can do this by hitting any page with a `?nocache` query string. To blow away your entire cache you can either delete it manually or use the `sqs buster` command.



### Squarespace authenticatedAccount JSON
When logged in to a Squarespace website, Squarespace adds an `authenticatedAccount` JSON object. This object is useful for creating conditional template code that renders only when logged in to Squarespace's backend config. This is common for automatically swapping out minified JavaScript links, Squarespace script combo-ing, or anything you want hidden to the public but displayed in the backend. Using the node-squarespace-server `--auth` arugment will allow you to move between `authenticatedAccount` states.



### Server-specific Template Code
The node-squarespace-server adds a new JSON key to the root Squarespace template JSON that allows you to write JSON-T template code that will only execute in your node server environment. To use it, simply use a Squarespace `.if` statement as specified in the [official documentation](https://developers.squarespace.com/templating-basics/). Because this JSON key is unsupported by Squarespace's own JSON-T dictionary, your code will never be seen on your production Squarespace template. 

Example usage:

```html
{.if nodeServer}
    <!-- Template code only seen on your local server. -->
{.end}
```



### Pull Requests
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request



### Shoutout and Credit
Again, nearly all of this project was initially developed and released by [Brandon Kitajchuk](https://github.com/kitajchuk). Big, big shoutout for the amazing work he's doing on his repo, [node-squarespace-server](https://github.com/nodesquarespace/node-squarespace-server). I've tweaked the CLI so you can download and install both this project and his and test the differences yourself.