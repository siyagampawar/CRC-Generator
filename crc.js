
function xor(a, b) {
  let result = "";
  const n = b.length;
  for (let i = 1; i < n; i++) {
    if (a[i] === b[i]) result += "0";
    else result += "1";
  }
  return result;
}

function mod2div(dividend, divisor) {
  let pick = divisor.length;
  let tmp = dividend.substr(0, pick);
  const n = dividend.length;

  while (pick < n) {
    if (tmp[0] === "1") tmp = xor(divisor, tmp) + dividend[pick];
    else tmp = xor("0".repeat(pick), tmp) + dividend[pick];

    pick += 1;
  }

  if (tmp[0] === "1") tmp = xor(divisor, tmp);
  else tmp = xor("0".repeat(pick), tmp);

  return tmp;
}
function encodeData() {
  const dividendInput = document.getElementById("dividend");
  const divisorInput = document.getElementById("divisor");

  const dividend = dividendInput.value;
  const divisor = divisorInput.value;

  if (!dividend || !divisor) {
    // Handle case when input fields are empty
    return;
  }

  const l_key = divisor.length;
  const appended_data = dividend + "0".repeat(l_key - 1);
  const remainder = mod2div(appended_data, divisor);
  const codeword = dividend + remainder;

  document.getElementById("remainder").textContent =
    "Remainder: " + remainder;
  document.getElementById("encodedData").textContent =
    "Encoded Data (Data + Remainder): " + codeword;
}

function receiver() {
  const dataInput = document.getElementById("receivedData");
  const keyInput = document.getElementById("divisor");

  const data = dataInput.value;
  const key = keyInput.value;

  if (!data || !key) {
    // Handle case when input fields are empty
    return;
  }

  let currxor = mod2div(data.substr(0, key.length), key);
  let curr = key.length;
  while (curr !== data.length) {
    if (currxor.length !== key.length) {
      currxor += data[curr++];
    } else {
      currxor = mod2div(currxor, key);
    }
  }

  if (currxor.length === key.length) {
    currxor = mod2div(currxor, key);
  }

  if (currxor.indexOf("1") !== -1) {
    document.getElementById("result").textContent =
      "There is some error in data";
  } else {
    document.getElementById("result").textContent =
      "Correct message received";
  }
}


console.log("Sender side...");
encodeData(data, key);

console.log("\nReceiver side...");
receiver(data + mod2div(data + "0".repeat(key.length - 1), key), key);
