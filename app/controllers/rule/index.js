import Ember from 'ember';
import Controller from '@ember/controller';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 10,
 
  pagedContent: pagedArray('model', {
    page: Ember.computed.alias("parent.page"),
    perPage: Ember.computed.alias("parent.perPage")
  }),
 
  totalPages: Ember.computed.oneWay("model.totalPages")

});
