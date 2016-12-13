import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions:{
    deleteReminder(reminder){
      this.get('store').findRecord('reminder', reminder.id).then((reminder) => {
        reminder.destroyRecord();
      });
    }
  },
  savedReminders: Ember.computed.filter('model.@each.isNew', function(reminder, index, array) {
    return !reminder.get('isNew');
  })
});
