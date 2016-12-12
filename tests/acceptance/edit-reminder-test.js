import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | edit reminder test');

test('visiting /edit-reminder-test', function(assert) {
  visit('/edit');

  andThen(function() {
    assert.equal(currentURL(), '/edit');
  });
});
