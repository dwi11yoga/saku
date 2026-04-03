export default function fieldValidation(name, value, fieldSchema) {
  if (fieldSchema[name]) {
    const result = fieldSchema[name].safeParse(value);

    // simpan hasil validasi ke $errors
    var newError;
    if (!result.success) {
      newError = { ...errors, [name]: result.error.issues[0].message };
    } else {
      newError = { ...errors };
      delete newError[name];
    }
    return newError;
  }
}
