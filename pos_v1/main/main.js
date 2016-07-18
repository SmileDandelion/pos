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
let buildCartItem = (inputs, allItems)=> {
    const cartItems = [];

    for (let input of inputs) {
        const splittedInput = input.split('-');
        const barcode = splittedInput[0];
        const count = parseInt(splittedInput[1] || 1);
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
