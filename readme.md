# Prototype Playground
What is it? This is a base environment, with the minimum amount of setup and dependencies to start building web prototypes.

You'll be setting up Node, a Javascript environment that lets you code on your local machine. With Node, you can use NPM and Gulp. NPM is a package manager that lets you download useful tools to help you code. Gulp is a task runner that automates whatever you tell it to. It's commonly used to check for errors, compile your code, and auto refresh your browser.

### [Documentation and Guides](https://hagata.github.io/prototype_playground/)

# Prerequisities
* [XCode](https://itunes.apple.com/cg/app/xcode/id497799835?mt=12)
* [Node.js with npm](https://nodejs.org/en/)
  - *If you have a permissions issue, run this in Terminal `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`*
* Gulp
  * Run `npm install gulp -g` in Terminal

# Getting started
1. Download the prototype playground from Github
2. Drag and drop the folder onto Terminal in your dock
3. Download Node modules
    1. In Terminal type `npm install`.
4. Initialize Gulp
    1. Type `gulp`.
5. Open your project folder in your text editor and start coding!

# Inside the Playground
Take a look at the file structure of your new project. The `/source` folder is where all your editable code lives. Once you start saving changes, the playground will generate a `/_build` folder where your compiled code lives and is served to your browser. Edit the files in `/source` not `/_build`!

The playground will compile and concatenate all the Javascript files in `/source/scripts` and the SASS files in `/source/styles`. You can keep your code neat by separating them into different .js and .scss files.

The `.tpl` files in `source/pages/` are your `.html` files. To learn more, read the Templating section below.

# Templating
In depth documentation and guides can be found [on the nunjucks site](http://mozilla.github.io/nunjucks/templating.html). However, it's useful to know the following concepts.

## tl;dr
`.tpl` files in `source/pages/` are your `.html` files.
To make a new page, start the page with an extend statement and place your code between the block tags
```
// This is an extend statement
{% extends 'templates/base.tpl' %}

{% block content %}
// put your content here…
{% endblock %}
```

## Extending
You'll notice this line of code in `source/pages/index.tpl':
```
{% extends 'templates/base.tpl' %}
```

This means you're including all the html code from the `base.tpl` template in your `index.tpl` file. `base.tpl` would be a good place to hold global elements like a nav and footer.   

## Blocks
The next thing to know is the `{% block %}` concept. A block is a placeholder in the base template for unique content. In our `source/templates/base.tpl` file we're creating a `block` called `content` which we use to inject html content into the `<body>` tag. This is used in `index.tpl`:
```
{% block content %}
<h1>your html content here</h1>
{% endblock %}
```

# Gulp tasks
This project leverages the power of Gulp. You may use the following gulp commands as needed.

| command | description |
| ------ | ------- |
| watch | Runs necessary build scripts as files are modified. |
| sass | Compile sass to `/_build` directory |
| serve | Starts a browserSync server at `localhost:3000` |


# Optional plugins for your text editor
* [atom-beautify](https://atom.io/packages/atom-beautify) for higlighting nunjucks syntax in Atom
* [nunjucks syntax](https://packagecontrol.io/packages/Nunjucks%20Syntax) for higlighting nunjucks syntax in Sublime
