import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions:{
    deleteReminder(reminder){
        reminder.destroyRecord()
        this.transitionToRoute('reminders')
    }
  }
});
