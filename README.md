
**Problem Statement**:- 
Given `n` is always greater than -1, representing the block height. Now compute
the units of water stored in-between the blocks. Build a Web Application
(Frontend Solution) using Vanilla JavaScript and HTML/CSS to represent the
solution.

Solution: Used SVG to draw the charts 

below is the main logic to calculate the water levels

```

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
```

**Ouput Results **: 
![image](https://github.com/user-attachments/assets/8ab1ad49-bf89-47d2-a590-2edeab07b8b2)

![image](https://github.com/user-attachments/assets/0b1ac99c-cca1-4d25-a118-d9af69d099af)

