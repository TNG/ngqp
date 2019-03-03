import { areEqualUsing, isMissing } from './util';
import { Comparator, ParamDeserializer, ParamSerializer } from './types';

/**
 * Creates a serializer for parameters of type `string`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createStringSerializer(defaultValue: string | null = null): ParamSerializer<string> {
    return model => isMissing(model) ? defaultValue : model;
}

/**
 * Creates a deserializer for parameters of type `string`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createStringDeserializer(defaultValue: string | null = null): ParamDeserializer<string> {
    return value => isMissing(value) ? defaultValue : value;
}

/**
 * Creates a serializer for parameters of type `number`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createNumberSerializer(defaultValue: string | null = null): ParamSerializer<number> {
    return model => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * Creates a deserializer for parameters of type `number`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createNumberDeserializer(defaultValue: number | null = null): ParamDeserializer<number> {
    return value => isMissing(value) ? defaultValue : parseFloat(value);
}

/**
 * Creates a serializer for parameters of type `boolean`.
 *
 * @param defaultValue Optional default value to return if the value to serialize is `undefined` or `null`.
 */
export function createBooleanSerializer(defaultValue: string | null = null): ParamSerializer<boolean> {
    return model => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * Creates a deserializer for parameters of type `boolean`.
 *
 * @param defaultValue Optional default value to return if the value to deserialize is `undefined` or `null`.
 */
export function createBooleanDeserializer(defaultValue: boolean | null = null): ParamDeserializer<boolean> {
    return value => isMissing(value) ? defaultValue : (value === 'true' || value === '1');
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