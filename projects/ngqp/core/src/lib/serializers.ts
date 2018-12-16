import { ParamDeserializer, ParamSerializer } from './model';
import { isMissing } from './util';

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

/** TODO Documentation */
export const DEFAULT_STRING_SERIALIZER = createStringSerializer();

/** TODO Documentation */
export const DEFAULT_STRING_DESERIALIZER = createStringDeserializer();

/** TODO Documentation */
export const DEFAULT_NUMBER_SERIALIZER = createNumberSerializer();

/** TODO Documentation */
export const DEFAULT_NUMBER_DESERIALIZER = createNumberDeserializer();