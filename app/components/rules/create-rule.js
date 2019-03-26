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
    if( this.get('model') )
      this.set( 'rule', this.get('model') );
    else
      this.set( 'rule', this.store.createRecord( 'rule' ) );
    this.get( 'rService' ).loadModel( true, this.get( 'rule' ));
  },

  willDestroyElement() {
    if( !this.get('model.id') )
      this.get('rule').rollbackAttributes();
  },

  actions: {
    setSelection( value ) {
      this.set( 'rService.rule.predicate', value );
    },

    setField( obj, value ) {
      set( obj, 'field', value );
      if (['recieved date', 'recieved time'].includes(value))
        this.set( 'rValue', 'number');
      else
        this.set( 'rValue', 'text');
    },

    setCondition( obj, value ) {
      set( obj, 'condition', value );
    },

    addNewObj() {
      this.get( 'rService' ).addNewRuleObj();
    },

    removeNewObj( obj ) {
      this.get( 'rService' ).removeRuleObj( obj );
    },

    setAction( value ) {
      this.set('rule.actions', value);
    },

    saveRule() {
      this.get( 'rService' ).isAllValid( true );
    }
  }
});
