function getSignAndErase(number)
	{
		if (number[0] == '-')
		{
			return [false, number.substring(1,number.length)];
		}
		if (number[0] == '+')
		{
			return [true, number.substring(1,number.length)];
		}
		return [true, number];
	}

module.exports = function multiply(first, second) {
    var numberTemplate = /^[\+,\-]?\d+$/;
    if (!numberTemplate.test(first) || !numberTemplate.test(second))
        return NaN;
    var sign = getSignAndErase(first)[0] ^ getSignAndErase(second)[0];
    first = getSignAndErase(first)[1];
    second = getSignAndErase(second)[1];
    var result = new Array(first.length + second.length + 1).join('0');
    var firstCounter = 0;
    while (first != "") {
        var firstDigit = parseInt(first[first.length - 1]);
        first = first.substring(0, first.length - 1);
        var secondCopy = second;
        var digitFromPreviousMultiply = 0;
        var secondCounter = 0;
        while (secondCopy != "") {
            var secondDigit = parseInt(secondCopy[secondCopy.length - 1]);
            secondCopy = secondCopy.substring(0, secondCopy.length - 1);
            var multiplyRes = secondDigit * firstDigit;
            var digitRes = parseInt(result[secondCounter + firstCounter]) + (multiplyRes % 10) + digitFromPreviousMultiply;
            digitFromPreviousMultiply = Math.floor(multiplyRes /10) + Math.floor(digitRes / 10);
            var digitResString = digitRes.toString();
            result = result.substr(0, secondCounter + firstCounter) + (digitRes % 10).toString() + result.substr(secondCounter + firstCounter + 1, result.length - secondCounter - firstCounter);
            secondCounter++;
        }
        result = result.substr(0, secondCounter + firstCounter) + digitFromPreviousMultiply.toString() + result.substr(secondCounter + firstCounter + 1, result.length - secondCounter - firstCounter);
        firstCounter++;
    }
    result = result.split("").reverse().join("");
    while (result[0] == '0')
        result = result.substring(1, result.length);
    if (sign)
        result = '-' + result;
    return result;
}
