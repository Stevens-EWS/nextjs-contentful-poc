export default async function exit(req, res) {
  const { returnto } = req.query
  const unsafeReturnTo = decodeURIComponent(returnto)

  // Prevent open redirect by ensuring initial slash (but not double slash) in return path.
  const safeReturnTo = (unsafeReturnTo.charAt(0) === '/' && unsafeReturnTo.charAt(1) !== '/')
    ? unsafeReturnTo
    : '/'

  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: safeReturnTo })
  res.end()
}
