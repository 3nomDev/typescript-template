const flip = (char) => char === '0' ? '1' : '0'

const getFlipWithStartingCharacter = (str, expected) => {
    let flipCount =  0;
    for (let i = 0; i < str.length;  i++  ) {
            if (str.charAt(i) !== expected) {
                flipCount++
            }
        expected = flip(expected)

    }
    return flipCount
}




let str = "0001010111";
