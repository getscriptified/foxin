import Ember from 'ember';
import { JSONAPISerializer } from 'ember-cli-mirage';

const { dasherize } = Ember.String;

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return dasherize(attr);
  },

  keyForRelationship(attr) {
    return dasherize(attr);
  }
});
