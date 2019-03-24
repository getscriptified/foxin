import DS from 'ember-data';
import Validator from "../mixins/model-validator";

export default DS.Model.extend(Validator, {
  name       : DS.attr('string'),
  predicate  : DS.attr('string'),
  conditions : DS.attr('string'),
  actions    : DS.attr('string'),

  validations: {
    name: {
      presence: true
    },
    predicate: {
      presence: true
    }
  }
  
});
