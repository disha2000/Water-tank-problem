const chartHeight = 400;
const chartWidth = 1300 - 90;
const leftMargin = 90;

const calculateYAxisPoints = (inputArray) => {
  const minNumber = Math.min(...inputArray);
  const maxNumber = Math.max(...inputArray);
  const intervals = [];
  intervals.push(minNumber);
  const sum = 0;

  for (let i = 1; i <= 3; i++) {
    const tickValue = (maxNumber - minNumber) / (5 - 1);
    intervals.push(intervals[i - 1] + tickValue);
  }
  intervals.push(maxNumber);

  const yPositions = [];
  for (let i = 0; i < intervals.length; i++) {
    const y = (intervals[i] - minNumber) / (maxNumber - minNumber);
    yPositions.push(y * chartHeight);
  }
  return [intervals.reverse(), yPositions];
};

const calculateXAxisPoints = (inputArray) => {
  const n = inputArray.length;
  const xSpacing = chartWidth / (n - 1);
  return inputArray.map((_, index) => leftMargin + index * xSpacing);
};

const calculateWaterLevels = (inputArray) => {
  let totalUnits = 0;
  for (let i = 1; i < inputArray.length; ) {
    const prevNumber = inputArray[i - 1];
    if (inputArray[i] == 0) {
      let j = i;
      while (inputArray[j] === 0 && j < inputArray.length) {
        j++;
      }
      const minNumber = Math.min(inputArray?.[j] || 0, prevNumber);
      let k = i;
      while (k < j) {
        inputArray[k] = minNumber;
        totalUnits = totalUnits + minNumber;
        k++;
      }
      i = j;
    } else {
      i++;
    }
  }
  return [inputArray, totalUnits];
};

const drawXAxis = (inputArray, xPositions, id) => {
  const xAxis = document.getElementById(id);
  inputArray.forEach((element, index) => {
    if (index === 0) return;

    const x = xPositions[index];
    const text = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    text.setAttribute("x", x);
    text.setAttribute("y", 420);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");
    text.textContent = element;
    xAxis.appendChild(text);
  });
};
const drawYAxis = (intervals, yPositions, id) => {
  const yAxis = document.getElementById(id);

  intervals.forEach((element, index) => {
    const y = yPositions[index];
    const text = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    const length = String(element).length + 5;
    text.setAttribute("x", 75 - length);
    text.setAttribute("y", y + 8);
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");
    text.textContent = element;
    yAxis.appendChild(text);
  });
};

const drawBars = (results, inputArray, xPositions, id, level = false) => {
  const data = document.getElementById(id);
  const barWidth = Math.min(70, (chartWidth / (results.length - 1)) * 0.8);

  const maxValue = Math.max(...inputArray);

  results.forEach((value, index) => {
    if (index === 0) return;

    const barHeight = (value / maxValue) * chartHeight;
    const barY = chartHeight - barHeight;
    const barX = xPositions[index] - barWidth / 2;

    const rect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect.setAttribute("x", barX);
    rect.setAttribute("y", barY);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute(
      "fill",
      inputArray[index] === 0 && !level ? "yellow" : "lightblue"
    );
    if (level && inputArray[index] != 0) {
      return;
    }
    data.appendChild(rect);
  });
};
const showResults = () => {
  document.getElementById("y-labels").innerHTML = "";
  document.getElementById("x-labels").innerHTML = "";
  document.getElementById("data").innerHTML = "";
  document.getElementById("y-labels1").innerHTML = "";
  document.getElementById("x-labels1").innerHTML = "";
  document.getElementById("data1").innerHTML = "";

  let inputArray = document
    .getElementById("inputArray")
    .value.trim()
    .split(",");
  inputArray = inputArray.map((input) => parseInt(input));
  inputArray = [0, ...inputArray];

  const [intervals, yPositions] = calculateYAxisPoints(inputArray);

  drawYAxis(intervals, yPositions, "y-labels");
  drawYAxis(intervals, yPositions, "y-labels1");

  const xPositions = calculateXAxisPoints(inputArray);

  drawXAxis(inputArray, xPositions, "x-labels");
  drawXAxis(inputArray, xPositions, "x-labels1");

  const [results, totalUnits] = calculateWaterLevels([...inputArray]);
  console.log(totalUnits);
  drawBars(results, inputArray, xPositions, "data");
  drawBars(results, inputArray, xPositions, "data1", true);
  document.getElementById("totalunits").innerHTML = "Total units " + totalUnits
};
