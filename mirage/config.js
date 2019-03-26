import Response from 'ember-cli-mirage/response';
import { A } from '@ember/array';

export default function() {
  this.namespace = '/api';

  // GET
  this.get('/rules');

  // GET /:id
  this.get('/rules/:id');

  // POST
  this.post('/rules', ( schema, request) => {
    let attrs  = JSON.parse(request.requestBody).data.attributes,
        errors = A();

    // Validations
    if(!attrs.name) {
      errors.push({ "status": "403", "code": "403", "title": 'Name is empty', "detail": 'Name cannot be empty',
        'source': { 'pointer': '/data/attributes/name'},
      });
    }

    if(!attrs.predicate) {
      errors.push({ "status": "403", "code": "403", "title": 'predicate is empty', "detail": 'Predicate cannot be empty',
        'source': { 'pointer': '/data/attributes/predicate'},
      });
    }

    if(!attrs.action) {
      errors.push({ "status": "403", "code": "403", "title": 'action is empty', "detail": 'Action should be selected',
        'source': { 'pointer': '/data/attributes/action'},
      }); 
    }

    if (errors.length > 0) {
      return new Response(422, {}, { errors: errors });
    }
    
    return schema.rules.create(attrs);

  });

  // PATCH
  this.patch('/rules/:id');

  // DELETE
  this.delete('/rules/:id');
}
