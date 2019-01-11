import { isMissing } from './util';
import { Comparator, ParamDeserializer, ParamSerializer } from './types';

/**
 * Wraps a serializer which defaults to the given value.
 *
 * This function returns a new serializer which mirrors the given serializer,
 * except that if the given default value equals the value to be serialized
 * (using the provided comparator), `null` is returned instead.
 *
 * @param serializer The serializer to wrap and mirror.
 * @param emptyOn The default value for which the serialization should return `null`.
 * @param compareWith The comparator function to compare two values.
 */
export function createEmptyOnSerializer<T>(serializer: ParamSerializer<T>, emptyOn: T, compareWith: Comparator<T>): ParamSerializer<T> {
    return (model: T | null) => compareWith(model, emptyOn) ? null : serializer(model);
}

/**
 * Wraps a deserializer which defaults to the given value.
 *
 * This function returns a new deserializer which mirrors the given deserializer,
 * except that on a `null` value to deserialize, the given default value is
 * returned instead.
 *
 * @param deserializer The deserializer to wrap and mirror.
 * @param emptyOn The default value to return if the value to deserialize is `null`.
 */
export function createEmptyOnDeserializer<T>(deserializer: ParamDeserializer<T>, emptyOn: T): ParamDeserializer<T> {
    return (value: string | null) => value === null ? emptyOn : deserializer(value);
}

/**
 * Creates a serializer for parameters of type `string`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createStringSerializer(defaultValue: string | null = null): ParamSerializer<string> {
    return (model: string | null) => isMissing(model) ? defaultValue : model;
}

/**
 * Creates a deserializer for parameters of type `string`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createStringDeserializer(defaultValue: string | null = null): ParamDeserializer<string> {
    return (value: string | null) => isMissing(value) ? defaultValue : value;
}

/**
 * Creates a serializer for parameters of type `number`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createNumberSerializer(defaultValue: string | null = null): ParamSerializer<number> {
    return (model: number | null) => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * Creates a deserializer for parameters of type `number`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createNumberDeserializer(defaultValue: number | null = null): ParamDeserializer<number> {
    return (value: string | null) => isMissing(value) ? defaultValue : parseFloat(value);
}

/**
 * Creates a serializer for parameters of type `boolean`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createBooleanSerializer(defaultValue: string | null = null): ParamSerializer<boolean> {
    return (model: boolean | null) => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * Creates a deserializer for parameters of type `boolean`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createBooleanDeserializer(defaultValue: boolean | null = null): ParamDeserializer<boolean> {
    return (value: string | null) => isMissing(value) ? defaultValue : (value === 'true' || value === '1');
}

/** @internal */
export const DEFAULT_STRING_SERIALIZER = createStringSerializer();

/** @internal */
export const DEFAULT_STRING_DESERIALIZER = createStringDeserializer();

/** @internal */
export const DEFAULT_NUMBER_SERIALIZER = createNumberSerializer();

/** @internal */
export const DEFAULT_NUMBER_DESERIALIZER = createNumberDeserializer();

/** @internal */
export const DEFAULT_BOOLEAN_SERIALIZER = createBooleanSerializer();

/** @internal */
export const DEFAULT_BOOLEAN_DESERIALIZER = createBooleanDeserializer();