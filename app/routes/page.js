import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    RSVP.hash({ model: [], page: params.page });
  }
});
