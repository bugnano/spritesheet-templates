// Load in local modules
var fs = require("fs");
var handlebars = require("handlebars");
var tmpl = fs.readFileSync(
  __dirname + "/css_variables.template.handlebars",
  "utf8",
);

// Register the CSS as a partial for extension
handlebars.registerPartial("css_variables", tmpl);

// Define our css template fn ({sprites, options}) -> css
function cssVariablesTemplate(data) {
  // Localize parameters
  var sprites = data.sprites;
  var options = data.options;

  // Fallback class naming function
  var selectorFn =
    options.cssSelector ||
    function defaultCssClass(sprite) {
      return "." + sprite.spritesheet_name + "-" + sprite.name;
    };

  // Add class to each of the options
  sprites.forEach(function saveClass(sprite) {
    sprite.spritesheet_name = data.spritesheet_name;
    sprite.selector = selectorFn(sprite);
  });

  // Render and return CSS
  var css = handlebars.compile(tmpl)(data);
  return css;
}

// Export our CSS template
module.exports = cssVariablesTemplate;
