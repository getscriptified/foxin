import DS from 'ember-data';
import { computed } from '@ember/object';
import Validator from "../mixins/model-validator";

export default DS.Model.extend(Validator, {

  name       : DS.attr('string'),
  predicate  : DS.attr('string'),
  conditions : DS.attr('string'),
  action     : DS.attr('string'),

  parsedData : computed('conditions', function() {
    return JSON.parse( this.get('conditions') );
  })

  // validations: {
  //   name: {
  //     presence: true
  //   },
  //   predicate: {
  //     presence: true
  //   }
  // }
  
});
