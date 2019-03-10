var colors = ['#_111', '#111', 222, ['#_345', '#_546', '#CCC'], '#_333', '#_666'];

// 0
const lastColor = () => {
  let lastItem = colors.length - 1;

  return colors[lastItem];
};

console.log(`${lastColor()} -- last color in the array`);

// 1 proper format and throw exception on invalid
const formatColor = (hex) => {
  let tempArr = [];

  if (hex[0] !== '#') {
    // tempArr = `#${hex}`.split('');
    // throw exception
  }
  else 
    tempArr = hex.split('');

  let idx = tempArr.indexOf('_');
  if (idx) tempArr[idx] = '';

  const validColor = tempArr.join('');

  return validColor;
}

// /^#[0-9A-F]{3}$/i.test(colors[1])
// /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
var regex = new RegExp("^#[0-9A-F]{3}$", 'i');

// 2 - Validate colors and remove the invalid
let getColors = (colorsArr) => {
  let validatedColors = [];

  for (let item of colorsArr) {
    // console.log(item);
    if (typeof(item) === 'string' && item.match(regex)) validatedColors.push(item);

    if (typeof(item) !== 'object') {
      // console.log(`${item} - ${regex.test(item)}`);
      if (!regex.test(item)  && item[0] === '#') validatedColors.push(formatColor(item));
    }
    else {
      let tempCollection = [];

      for (let subItem of item) {
        // console.log(`${subItem} from subItem - ${regex.test(subItem)}`);
        if (!regex.test(subItem) || subItem.match(regex)) tempCollection.push(formatColor(subItem));
      }

      validatedColors.push(tempCollection);
    }
  }

  return validatedColors;
}

console.log('getColors(colors) - ', getColors(colors) );

// 3 JS Set Collection
const set = new Set(getColors(colors));
// console.log(set);


// 4 prototype function -> Optionaly call this with argument
// It is not mutating the collection so it has to be assigned 
Array.prototype.cleanDuplicates = function(add = [], arr = this) {
  arr = getColors(arr);

  let temp = [];
  // Check for duplicates in a sub-collection
  for (let item of arr) {
    if (typeof(item) === 'object') item.map((subItem) => temp.push(subItem));
    else temp.push(item);
  }

  if (add.length > 0)
    for (let addItem of add) temp.push(formatColor(addItem));

  let resultSet = new Set(temp);
  console.log(resultSet);

  return resultSet;
}

// 5, 6 Generate some html
// Task 7, 8 - optionally send more colors as first argument and specify an array to clean as a second argument
// in case there is no arguments specified, the function will proceed with the collection that invoked it

class ColorBox {
  constructor(htmlTagName, txtNode, color) {
    this.htmlTagName = document.createElement(htmlTagName);
    this.txtNode = document.createTextNode(txtNode);
    this.color = color;

    this.htmlTagName.id = this.color.replace('#', '');
    this.htmlTagName.appendChild(this.txtNode);
  };
};

// All the three behaviours - comment to test
let workArr = [...colors.cleanDuplicates()];
    workArr = [...colors.cleanDuplicates(['#F_00', '#_0F0'])];
  //workArr = [...colors.cleanDuplicates(['#F_00', '#_0F0'], ['#111', '#683', '#921', '#CA5'])];

let divsArray = [];

workArr.map((hex, index) => {
  divsArray.push(new ColorBox('div', `${hex}`, hex));
});

console.log('divsArray ', divsArray);

const generateMarkup = () => {
  window.addEventListener('load', function () {
    let el = '';

    divsArray.map((item) => {
      document.body.appendChild(item.htmlTagName);
      el = document.getElementById(item.color.replace('#', ''));

      //el.style.color = item.color;
      //el.style.backgroundColor = item.color;
      el.style.border = `10px solid ${item.color}`;
      el.style.margin = '5px';
      el.style.textAlign = 'center';
    });

  }, false);
};

generateMarkup();
