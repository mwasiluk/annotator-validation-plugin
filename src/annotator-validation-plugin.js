Annotator.Plugin.Validation = function (element, options) {

    Annotator.Plugin.apply(this, arguments);

};

jQuery.extend(Annotator.Plugin.Validation.prototype, new Annotator.Plugin(), {
    events: {
    },
    options: {
        minLength: 2,
        maxLength: 1000,
        //custom validator example:
        /*customValidators: [{
            validator: function(annotation){
                return annotation.text.length > 0;
            },
            message: "Custom validator message"
        }],*/
        customValidators: [],
        messages:{
            minLength: 'Annotation should have at least {} characters',
            maxLength: 'Please enter no more than {} characters'
        },
        validationMsgStyle: 'color: #E00000; padding: 5px;',
        validationMsgClass: 'annotation-validation-message'
    },
    pluginInit: function () {
        if (!Annotator.supported()) {
            return;
        }
        var plugin = this;

        this.validationField=null;
        this.validationFieldHtml=null;

        this.initValidationFieldHtml();

        this.annotator.editor.submit = function (event){
            var editor = this;
            if(event){
                event.preventDefault();
            }

            var annotationToTest = jQuery.extend(true, {}, editor.annotation);
            this.fields.forEach(function(field){
                field.submit(field.element, annotationToTest);
            });

            var validationResult = plugin.checkValidity(annotationToTest);

            if(!validationResult.valid){
                plugin.showValidationMessage(validationResult.message);
                return;
            }

            this.fields.forEach(function(field){
                field.submit(field.element, editor.annotation);
            });
            this.publish('save', [this.annotation]);
            this.hide()
        };


        this.annotator.editor.addField({
            load: function (field, annotation) {
                $(field).hide();
                $(field).html(plugin.validationFieldHtml);
                plugin.validationField  = field;
            }

        });
    },

    showValidationMessage: function(message){
        if(message){
            $(this.validationField).find('.'+this.options.validationMsgClass).html(message);
            $(this.validationField).show();
        }
    },

    getValidationMessage: function(constraint){
        var plugin = this;
        var message = plugin.options.messages[constraint];
        if(message){
            var constraintVal = plugin.options[constraint];
            message = message.replace('{}', constraintVal);
        }
        return message;
    },

    checkValidity: function(annotation){
        var plugin = this;
        var result={
            valid: true,
            message: null
        };

        if(this.options.minLength){
            if(!annotation.text || annotation.text.length < this.options.minLength){
                return {
                    valid: false,
                    message: plugin.getValidationMessage('minLength')
                };
            }

        }

        if(this.options.maxLength){
            if(!annotation.text || annotation.text.length > this.options.maxLength){
                return {
                    valid: false,
                    message: plugin.getValidationMessage('maxLength')
                };
            }

        }

        if(this.options.customValidators && this.options.customValidators.length){
            for(var i=0; i< this.options.customValidators.length; i++){
                var validator = this.options.customValidators[i];
                if(!validator.validator(annotation)){
                    return {
                        valid: false,
                        message: validator.message
                    };
                }
            }
        }

        return result;
    },

    initValidationFieldHtml: function () {
        var plugin = this;
        var validationMsgStyle = '';
        if (this.options.validationMsgStyle) {
            validationMsgStyle = plugin.options.validationMsgStyle;
        }
        var validationMsgClass = '';
        if (this.options.validationMsgClass) {
            validationMsgClass = plugin.options.validationMsgClass;
        }
        this.validationFieldHtml = '<div class="' + validationMsgClass + '" style="' + validationMsgStyle + '"></div>';
    }


});
