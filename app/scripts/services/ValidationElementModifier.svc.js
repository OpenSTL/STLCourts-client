'use strict';
angular.module('ghAngularApp').factory('validationElementModifier', function () {
  var reset = function (el) {
      angular.forEach(el.find('span.help-block'), function (helpBlock) {
        helpBlock = angular.element(helpBlock);
        if (helpBlock.hasClass('error-msg') || helpBlock.hasClass('form-control-feedback') || helpBlock.hasClass('control-feedback')) {
          helpBlock.removeClass('error-msg has-error form-control-feedback control-feedback');
          helpBlock.text('');
        }
      });

      el.removeClass('has-success has-error has-feedback');
    },

    findWithClassElementAsc = function (el, klass) {
      var parent = el;
      for (var i = 0; i <= 3; i += 1) {
        if (parent !== undefined && parent.hasClass(klass)) {
          break;
        } else if (parent !== undefined) {
          parent = parent.parent();
        }
      }

      return parent;
    },

    findWithClassElementDesc = function (el, klass) {
      var child;
      for (var i = 0; i < el.children.length; i += 1) {
        child = el.children[i];
        if (child !== undefined && angular.element(child).hasClass(klass)) {
          break;
        } else if (child.children !== undefined) {
          child = findWithClassElementDesc(child, klass);
          if (child.length > 0) {
            break;
          }
        }
      }

      return angular.element(child);
    },

    findFormGroupElement = function (el) {
      return findWithClassElementAsc(el, 'form-group');
    },

    findInputGroupElement = function (el) {
      return findWithClassElementDesc(el, 'input-group');
    },

    insertAfter = function (referenceNode, newNode) {
      referenceNode[0].parentNode.insertBefore(newNode[0], referenceNode[0].nextSibling);
    },

    addValidationStateIcons = false,

    enableValidationStateIcons = function (enable) {
      addValidationStateIcons = enable;
    },

    makeValid = function (el) {
      var frmGroupEl = findFormGroupElement(el),
        inputGroupEl = findInputGroupElement(frmGroupEl[0]);

      reset(frmGroupEl);
      frmGroupEl.addClass('has-success ' + (inputGroupEl.length > 0 ? '' : 'has-feedback'));
      if (addValidationStateIcons) {
        var iconElText = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
        if (inputGroupEl.length > 0) {
          iconElText = iconElText.replace('form-', '');
          iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span';
        }

        insertAfter(el, angular.element(iconElText));
      }
    },

    makeInvalid = function (el, errorMsg) {
      var frmGroupEl = findFormGroupElement(el);
      var inputGroupEl = findInputGroupElement(frmGroupEl[0]);
      var helpTextEl = frmGroupEl.find('span.help-block');
      reset(frmGroupEl, inputGroupEl);
      //if (! el.hasClass('ng-pristine')) {
      helpTextEl.text(errorMsg);
      helpTextEl.addClass('has-error error-msg');
      frmGroupEl.addClass('has-error ' + (inputGroupEl.length > 0 ? '' : 'has-feedback'));
      if (addValidationStateIcons) {
        var iconElText = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
        if (inputGroupEl.length > 0) {
          iconElText = iconElText.replace('form-', '');
          iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span';
        }

        insertAfter(el, angular.element(iconElText));
      }
      //}
    },

    makeDefault = function (el) {
      var frmGroupEl = findFormGroupElement(el);
      reset(frmGroupEl);
    };

  return {
    makeValid: makeValid,
    makeInvalid: makeInvalid,
    makeDefault: makeDefault,
    enableValidationStateIcons: enableValidationStateIcons,
    key: 'inveo'
  };
});
