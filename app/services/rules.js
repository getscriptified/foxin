import { set } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';
import { v4 } from "ember-uuid";
import { inject as service } from '@ember/service';

var predicates = ['any', 'all'];
var fields     = ['from', 'to', 'subject', 'message', 'recieved date', 'recieved time'];
var conditions = [{name: 'Contains', code: 'cont', type:'string'}, {name: 'Does not contain', code: 'dnc', type:'string'},
                  {name: 'Equals', code: 'eq', type:'string'}, {name: 'Does not equal', code: 'dne', type:'string'},
                  {name: 'Less than days', code: 'ltd', type:'number'}, {name: 'Less than months', code: 'ltm', type:'number'},
                  {name: 'Greater than days', code: 'gtd', type:'number'}, {name: 'Greater than months', code: 'gtm', type:'number'}
                ];

var actions    = [{name: 'Mark as Read', type:'mar'}, {name: 'Mark as Unread', type:'mau'},
                  {name: 'Archive message', type:'arch'}, {name: 'Add Label', type:'addLabel'}];
var baseRule   = { field: '', condition: '', key: '', isValid: false };


export default Service.extend({

  ruleObj      : undefined,
  ruleObjs     : undefined,
  predicates   : undefined,
  fields       : undefined,
  conditions   : undefined,
  actions      : undefined,
  store        : service(),
  

  // Initial Object
  init() {
    this._super(...arguments);
    this.set( 'predicates', predicates );
    this.set( 'fields', fields );
    this.set( 'conditions', conditions );
    this.set( 'actions', actions );
    this.set( 'ruleObjs', A());
    this.loadNewRuleObj();
  },

  loadModel( resetRuleObj, rule = this.store.createRecord( 'rule' ) ) {
    if (resetRuleObj)
      this.loadNewRuleObj();
    this.set( 'rule', rule );
  },

  loadNewRuleObj() {
    this.set( 'ruleObjs', A() );
    this.addNewRuleObj();
  },

  // Functions

  getConditionType( condition ) {
    return this.get('conditions').find( f => f.code === condition ).type || 'string';
  },

  addNewRuleObj() {
    let newRuleObj = JSON.parse( JSON.stringify( baseRule ) );
    newRuleObj.id = v4();
    this.insertRuleObjAt( newRuleObj );
  },

  removeRuleObj( obj ) {
    this.get( 'ruleObjs' ).removeObject( obj );
  },

  insertRuleObjAt( obj ) {
    this.get( 'ruleObjs' ).addObject( obj );
  },

  getIndex( obj ) {
    return this.get( 'ruleObjs' ).indexOf( obj );
  },

  getRulesStringified() {
    return JSON.stringify(this.get('ruleObjs'));
  },

  // Create Rule
  createRule() {
    this.set('rule.conditions', this.getRulesStringified() );
    let model = this.get('rule');
    model.save().catch((err) => { console.log(model) } );
  },

  // Validation
  isAllValid( isCreateRule ) {
    this.get( 'ruleObjs' ).forEach( obj => this.isValid(obj) );
    if ( isCreateRule )
      this.createRule();
  },

  isValid( obj ) {
    if ( this._isValidField(obj) &&
         this._isValidCondition(obj) &&
         this._isValidKey(obj) )
      set( obj, 'isValid', true);
  },

  _isValidField( obj ) {
    if ( obj.field ) 
      return true;

    return false;
  },

  _isValidCondition( obj ) {
    if ( obj.condition ) 
      return true;

    return false;
  },

  _isValidKey( obj ) {
    if ( obj.key ) 
      return true;

    return false;
  }


});
