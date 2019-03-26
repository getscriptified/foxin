import { alias, oneWay, sort } from '@ember/object/computed';
import Controller from '@ember/controller';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  sortBy: ['name:asc'],
  queryParams: ["page", "perPage", "search"],
  page: 1,
  perPage: 5,
  search: "",
  order: "asc",
 
  sortedContent: sort('model', 'sortBy'),

  pagedContent: pagedArray('sortedContent', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),
 
  totalPages: oneWay("model.totalPages"),

  sortOrderUpdate: function() {
    this.set('sortBy', [`name:${this.get('order')}`]);
  }.observes('order'),

  actions: {
    goToEdit( model ) {
      this.transitionToRoute('rule.edit', model);
    }
  }

});
