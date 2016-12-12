import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    // return serialized
    return moment(serialized).format("YYYY-MM-DD");
  },

  serialize(deserialized) {
    // return deserialized
    return moment(deserialized).toISOString();
  }
});
