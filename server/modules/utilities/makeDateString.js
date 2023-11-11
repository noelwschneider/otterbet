export default function makeDateString(date) {
  if (!date) {
    date = new Date()
  }
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}