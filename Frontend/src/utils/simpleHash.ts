export const simpleHash = (inputString: string): string => {
  let outputString = ''

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i)
    let val = 0

    if (char >= 48 && char <= 57) {
      // Numeric (0-9)
      val = char - 48
    } else if (char >= 65 && char <= 90) {
      // Uppercase (A-Z)
      val = char - 65 + 10
    } else if (char >= 97 && char <= 122) {
      // Lowercase (a-z)
      val = char - 97 + 36
    }

    // Convert the ASCII value to a letter
    outputString += String.fromCharCode((val % 26) + 65) // We use 65 here to get capital letters. Use 97 for lowercase
  }

  return outputString
}
