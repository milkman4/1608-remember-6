import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service('-routing'),

  title: '',
  date: '',
  notes: '',
  saveOrEdit: 'save',

  actions: {
    handleSave() {
      let reminder = this.getProperties('title', 'date', 'notes', 'saveOrEdit');
      switch(reminder.saveOrEdit){
        case 'save':
          reminder.date = new Date(reminder.date);
          this.get('store').createRecord('reminder', reminder).save().then(() => {
            this.setProperties({ title: '', date: '', notes: '' });
          });
          break;
        case 'edit':
          // this.transitionToRoute('reminders.reminder', reminder);
          let reminder = this.getProperties('id','title', 'date', 'notes', 'saveOrEdit');
          console.log(reminder);
          this.get('router').transitionTo('reminders.reminder', reminder.id);
        break;
      }
    }
  }
});
