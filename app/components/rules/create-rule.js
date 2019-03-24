import { set } from '@ember/object'
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  rService : service('rules'),
  store    : service(),
  rValue   : 'text',
  rule     : undefined,

  init() {
    this._super();
    this.set( 'rule', this.store.createRecord( 'rule' ) ),
    this.get( 'rService' ).loadModel( true, this.get( 'rule' ));
  },

  willDestroyElement() {
    this.get('rule').rollbackAttributes();
  },

  actions: {
    setSelection( value ) {
      this.set( 'rService.rule.predicate', value );
    },

    setField( obj, value ) {
      set( obj, 'field', value );
    },

    setCondition( obj, value ) {
      set( obj, 'condition', value );
      this.set( 'rValue' ,this.get( 'rService' ).getConditionType( value ) );
    },

    addNewObj() {
      this.get( 'rService' ).addNewRuleObj();
    },

    removeNewObj( obj ) {
      this.get( 'rService' ).removeRuleObj( obj );
    },

    saveRule() {
      this.get( 'rService' ).isAllValid( true );
    }
  }
});
