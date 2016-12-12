import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  title: '',
  date: '',
  notes: '',
  saveOrEdit: 'save',

  actions: {
    handleSave() {
      let reminder = this.getProperties('title', 'date', 'notes', 'edit');
      reminder.date = new Date(reminder.date);
      if(!reminder.edit) {
          this.get('store').createRecord('reminder', reminder).save().then(() => {
            this.setProperties({ title: '', date: '', notes: '' });
          });
      } else {
          console.log('asuh dude');
          this.get('store').findRecord('reminder', reminder.id).then((reminder) => {
            reminder.save()
          });
        }
      }
    }
});
