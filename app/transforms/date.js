import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment(serialized).format("YYYY-MM-DD");
  },

  serialize(deserialized) {
    return moment(deserialized).toISOString();
  }
});
