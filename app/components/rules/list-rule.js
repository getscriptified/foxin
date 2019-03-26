import { get } from '@ember/object'
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  rService : service('rules'),

  actions: {
    edit(model) {
      this.get('goToEdit')( model );
    },

    delete( model ) {
      this.get('rService').deleteRule( model );
    }
  }

});