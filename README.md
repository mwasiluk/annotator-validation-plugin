# annotator-validation-plugin
Annotation validation plugin for [Annotator.js](http://annotatorjs.org)

## Requirements

- JQuery >=1.6
- annotatorjs 1.2.x

## Usage

You can enable this plugin like any other [annotator.js plugin](http://docs.annotatorjs.org/en/v1.2.x/hacking/plugin-development.html) e. g.:

```javascript
// Setup the annotator on the page.
var content = $('#content').annotator();


// You can optionally specify plugin options:
var pluginOptions={
    minLength: 2,
    customValidators: [{
        validator: function(annotation){
            return annotation.text.length > 0;
        },
        message: "Custom validation message"
    }]
}

// Add plugin.
content.annotator('addPlugin', 'Validation', pluginOptions);
```

## Bower

You can install this package through `Bower` by using the following command :

    bower install annotator-validation-plugin

## Demo

[Plunker demo](http://embed.plnkr.co/zPyWgEdvEcUPyg4fWF2u/preview)

## Default options

```javascript
{
    minLength: 2,
    maxLength: 1000,
    customValidators: [],
    messages:{
        minLength: 'Annotation should have at least {} characters',
        maxLength: 'Please enter no more than {} characters'
    },
    validationMsgStyle: 'color: #E00000; padding: 5px;',
    validationMsgClass: 'annotation-validation-message'
}
```