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
  fillIn('.input-date', '2016-10-10');
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
  fillIn('.input-date', '2016-10-08');
  fillIn('.input-notes', 'My reminder notes edited');
  click('.input-submit');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.spec-reminder-item').text().trim(), 'My new reminder edited');
    assert.equal(find('.reminder-date').text().trim(), '2016-10-08');
    assert.equal(find('.reminder-notes').text().trim(), 'My reminder notes edited');
  });

});

test('while editing a reminder, revert will send the values back to the original values', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  fillIn('.input-date', '2016-10-10');
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
  fillIn('.input-date', '2016-10-08');
  fillIn('.input-notes', 'My reminder notes edited');

  andThen(function() {
    assert.equal(find('.input-title').val().trim(), 'My new reminder edited');
    assert.equal(find('.input-date').val().trim(), '2016-10-08');
    assert.equal(find('.input-notes').val().trim(), 'My reminder notes edited');
  });

  click('.input-revert');

  andThen(function() {
    assert.equal(find('.input-title').val().trim(), 'My new reminder');
    assert.equal(find('.input-date').val().trim(), '2016-10-10');
    assert.equal(find('.input-notes').val().trim(), 'My reminder notes');
  });

});

test('if there are unsaved changes there will be a warning below the reminder title', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  fillIn('.input-date', '2016-10-10');
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

  andThen(function() {
    assert.equal(find('.unsaved-changes').length, 1);
  });

  click('.input-revert');

  andThen(function() {
    assert.equal(find('.unsaved-changes').length, 0);
  });

});
