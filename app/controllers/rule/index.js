import { alias, oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 5,
 
  pagedContent: pagedArray('model', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),
 
  totalPages: oneWay("model.totalPages"),

  actions: {
    goToEdit( model ) {
      this.transitionToRoute('rule.edit', {id: model.id});
    }
  }

});
