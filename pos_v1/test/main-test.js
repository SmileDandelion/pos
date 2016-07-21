'use strict';

describe('pos', () => {
  let inputs;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
  // it('splitItem should print correct result', ()=> {
  //   let spectResult = [
  //     {
  //       item: {
  //         barcode: 'ITEM000001',
  //         name: '雪碧',
  //         unit: '瓶',
  //         price: 3.00
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000001',
  //         name: '雪碧',
  //         unit: '瓶',
  //         price: 3.00
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000001',
  //         name: '雪碧',
  //         unit: '瓶',
  //         price: 3.00
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000001',
  //         name: '雪碧',
  //         unit: '瓶',
  //         price: 3.00
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000001',
  //         name: '雪碧',
  //         unit: '瓶',
  //         price: 3.00
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000003',
  //         name: '荔枝',
  //         unit: '斤',
  //         price: 15.00
  //       },
  //       count: 2
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000005',
  //         name: '方便面',
  //         unit: '袋',
  //         price: 4.50
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000005',
  //         name: '方便面',
  //         unit: '袋',
  //         price: 4.50
  //       },
  //       count: 1
  //     },
  //     {
  //       item: {
  //         barcode: 'ITEM000005',
  //         name: '方便面',
  //         unit: '袋',
  //         price: 4.50
  //       },
  //       count: 1
  //     }];
  //   let testResult = splitItem(inputs);
  //   expect(testResult).toEqual(spectResult);
  // });
  it('buildCartItems should print correct result', ()=> {
    // let inputs = [
    //   {
    //     item: {
    //       barcode: 'ITEM000001',
    //       name: '雪碧',
    //       unit: '瓶',
    //       price: 3.00
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000001',
    //       name: '雪碧',
    //       unit: '瓶',
    //       price: 3.00
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000001',
    //       name: '雪碧',
    //       unit: '瓶',
    //       price: 3.00
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000001',
    //       name: '雪碧',
    //       unit: '瓶',
    //       price: 3.00
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000001',
    //       name: '雪碧',
    //       unit: '瓶',
    //       price: 3.00
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000003',
    //       name: '荔枝',
    //       unit: '斤',
    //       price: 15.00
    //     },
    //     count: 2
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000005',
    //       name: '方便面',
    //       unit: '袋',
    //       price: 4.50
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000005',
    //       name: '方便面',
    //       unit: '袋',
    //       price: 4.50
    //     },
    //     count: 1
    //   },
    //   {
    //     item: {
    //       barcode: 'ITEM000005',
    //       name: '方便面',
    //       unit: '袋',
    //       price: 4.50
    //     },
    //     count: 1
    //   }];
    let spectResult = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }];
    // let testResult = groupItem(inputs);
    let allItems = loadAllItems();
    let testResult = buildCartItems(inputs, allItems);
    expect(testResult).toEqual(spectResult);
  });
  it('buildReceiptItems should print correct result', ()=> {
    let inputs = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }];
    let spectResult = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3,
        subtotal: 12
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        saved: 0,
        subtotal: 30
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        },
        saved: 4.5,
        subtotal: 9
      }
    ];
    let promotions = loadPromotions();
    let testResult = buildReceiptItems(inputs, promotions);
    expect(testResult).toEqual(spectResult);
  });
  it('buildReceipt  should print correct result', ()=> {
    let inputs = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3,
        subtotal: 12
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        saved: 0,
        subtotal: 30
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        },
        saved: 4.5,
        subtotal: 9
      }];
    let expectResult = {
      receiptItems: [{
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3,
        subtotal: 12
      },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          saved: 0,
          subtotal: 30
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          saved: 4.5,
          subtotal: 9
        }],
      total: 51,
      savedtotal: 7.5
    };
    let testResult = buildReceipt(inputs);
    expect(testResult).toEqual(expectResult);
  });

  it('buildReceiptText should print correct result', ()=> {
    let inputs = {
      receiptItems: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          saved: 3,
          subtotal: 12
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          saved: 0,
          subtotal: 30
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          saved: 4.5,
          subtotal: 9
        }],
      total: 51,
      savedtotal: 7.5
    };
    let expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
    let testResult = buildReceiptText(inputs);
    expect(testResult).toEqual(expectText);
  });
});
