import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | edit reminder test');

test('visiting /reminders/edit/1 will route to the correct url', function(assert) {
  server.createList('reminder', 1);

  visit('reminders/edit/1');

  andThen(function() {
    assert.equal(currentURL(), 'reminders/edit/1');
  });
});

test('editing a reminder updates the value in the database', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  fillIn('.input-date', '10.12.2016');
  fillIn('.input-notes', 'My reminder notes');
  click('.input-submit');

  andThen(function() {
    click('.spec-reminder-item');
  })

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    click('.reminder-edit');
  });

  andThen(function() {
    assert.equal(currentURL(), '/reminders/edit/1');
  });

  fillIn('.input-title', 'My new reminder edited');
  fillIn('.input-notes', 'My reminder notes edited');
  click('.input-submit');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.spec-reminder-item').text().trim(), 'My new reminder edited');
    assert.equal(find('.reminder-notes').text().trim(), 'My reminder notes edited');
  });

});
