/**
 * Return a default string prop
 * @param {*} str
 * @param {*} required
 */

export const defaultStringProp = (def, required) =>
  generateDefault(String, required, def ?? "");

/**
 * Return a default array prop
 * @param {*} arr
 * @param {*} required
 */
export const defaultArrayProp = (def, required) =>
  generateDefault(Array, required, def ?? []);

/**
 * Return a default function prop
 * @param {*} def
 * @param {*} required
 */
export const defaultFunctionProp = (def, required) =>
  generateDefault(
    Function,
    required,
    def ??
      function(item) {
        return item;
      }
  );

export const defaultBooleanProp = (def, required) =>
  generateDefault(
    Boolean,
    required,
    def !== null || def !== undefined ? def : false
  );

/**
 * Create a default prop with given value below
 * @param {*} type Type that will be generated
 * @param {*} required Is it a requried field or not ?
 * @param {*} defaultValue
 */
function generateDefault(type, required, defaultValue) {
  return {
    type,
    required,
    default: defaultValue
  };
}
