'use strict';
/*
 function itemExist(input, groupInput) {
 let flag = 0;
 groupInput.forEach((element)=> {
 if (input.item.barcode === element.item.barcode) {
 flag = 1;
 element.count++;
 }
 });
 if (flag === 0) {
 groupInput.push(input);
 }
 return groupInput;
 }

 function groupItem(splitedInput) {
 let groupInput = [];
 splitedInput.forEach((input)=> {
 groupInput = itemExist(input, groupInput);

 });
 return groupInput;
 }
 function printReceipt(inputs) {
 let splitedInput = splitItem(inputs);
 let groupInput = groupItem(splitedInput);
 }

 function isExist(input, allItem) {
 let newItem = {};
 for (let i = 0; i < allItem.length; i++) {
 if (input === allItem[i].barcode) {
 newItem.item = allItem[i];
 newItem.count = 1;
 }
 else if (input.split('-')[0] === allItem[i].barcode) {
 newItem.item = allItem[i];
 newItem.count = parseInt(input.split('-')[1]);
 }
 }

 return newItem;
 }

 let splitItem = (inputs)=> {
 let allItem = loadAllItems();
 let splitedInput = [];
 inputs.forEach((input)=> {
 let newItem = isExist(input, allItem);
 if (newItem.item) {
 splitedInput.push(newItem);
 }
 });

 return splitedInput;
 };
 */
//es6 代码如下
let buildCartItems = (inputs, allItems)=> {
  const cartItems = [];

  for (let input of inputs) {
    const splittedInput = input.split('-');
    const barcode = splittedInput[0];
    const count = parseFloat(splittedInput[1] || 1);
    const cartItem = cartItems.find((cartItem)=>cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count++;
    } else {
      const item = allItems.find((item)=>item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
};

/*let buildReceiptItems = (inputs, promotions)=> {
 let getSubInput = [];
 for (let input of inputs) {
 let promotion = promotions.find((promotion)=>promotion.barcodes.find((barcode)=>barcode === input.item.barcode))

 if (promotion && promotion.type === 'BUY_TWO_GET_ONE_FREE') {
 let freeCount = parseInt(input.count / 3);
 getSubInput.push({
 cartItem: input,
 saved: freeCount * input.item.price,
 subtotal: (input.count - freeCount) * input.item.price
 });
 } else {
 getSubInput.push({cartItem: input, save: 0, subtotal: input.count * input.item.price});
 }
 }

 return getSubInput;
 };*/
//es6 代码如下


let buildReceiptItems = (cartItems, promotions)=> {
  return cartItems.map((cartItem)=> {
    let promotionType = getpromotionType(cartItem.item.barcode, promotions);
    let {subtotal, saved} = discount(cartItem, promotionType);
    return {cartItem, subtotal, saved};
  })
};
let getpromotionType = (barcode, promotions)=> {
  let promotion = promotions.find((promotion)=>promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : 0;
};

let discount = (cartItem, promotionType)=> {
  let freeItemCount = 0;
  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    freeItemCount = parseInt(cartItem.count / 3);
  }
  let saved = cartItem.item.price * freeItemCount;
  let subtotal = cartItem.item.price * cartItem.count - saved;
  return {subtotal, saved};
};


let buildReceipt = (receiptItems)=> {
  let total = 0;
  let savedtotal = 0;
  for (let cartItem of receiptItems) {
    total += cartItem.subtotal;
    savedtotal += cartItem.saved;
  }
  return {receiptItems, total, savedtotal};
};

/*let buildReceiptText = (inputs)=> {
 let result = '***<没钱赚商店>收据***' + '\n';
 let allPrice = inputs.total;
 let allSave = inputs.saveTotal;
 for (let input of inputs.receiptItems) {
 result += `名称：${input.cartItem.item.name}，数量：${input.cartItem.count}${input.cartItem.item.unit }，单价：${input.cartItem.item.price.toFixed(2)}(元)，小计：${input.subtotal.toFixed(2)}(元)` + '\n';
 }
 result = result + '----------------------' + '\n' +
 '总计：' + allPrice.toFixed(2) + '(元)' + '\n' +
 '节省：' + allSave.toFixed(2) + '(元)' + '\n' +
 '**********************';
 return result;
 };*/
let buildReceiptText = (receipt)=> {
  let receiptItemsText = receipt.receiptItems.map(receiptItem=> {
    let cartItem = receiptItem.cartItem;
    return `名称：${cartItem.item.name}，数量：${cartItem.count}${cartItem.item.unit}，单价：${formatMoney(cartItem.item.price)}(元)，小计：${formatMoney(receiptItem.subtotal)}(元)`;
  }).join('\n');
  return `***<没钱赚商店>收据***
${receiptItemsText}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.savedtotal)}(元)
**********************`;
};

let formatMoney = (money)=> {
  return money.toFixed(2);
};

let printReceipt = (inputs)=> {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let cartItems = buildCartItems(inputs, allItems);
  let receiptItems = buildReceiptItems(cartItems, promotions);
  let receipt = buildReceipt(receiptItems);
  let receiptText = buildReceiptText(receipt);
  console.log(receiptText);
};

