/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage will reroute to /reminders', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('viewing the homepage', function(assert) {
  server.createList('reminder', 15);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 15);
  });
});

test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(Ember.$('.spec-reminder-item:first').length, 1);
  });
});

test('clicking on an individual item shows one reminder', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(find('h2').length, 1);
    assert.equal(find('h5').length, 1);
    assert.equal(find('p').length, 1);
  });
});

test('clicking on an individual item adds an active class to that link', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(find('.active').length, 1);
  });
});
