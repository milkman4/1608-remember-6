import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  title: '',
  date: '',
  notes: '',

  actions: {
    handleSave(reminderModel) {
      let reminder = this.getProperties('title', 'date', 'notes', 'edit');
      reminder.date = new Date(reminder.date);
      if(reminder.edit) {
        this.get('store').findRecord('reminder', reminderModel.id).then((reminderModel) => {
          reminderModel.save()
          return this.rerouteBack(reminderModel)
        });
      } else {
          this.get('store').createRecord('reminder', reminder).save().then(() => {
            this.setProperties({ title: '', date: '', notes: '' });
          });
        }
      }
    }
});
