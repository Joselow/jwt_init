export const responseSuccess = ({ res, message = null, data, code = 200 }) => {
  res.status(code).json({
    ok: true,
    ...(message && { message }),
    data: data
  })
}