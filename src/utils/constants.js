const groups = [
  {
    id : 1,
    name : 'Группа 1',
    count : 99,
    isDefault : true,
    isUpdatingEnabled : true,
    updateFrequency : 1
},
{
    id : 2,
    name : 'Группа 2',
    count : 55,
    isDefault : false,
    isUpdatingEnabled : true,
    updateFrequency : 2
},
{
  id : 3,
  name : 'Группа 3',
  count : 4,
  isDefault : true,
  isUpdatingEnabled : false,
  updateFrequency : 4
},
{
  id : 4,
  name : 'Группа 4',
  count : 3,
  isDefault : true,
  isUpdatingEnabled : true,
  updateFrequency : 2
},
{
  id : 5,
  name : 'Группа 5',
  count : 95,
  isDefault : false,
  isUpdatingEnabled : false,
  updateFrequency : 1
},
{
id : 6,
name : 'Группа 6',
count : 49,
isDefault : true,
isUpdatingEnabled : false,
updateFrequency : 5
},
{
id : 7,
name : 'Группа 7',
count : 7,
isDefault : true,
isUpdatingEnabled : false,
updateFrequency : 1
},
{
  id : 8,
  name : 'Группа 8',
  count : 3,
  isDefault : false,
  isUpdatingEnabled : true,
  updateFrequency : 3
},
]

const productsList = [
  {
      id: 123,
      name: 'Колбаса докторская 1 кг',
      basePrice: 299.00,
      groupId: 2,
      groupName: 'Продукты 2',
      categoryId: 23,
      categoryName: 'Мясные продукты',
      productUrls : [
              {
                  id : 76,
                  url : 'https://lavka.yandex.ru/213/category/wurst_all/varenaya_kolbasa/goods/98cb5fecc0eb4e24896fb05660e73f3d000200010001',
                  price : 309.00,
                  discount : 33,
                  inStock : true,
                  lastCheck : 1653248625,
                  regionName : 'Москва',
                  parsingErrors : false,
                  vendorCode : '123e4567-e89b',
                  imgUrl : 'https://cs9.pikabu.ru/post_img/2016/11/26/11/1480184708144619212.jpg'
              }
          ]
  },
  {
      id: 321,
      name: 'Колбаса молочная 1 кг',
      basePrice: 400.00,
      groupId: 2,
      groupName: 'Продукты 2',
      categoryId: 23,
      categoryName: 'Мясные продукты',
      productUrls : [
              {
                  id : 12,
                  url : 'https://remit.ru/catalog/kolbasy/varenye-kolbasy/kolbasa-molochnaya-gost-v-belkovoy-obolochke/',
                  price : 309.00,
                  discount : 20,
                  inStock : false,
                  lastCheck : 7777777,
                  regionName : 'Суздаль',
                  parsingErrors : true,
                  vendorCode : '72376',
                  imgUrl : 'https://ratimir.ru/storage/app/uploads/public/5cd/25e/798/5cd25e798d915040955887.jpg'
              },
              {
                id : 13,
                url : 'https://remit.ru/catalog/kolbasy/varenye-kolbasy/kolbasa-molochnaya-gost-v-belkovoy-obolochke/',
                price : 309.00,
                discount : 20,
                inStock : false,
                lastCheck : 7777777,
                regionName : 'Суздаль',
                parsingErrors : false,
                vendorCode : '72376',
                imgUrl : 'https://remit.ru/upload/iblock/aaf/1yqpj9av4qmidzjk167etm7lq1iv0ki1/72376s1.jpg'
            }
          ]
  },
  {
    id: 66,
    name: 'Печенье юбилейное',
    basePrice: 39.00,
    groupId: 3,
    groupName: 'Продукты 3',
    categoryId: 23,
    categoryName: 'Сладости и снеки',
    productUrls : [
            {
                id : 74,
                url : 'https://market.yandex.ru/product--pechene-iubileinoe-traditsionnoe-vitaminizirovannoe-403g-1-sht/101792414613?cpc=2gEyWPR4TtyR2ZqFxBLXEHi8K9eZQVNYi9kUqmillKuoFgfK5VLjAALwen7k1kVVJfBMTvAO6XllgoeDw1XD64ysNGs5BDdsvvmdssQ2fdYGvrP0XrR9L0upkHRfO84ErVZkYyo5Ot2v4YpXcgqR2KzIo0sTj3ym4qXZ6Ej-MNaLSqs69ODUBb60EmGNqN2M&sku=101792414613&from=premiumOffers&from-show-uid=16587465947802666732700001&do-waremd5=yrlUIA0lGTemO-VWCUAloA&sponsored=1',
                price : 39.00,
                discount : 45,
                inStock : true,
                lastCheck : 7775,
                regionName : 'Москва',
                parsingErrors : '???',
                vendorCode : '123e4567-e89b',
                imgUrl : 'https://avatars.mds.yandex.net/get-marketpic/4967514/pic0377940de60c03db647d68fc45aaa52f/orig'
            },
            {
              id : 75,
              url : 'https://market.yandex.ru/product--pechene-iubileinoe-traditsionnoe-vitaminizirovannoe-403g-1-sht/101792414613?cpc=2gEyWPR4TtyR2ZqFxBLXEHi8K9eZQVNYi9kUqmillKuoFgfK5VLjAALwen7k1kVVJfBMTvAO6XllgoeDw1XD64ysNGs5BDdsvvmdssQ2fdYGvrP0XrR9L0upkHRfO84ErVZkYyo5Ot2v4YpXcgqR2KzIo0sTj3ym4qXZ6Ej-MNaLSqs69ODUBb60EmGNqN2M&sku=101792414613&from=premiumOffers&from-show-uid=16587465947802666732700001&do-waremd5=yrlUIA0lGTemO-VWCUAloA&sponsored=1',
              price : 39.00,
              discount : 45,
              inStock : true,
              lastCheck : 7775,
              regionName : 'Москва',
              parsingErrors : false,
              vendorCode : '123e4567-e89b',
              imgUrl : 'https://avatars.mds.yandex.net/get-marketpic/4967514/pic0377940de60c03db647d68fc45aaa52f/orig'
          },
          {
            id : 78,
            url : 'https://market.yandex.ru/product--pechene-iubileinoe-traditsionnoe-vitaminizirovannoe-403g-1-sht/101792414613?cpc=2gEyWPR4TtyR2ZqFxBLXEHi8K9eZQVNYi9kUqmillKuoFgfK5VLjAALwen7k1kVVJfBMTvAO6XllgoeDw1XD64ysNGs5BDdsvvmdssQ2fdYGvrP0XrR9L0upkHRfO84ErVZkYyo5Ot2v4YpXcgqR2KzIo0sTj3ym4qXZ6Ej-MNaLSqs69ODUBb60EmGNqN2M&sku=101792414613&from=premiumOffers&from-show-uid=16587465947802666732700001&do-waremd5=yrlUIA0lGTemO-VWCUAloA&sponsored=1',
            price : 39.00,
            discount : 45,
            inStock : true,
            lastCheck : 7775,
            regionName : 'Москва',
            parsingErrors : true,
            vendorCode : '123e4567-e89b',
            imgUrl : 'https://avatars.mds.yandex.net/get-marketpic/4967514/pic0377940de60c03db647d68fc45aaa52f/orig'
        }
        ]
},
{
    id: 77,
    name: 'Творог Простоквашино',
    basePrice: 67.00,
    groupId: 5,
    groupName: 'Продукты 5',
    categoryId: 67,
    categoryName: 'Молочные продукты',
    productUrls : [
            {
                id : 56,
                url : 'https://www.perekrestok.ru/cat/373/p/tvorog-prostokvasino-5-200g-4121613',
                price : 309.00,
                discount : 20,
                inStock : false,
                lastCheck : 7777777,
                regionName : 'Суздаль',
                parsingErrors : false,
                vendorCode : '72376',
                imgUrl : 'https://cdn-img.perekrestok.ru/i/1600x1600-fit/xdelivery/files/d7/8b/31c4c0166062f48e3d2c705c358a.jpg'
            },
            {
              id : 57,
              url : 'https://www.perekrestok.ru/cat/373/p/tvorog-prostokvasino-5-200g-4121613',
              price : 309.00,
              discount : 20,
              inStock : false,
              lastCheck : 7777777,
              regionName : 'Суздаль',
              parsingErrors : false,
              vendorCode : '72376',
              imgUrl : 'https://cdn-img.perekrestok.ru/i/1600x1600-fit/xdelivery/files/d7/8b/31c4c0166062f48e3d2c705c358a.jpg'
          },
          {
            id : 58,
            url : 'https://www.perekrestok.ru/cat/373/p/tvorog-prostokvasino-5-200g-4121613',
            price : 309.00,
            discount : 20,
            inStock : false,
            lastCheck : 7777777,
            regionName : 'Суздаль',
            parsingErrors : false,
            vendorCode : '72376',
            imgUrl : 'https://cdn-img.perekrestok.ru/i/1600x1600-fit/xdelivery/files/d7/8b/31c4c0166062f48e3d2c705c358a.jpg'
        }
        ]
},
]

export { groups, productsList }