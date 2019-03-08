import {
    createBooleanDeserializer,
    createBooleanSerializer,
    createNumberDeserializer,
    createNumberSerializer,
    createStringDeserializer,
    createStringSerializer,
    DEFAULT_BOOLEAN_DESERIALIZER,
    DEFAULT_BOOLEAN_SERIALIZER,
    DEFAULT_NUMBER_DESERIALIZER,
    DEFAULT_NUMBER_SERIALIZER,
    DEFAULT_STRING_DESERIALIZER,
    DEFAULT_STRING_SERIALIZER
} from './serializers';
import { ParamDeserializer, ParamSerializer } from './types';
import { LOOSE_IDENTITY_COMPARATOR } from './util';

function testSerialize<T>(serializer: ParamSerializer<T>, input: T, expected: string) {
    it(`serializes ${input} to ${expected}`, () => expect(serializer(input)).toBe(expected));
}

function testDeserialize<T>(deserializer: ParamDeserializer<T>, input: string, expected: T) {
    it(`deserializes ${input} to ${expected}`, () => expect(deserializer(input)).toBe(expected));
}

describe('Default (de-)serializer', () => {
    (serializer => {
        describe(serializer.name, () => {
            testSerialize(serializer, null, null);
            testSerialize(serializer, undefined, null);
            testSerialize(serializer, '', '');
            testSerialize(serializer, 'Test', 'Test');
        });
    })(DEFAULT_STRING_SERIALIZER);

    (deserializer => {
        describe(deserializer.name, () => {
            testDeserialize(deserializer, null, null);
            testDeserialize(deserializer, undefined, null);
            testDeserialize(deserializer, '', '');
            testDeserialize(deserializer, 'Test', 'Test');
        });
    })(DEFAULT_STRING_DESERIALIZER);

    (serializer => {
        describe(serializer.name, () => {
            testSerialize(serializer, null, null);
            testSerialize(serializer, undefined, null);
            testSerialize(serializer, 42, '42');
            testSerialize(serializer, 13.37, '13.37');
        });
    })(DEFAULT_NUMBER_SERIALIZER);

    (deserializer => {
        describe(deserializer.name, () => {
            testDeserialize(deserializer, null, null);
            testDeserialize(deserializer, undefined, null);
            testDeserialize(deserializer, '42', 42);
            testDeserialize(deserializer, '13.37', 13.37);
        });
    })(DEFAULT_NUMBER_DESERIALIZER);

    (serializer => {
        describe(serializer.name, () => {
            testSerialize(serializer, null, null);
            testSerialize(serializer, undefined, null);
            testSerialize(serializer, true, 'true');
            testSerialize(serializer, false, 'false');
        });
    })(DEFAULT_BOOLEAN_SERIALIZER);

    (deserializer => {
        describe(deserializer.name, () => {
            testDeserialize(deserializer, null, null);
            testDeserialize(deserializer, undefined, null);
            testDeserialize(deserializer, 'true', true);
            testDeserialize(deserializer, 'false', false);
            testDeserialize(deserializer, '1', true);
            testDeserialize(deserializer, 'foo', false);
        });
    })(DEFAULT_BOOLEAN_DESERIALIZER);
});

describe(LOOSE_IDENTITY_COMPARATOR.name, () => {
    const testLooseComparator = (a: any, b: any, expected: boolean) => it(`returns ${expected} for ${a} / ${b}`, () =>
        expect(LOOSE_IDENTITY_COMPARATOR(a, b)).toBe(expected)
    );

    testLooseComparator(null, null, true);
    testLooseComparator(undefined, undefined, true);
    testLooseComparator(null, undefined, true);
    testLooseComparator(undefined, null, true);

    testLooseComparator('Test', 'Test', true);
    testLooseComparator(42, 42, true);
    testLooseComparator(true, true, true);

    testLooseComparator('Test 1', 'Test 2', false);
    testLooseComparator(42, 1337, false);
    testLooseComparator(true, false, false);
    testLooseComparator({}, {}, false);
    testLooseComparator([], [], false);
});