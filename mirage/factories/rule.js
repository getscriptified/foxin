import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Rule ${i}`;
  },

  predicate() { return 'any' },

  conditions() {
    return "[{\"field\":\"from\",\"condition\":\"cont\",\"key\":\"tenmiles\",\"isValid\":true,\"id\":\"b7e5dd09-f52e-4e18-baab-42ad1b3b07d0\"},{\"field\":\"subject\",\"condition\":\"cont\",\"key\":\"Amazing\",\"isValid\":true,\"id\":\"82dd758f-4ba5-4e35-ac68-e7912d417b1d\"},{\"field\":\"\",\"condition\":\"\",\"key\":\"\",\"isValid\":false,\"id\":\"67cdd042-af24-4bd8-9953-16aadebd4905\"}]";
  },

  action() {
    return 'Mark as Read'
  }

});
