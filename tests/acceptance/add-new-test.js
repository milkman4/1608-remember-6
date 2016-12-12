import { test, skip } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | add new');

test('visiting /new will render a form on the page', function(assert) {
  visit('reminders/new');

  andThen(function() {
    assert.equal(currentURL(), 'reminders/new');
    assert.equal(find('.add-new--form').length, 1);
    assert.equal(find('.input-title').length, 1);
    assert.equal(find('.input-date').length, 1);
    assert.equal(find('.input-submit').length, 1);
  });
});

test('filling out the add-new form and clicking submit will render a reminder on the page', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  click('.input-submit');

  andThen(function() {
    assert.equal(currentURL(), 'reminders/new');
    assert.equal(find('.spec-reminder-item').text().trim(), 'My new reminder');
  });
});

test('clicking on an item in the reminders list renders the date and notes on the page', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  fillIn('.input-date', '2016-10-08');
  fillIn('.input-notes', 'My reminder notes');
  click('.input-submit');

  andThen(function() {
    click('.spec-reminder-item');
  });

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.spec-reminder-item').text().trim(), 'My new reminder');
    assert.equal(find('.reminder-date').text().trim(), '2016-10-07');
    assert.equal(find('.reminder-notes').text().trim(), 'My reminder notes');
  });
});
