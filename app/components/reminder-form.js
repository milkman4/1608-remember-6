import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    handleSave(reminderModel) {
      reminderModel.save()
      this.sendAction("action", this.get('model'));
      },
      rollback(reminderModel){
        if(reminderModel.get('hasDirtyAttributes')){
          reminderModel.rollbackAttributes()
        }
      }
    }
});
