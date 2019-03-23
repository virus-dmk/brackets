module.exports = function check(str, bracketsConfig) {

  let stack = [];
  let conf = bracketsConfig;
  let isValidStr; // returned value
  let bracketsConfigMas = [];
  let openBracketsConfigMas = [];
  let closeBracketsConfigMas = [];
  let theSameOpenCloseBracketsMas = [];


  //make bracketsConfigMas str from config mas param for checking every str symb
  function makeBracketsConfigMas(conf) {
    for (let i = 0; i < conf.length; i++) {
      for (let j = 0; j < 2; j++) {
        let tempWasActiveOnce = false;
        if (!(tempWasActiveOnce === true) && conf[i][0] === conf[i][1]) {
          theSameOpenCloseBracketsMas.push(conf[i][1]);
          tempWasActiveOnce = true;
        }
        if (j === 0) { openBracketsConfigMas.push(conf[i][j]); }
        else { closeBracketsConfigMas.push(conf[i][j]); }
        bracketsConfigMas.push(conf[i][j]);
      }
    }
  }

  function checkElemsAlowed(str, bracketsConfigMas) {
    let isValid = true;
    for (let i = 0; i < str.length; i++) {
      if (bracketsConfigMas.indexOf(str[i]) === -1) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  function isAllowedStrLength(str) {
    return str.length % 2 === 0;
  }

  function isOpenBracket(elem, array) {
    return (array.indexOf(elem) !== -1);
  }

  try {

    makeBracketsConfigMas(conf);

    if (!isAllowedStrLength(str)) {
      isValidStr = false;
      return isValidStr;
    }

    if (!checkElemsAlowed(str, bracketsConfigMas)) {
      return isValidStr = false;
    }

    for (let i = 0; i < str.length; i++) {
      let isTheSame = (theSameOpenCloseBracketsMas.indexOf(str[i]) !== -1);

      if (isTheSame) {
        if (str[i] !== stack[stack.length - 1]) {
          stack.push(str[i]);
          continue;
        } else {
          stack.pop();
          continue;
        }
      }

      if (isOpenBracket(str[i], openBracketsConfigMas)) {
        stack.push(str[i]);
      } else {
        let x = bracketsConfigMas.indexOf(str[i]);
        if (str[i] === bracketsConfigMas[x] && stack[stack.length - 1] === bracketsConfigMas[x - 1]) {
          stack.pop();
        } else {
          return isValidStr = false;
        }
      }
    }
    if (stack.length === 0) {
      return isValidStr = true;
    } else {
      return isValidStr = false;
    }
  } catch (err) {
    console.log('Name: ' + err.name + 'Message: ' + err.message);
  }
};