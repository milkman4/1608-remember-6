import Ember from 'ember';

export default Ember.Controller.extend({
  title: '',
  date: '',
  notes: '',

  actions: {
    handleSave() {
      let reminder = this.getProperties('title', 'date', 'notes', 'edit');
      reminder.date = new Date(reminder.date);
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
