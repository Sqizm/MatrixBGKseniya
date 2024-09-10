document.getElementById('calculate').addEventListener('click', function() {
    const day = parseInt(document.getElementById('day').value, 10);
    const month = parseInt(document.getElementById('month').value, 10);
    const year = parseInt(document.getElementById('year').value, 10);

    // Проверка на введенные числа
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        const modal = document.getElementById("myModal");
        modal.style.display = 'block';

        const span = document.getElementsByClassName("close")[0];
        span.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        return; // Останавливаем выполнение функции, если не введены числа
    }

    function displayWarning(elementId) {
        const element = document.getElementById(elementId);
        element.style.display = 'block';

        const span = document.getElementsByClassName("close")[0];
        span.addEventListener("click", function() {
            element.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target == element) {
                element.style.display = "none";
            }
        });
    }

    if (!Number.isInteger(day) || day < 1 || day > 31) {
        displayWarning("isDay");
        return;
    }

    if (!Number.isInteger(month) || month < 1 || month > 12) {
        displayWarning("isMonth");
        return;
    }

    if (!Number.isInteger(year) || year < 1900 || year > 2100) {
        displayWarning("isYear");
        return;
    }

    // Выводим дату рождения.
    document.getElementById('data').textContent = `${day}.${month}.${year}`;

    // 1. Считаем первое дополнительное число
    const firstNumber = sumOfDigits(day) + sumOfDigits(month) + sumOfDigits(year);
    document.getElementById('first-number').textContent = firstNumber;

    // 2. Считаем второе дополнительное число
    const secondNumber = sumOfDigits(firstNumber);
    document.getElementById('second-number').textContent = secondNumber;

    // 3. Считаем третье дополнительное число
    const firstDigit = parseInt(String(day)[0]) || parseInt(String(day)[1]); // Первая цифра дня
    const thirdNumber = firstNumber - (2 * firstDigit);
    document.getElementById('third-number').textContent = thirdNumber;

    // 4. Считаем четвертое дополнительное число
    const fourthNumber = sumOfDigits(thirdNumber);
    document.getElementById('fourth-number').textContent = fourthNumber;

    // Считаем число судьбы
    const destinyNumber = getSingleDigitNumber(firstNumber);
//    const destinyNumber = getSingleDigitNumber(day + month + year);
    document.getElementById('destiny').textContent = destinyNumber;

    // Собираем все необходимые числа
    const allNumbers = [day, month, year, firstNumber, secondNumber, thirdNumber, fourthNumber];

    // Считаем количество вхождений числа 1,2,3,4,5,6,7,8,9
    const occurrencesOfOne = getOccurrencesOfDigit(allNumbers, 1);
    const occurrencesOfTwo = getOccurrencesOfDigit(allNumbers, 2);
    const occurrencesOfThree = getOccurrencesOfDigit(allNumbers, 3);
    const occurrencesOfFour = getOccurrencesOfDigit(allNumbers, 4);
    const occurrencesOfFive = getOccurrencesOfDigit(allNumbers, 5);
    const occurrencesOfSix = getOccurrencesOfDigit(allNumbers, 6);
    const occurrencesOfSeven = getOccurrencesOfDigit(allNumbers, 7);
    const occurrencesOfEight = getOccurrencesOfDigit(allNumbers, 8);
    const occurrencesOfNine = getOccurrencesOfDigit(allNumbers, 9);

    // Заполняем ячейки
    document.getElementById('character-cell').textContent = occurrencesOfOne ? '1'.repeat(occurrencesOfOne) : 'Пусто';
    document.getElementById('energy-cell').textContent = occurrencesOfTwo ? '2'.repeat(occurrencesOfTwo) : 'Пусто';
    document.getElementById('interest-cell').textContent = occurrencesOfThree ? '3'.repeat(occurrencesOfThree) : 'Пусто';
    document.getElementById('health-cell').textContent = occurrencesOfFour ? '4'.repeat(occurrencesOfFour) : 'Пусто';
    document.getElementById('logic-cell').textContent = occurrencesOfFive ? '5'.repeat(occurrencesOfFive) : 'Пусто';
    document.getElementById('labor-cell').textContent = occurrencesOfSix ? '6'.repeat(occurrencesOfSix) : 'Пусто';
    document.getElementById('luck-cell').textContent = occurrencesOfSeven ? '7'.repeat(occurrencesOfSeven) : 'Пусто';
    document.getElementById('duty-cell').textContent = occurrencesOfEight ? '8'.repeat(occurrencesOfEight) : 'Пусто';
    document.getElementById('memory-cell').textContent = occurrencesOfNine ? '9'.repeat(occurrencesOfNine) : 'Пусто';

    // Расчет темпераметра
    const getInterest = occurrencesOfThree ? '3'.repeat(occurrencesOfThree) : '';
    const getLogic = occurrencesOfFive ? '5'.repeat(occurrencesOfFive) : '';
    const getLuck = occurrencesOfSeven ? '7'.repeat(occurrencesOfSeven) : '';
    const getTemperament = getInterest.length + getLogic.length + getLuck.length;
    document.getElementById('temperament-cell').textContent = getTemperament;

    // Расчет целеустремленности
    const getCharacter = occurrencesOfOne ? '1'.repeat(occurrencesOfOne) : '';
    const getHealth = occurrencesOfFour ? '4'.repeat(occurrencesOfFour) : '';
    const getPurposefulness = getCharacter.length + getHealth.length + getLuck.length;
    document.getElementById('purposefulness-cell').textContent = getPurposefulness;

    // Расчет быта
    const getLabor = occurrencesOfSix ? '6'.repeat(occurrencesOfSix) : '';
    const getEverydayLife = getHealth.length + getLogic.length + getLabor.length;
    document.getElementById('everydayLife-cell').textContent = getEverydayLife;

    // Расчет семьи
    const getEnergy = occurrencesOfTwo ? '2'.repeat(occurrencesOfTwo) : '';
    const getDuty = occurrencesOfEight ? '8'.repeat(occurrencesOfEight) : '';
    const getFamily = getEnergy.length + getLogic.length + getDuty.length;
    document.getElementById('family-cell').textContent = getFamily;

    // Расчёт стабильности
    const getMemory = occurrencesOfNine ? '9'.repeat(occurrencesOfNine) : '';
    const getStable = getInterest.length + getLabor.length + getMemory.length;
    document.getElementById('stable-cell').textContent = getStable;

    // Расчёт матрицы в строку
    document.getElementById('matrix-inline').textContent = `${getCharacter}/${getEnergy}/${getInterest}/${getHealth}/${getLogic}/${getLabor}/${getLuck}/${getDuty}/${getMemory}; ЧС:${destinyNumber} Б:${getEverydayLife} Т:${getTemperament} Ц:${getPurposefulness} С:${getFamily} П:${getStable}`;
});

// Функция для подсчета суммы цифр числа
function sumOfDigits(num) {
    return String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

// Функция для подсчёта числа судьбы
function getSingleDigitNumber(num) {
  // Если число меньше 10, то возвращаем его как есть
  if (num < 10) {
    return num;
  }

  // Если число равно 11, то возвращаем его как есть
  if (num === 11) {
    return 11;
  }

  // Иначе продолжаем вычислять сумму цифр, пока не получим односимвольное число
  let result = num;
  while (result >= 10 && result !== 11) {
    result = sumOfDigits(result);
  }

  return result;
}

function getOccurrencesOfDigit(numbers, digit) {
    let occurrences = 0;
    const digitStr = digit.toString(); // Преобразуем цифру в строку один раз

    for (let num of numbers) {
        const numStr = num.toString(); // Преобразуем число в строку
        for (let i = 0; i < numStr.length; i++) {
            if (numStr[i] === digitStr) {
                occurrences++;
            }
        }
    }
    return occurrences;
}