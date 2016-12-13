import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
      reroute(reminder){
        this.transitionToRoute('reminders.reminder', reminder.id);
      }
    }
});
