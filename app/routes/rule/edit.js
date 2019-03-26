import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend({
  model( params ) {
    return this.store.findRecord( 'rule', params.id );
  }  
});
