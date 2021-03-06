import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('rule', { path: '/rules' }, function() {
    this.route('add');
    this.route('edit', { path: '/:id'});
  });

});

export default Router;
