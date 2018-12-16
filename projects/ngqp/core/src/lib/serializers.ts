import { ParamDeserializer, ParamSerializer } from './model';
import { Comparator, isMissing } from './util';

/**
 * TODO Documentation
 */
export function createEmptyOnSerializer<T>(serializer: ParamSerializer<T>, emptyOn: T, compareWith: Comparator<T>): ParamSerializer<T> {
    return (model: T | null) => compareWith(model, emptyOn) ? null : serializer(model);
}

/**
 * TODO Documentation
 */
export function createEmptyOnDeserializer<T>(deserializer: ParamDeserializer<T>, emptyOn: T): ParamDeserializer<T> {
    return (value: string | null) => isMissing(value) ? emptyOn : deserializer(value);
}

/**
 * TODO Documentation
 */
export function createStringSerializer(defaultValue: string | null = null): ParamSerializer<string> {
    return (model: string | null) => isMissing(model) ? defaultValue : model;
}

/**
 * TODO Documentation
 */
export function createStringDeserializer(defaultValue: string | null = null): ParamDeserializer<string> {
    return (value: string | null) => isMissing(value) ? defaultValue : value;
}

/**
 * TODO Documentation
 */
export function createNumberSerializer(defaultValue: string | null = null): ParamSerializer<number> {
    return (model: number | null) => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * TODO Documentation
 */
export function createNumberDeserializer(defaultValue: number | null = null): ParamDeserializer<number> {
    return (value: string | null) => isMissing(value) ? defaultValue : parseFloat(value);
}

/**
 * TODO Documentation
 */
export function createBooleanSerializer(defaultValue: string | null = null): ParamSerializer<boolean> {
    return (model: boolean | null) => isMissing(model) ? defaultValue : `${model}`;
}

/**
 * TODO Documentation
 */
export function createBooleanDeserializer(defaultValue: boolean | null = null): ParamDeserializer<boolean> {
    return (value: string | null) => isMissing(value) ? defaultValue : (value === 'true' || value === '1');
}

/** TODO Documentation */
export const DEFAULT_STRING_SERIALIZER = createStringSerializer();

/** TODO Documentation */
export const DEFAULT_STRING_DESERIALIZER = createStringDeserializer();

/** TODO Documentation */
export const DEFAULT_NUMBER_SERIALIZER = createNumberSerializer();

/** TODO Documentation */
export const DEFAULT_NUMBER_DESERIALIZER = createNumberDeserializer();

/** TODO Documentation */
export const DEFAULT_BOOLEAN_SERIALIZER = createBooleanSerializer();

/** TODO Documentation */
export const DEFAULT_BOOLEAN_DESERIALIZER = createBooleanDeserializer();