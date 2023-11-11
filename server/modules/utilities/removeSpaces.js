export default function removeSpaces(string, replacementCharacter) {

  // validation if user foes not provide a replacementCharacter
  if (replacementCharacter === null) {
      replacementCharacter = ''
  }

  let unspaced = []
  for (let character of string) {
      if (character == ' ') {
          unspaced.push(replacementCharacter)
      } else {
          unspaced.push(character)
      }
  }
  return unspaced.join('')
}