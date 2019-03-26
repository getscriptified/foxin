import { set } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';
import { v4 } from "ember-uuid";
import { inject as service } from '@ember/service';

var predicateList  = ['any', 'all'];
var fieldsList     = ['from', 'to', 'subject', 'message', 'recieved date', 'recieved time'];
var conditionsList = [{name: 'Contains', code: 'cont', type:'text'}, {name: 'Does not contain', code: 'dnc', type:'text'},
                      {name: 'Equals', code: 'eq', type:'text'}, {name: 'Does not equal', code: 'dne', type:'text'},
                      {name: 'Less than days', code: 'ltd', type:'number'}, {name: 'Less than months', code: 'ltm', type:'number'},
                      {name: 'Greater than days', code: 'gtd', type:'number'}, {name: 'Greater than months', code: 'gtm', type:'number'}
                     ];

var actionList     = [{name: 'Mark as Read / Mark as Unread', type:'mar'},
                     {name: 'Archive message', type:'arch'}, {name: 'Add Label', type:'addLabel'}];
var baseCondition  = { field: '', condition: '', key: '', isValid: false };


export default Service.extend({

  ruleObj        : undefined,
  ruleObjs       : undefined,
  addActions     : undefined,
  predicateList  : undefined,
  fieldsList     : undefined,
  conditionsList : undefined,
  actionList     : undefined,
  store          : service(),
  

  // Init
  init() {
    this._super(...arguments);
    this.set( 'predicateList', predicateList );
    this.set( 'fieldsList', fieldsList );
    this.set( 'conditionsList', conditionsList );
    this.set( 'actionList', actionList );
    this.set( 'addActions', A());
    this.set( 'ruleObjs', A());
    this.loadNewRuleObj();
  },

  // loadModel
  // Params resetRuleObj - Boolean
  // Params rule = Either model createRecord or Created Model for editing
  loadModel( resetRuleObj, rule = this.store.createRecord( 'rule' ) ) {
    if (resetRuleObj)
      this.loadNewRuleObj();
    this.set( 'rule', rule );
  },

  // Load New Rule Obj
  loadNewRuleObj() {
    this.set( 'ruleObjs', A() );
    this.addNewRuleObj();
  },

  // returns ConditionList type
  // Params conditionCode
  getConditionType( conditionCode ) {
    return this.get('conditionsList').find( f => f.code === conditionCode ).type || 'string';
  },

  // Adds New RuleObj
  addNewRuleObj() {
    let newRuleObj = JSON.parse( JSON.stringify( baseCondition ) );
    newRuleObj.id = v4();
    this.insertRuleObjAt( newRuleObj );
  },

  // Removes RuleObj
  removeRuleObj( obj ) {
    this.get( 'ruleObjs' ).removeObject( obj );
  },

  // Insert Rule Obj
  // Should be able to insert at certain position
  insertRuleObjAt( obj ) {
    this.get( 'ruleObjs' ).addObject( obj );
  },

  // Gets the index position
  getIndex( obj ) {
    return this.get( 'ruleObjs' ).indexOf( obj );
  },

  // Returns Stringified Obj
  getRulesStringified( obj ) {
    return JSON.stringify( obj );
  },

  // ***************
  // Store Functions
  // ***************
  saveRule() {
    this.set('rule.conditions', this.getRulesStringified( this.get('ruleObjs') ) );
    let model = this.get('rule');
    model.save().catch(err => err );
  },

  deleteRule( model ) {
    model.deleteRecord();
    model.save();
  },

  // ********************
  // Validation | RuleObj
  // ********************
  isAllValid( saveRecord ) {
    this.get( 'ruleObjs' ).forEach( obj => this.isValid(obj) );
    if ( saveRecord )
      this.saveRule();
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
