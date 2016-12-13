import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions:{
    deleteReminder(reminder){
      reminder.destroyRecord();
    }
  },
  savedReminders: Ember.computed.filter('model.@each.isNew', function(reminder, index, array) {
    return !reminder.get('isNew');
  })
});
