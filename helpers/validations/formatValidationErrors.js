export const formatValidationErrors = (error) => {
  return error.details.map(({ message }) => message)
}