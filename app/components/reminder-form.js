import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  title: '',
  date: '',
  notes: '',
  saveOrEdit: 'save',

  actions: {
    handleSave() {
      let reminder = this.getProperties('title', 'date', 'notes', 'save');
      if(reminder.save) {
          reminder.date = new Date(reminder.date);
          this.get('store').createRecord('reminder', reminder).save().then(() => {
            this.setProperties({ title: '', date: '', notes: '' });
          });
      } else {
        console.log('asuh dude');
        }
      }
    }
});
