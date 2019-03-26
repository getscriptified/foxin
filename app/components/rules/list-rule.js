import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  rService : service('rules'),
  search   : undefined,
  order    : "",

  getConditionType( value, rService ) {
    return rService.conditionsList.find( i => i.code == value).name;
  },

  actions: {
    edit(model) {
      this.get('goToEdit')( model );
    },

    delete( model ) {
      this.get('rService').deleteRule( model );
    },

    sortBy( order ){
      this.set('order', order);
    }
  }

});