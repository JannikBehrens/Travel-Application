// ref: Udacity Knowledge 

import { apiKeys } from '../src/server/testingKeys';

test('checking if the username is included', () => {
    expect(apiKeys('geoUsername')).not.toBe('');
});

test('checking if the weather bit key is included', () => {
    expect(apiKeys('weatherKey')).not.toBe('');
});

test('checking if the pixabay key is included', () => {
    expect(apiKeys('pixaKey')).not.toBe('');
});