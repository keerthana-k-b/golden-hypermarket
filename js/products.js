// Dummy Data Store for Golden Hypermarket Pala
const productsData = {
  categories: [
    { id: 'grocery', name: 'Grocery', nameMl: 'പലചരക്ക്', image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=300&q=80' },
    { id: 'fresh-produce', name: 'Fruits & Veg', nameMl: 'പഴം & പച്ചക്കറി', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=300&q=80' },
    { id: 'meat-fish', name: 'Meat & Fish', nameMl: 'ഇറച്ചി & മീൻ', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=300&q=80' },
    { id: 'dairy', name: 'Dairy', nameMl: 'പാൽ & നെയ്യ്', image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80' },
    { id: 'bakery', name: 'Bakery', nameMl: 'ബേക്കറി പലഹാരങ്ങൾ', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' },
    { id: 'household', name: 'Household', nameMl: 'ക്ലീനിംഗ് & സാധനങ്ങൾ', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80' },
    { id: 'snacks', name: 'Snacks', nameMl: 'ചിപ്സ് & ലഘുഭക്ഷണം', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80' },
    { id: 'beverages', name: 'Beverages', nameMl: 'ചായ, കാപ്പി & ജ്യൂസ്', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80' },
    { id: 'electronics', name: 'Electronics', nameMl: 'മിക്സി & ഉപകരണങ്ങൾ', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80' },
    { id: 'fashion', name: 'Fashion', nameMl: 'വസ്ത്രങ്ങൾ & അപ്പാരൽസ്', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80' }
  ],

  // 1. Weekly Deals Carousel (8 items)
  weeklyDeals: [
    {
      id: 1,
      name: 'Pavizham Jaya Rice Premium Bag',
      weight: '10 kg Pack',
      price: 469,
      oldPrice: 560,
      discount: '16% OFF',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
      badge: 'WEEKEND DEAL'
    },
    {
      id: 2,
      name: 'Kera Drops 100% Pure Coconut Oil',
      weight: '1 Litre Bottle',
      price: 219,
      oldPrice: 280,
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      badge: 'TOP OFFER'
    },
    {
      id: 3,
      name: 'Kitchen Treasures Kashmiri Chilli Powder',
      weight: '500g Pack',
      price: 180,
      oldPrice: 240,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=400&q=80',
      badge: 'SAVE ₹60'
    },
    {
      id: 4,
      name: 'Malanadu Pure High Range Cow Ghee',
      weight: '500 ml Jar',
      price: 329,
      oldPrice: 400,
      discount: '18% OFF',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
      badge: 'HOT DEAL'
    },
    {
      id: 5,
      name: 'Double Horse Roasted White Puttu Podi',
      weight: '1 kg Pack',
      price: 69,
      oldPrice: 99,
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
      badge: 'BUY 1 GET 1'
    },
    {
      id: 6,
      name: 'India Gate Select Basmati / Biryani Rice',
      weight: '5 kg Bag',
      price: 499,
      oldPrice: 650,
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80',
      badge: 'MEGA SAVER'
    },
    {
      id: 7,
      name: 'Milky Mist Paneer Fresh Block',
      weight: '400g Pack',
      price: 165,
      oldPrice: 210,
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
      badge: 'FRESH DAIRY'
    },
    {
      id: 8,
      name: 'Delicious Crispy Chicken Nuggets Box',
      weight: '1 kg Family Pack',
      price: 349,
      oldPrice: 450,
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
      badge: 'SPECIAL'
    }
  ],

  // 2. Fresh Fruits & Vegetables Carousel (8 items)
  freshProduce: [
    {
      id: 101,
      name: 'Fresh Farm Coconut (നാടൻ നാളികേരം)',
      weight: 'Per Kg (approx 2-3 pcs)',
      price: 63,
      oldPrice: 75,
      discount: '16% OFF',
      image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=400&q=80',
      badge: 'FARM DIRECT'
    },
    {
      id: 102,
      name: 'Tender Ash Gourd (നാടൻ കുമ്പളങ്ങ)',
      weight: 'Per Kg',
      price: 20,
      oldPrice: 32,
      discount: '37% OFF',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80',
      badge: 'DAILY HARVEST'
    },
    {
      id: 103,
      name: 'Fresh Crisp Salad Cucumber (വെള്ളരി)',
      weight: 'Per Kg',
      price: 35,
      oldPrice: 48,
      discount: '27% OFF',
      image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=400&q=80',
      badge: 'CRISP & FRESH'
    },
    {
      id: 104,
      name: 'Sweet Ruby Watermelon Kiran',
      weight: 'Per Kg (Whole Fruit)',
      price: 25,
      oldPrice: 40,
      discount: '38% OFF',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
      badge: 'SWEET & JUICY'
    },
    {
      id: 105,
      name: 'Farm Fresh Organic Beetroot',
      weight: '500g Pack',
      price: 33,
      oldPrice: 45,
      discount: '27% OFF',
      image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=400&q=80',
      badge: 'VAGAMON FARM'
    },
    {
      id: 106,
      name: 'Ripe Nendran Banana (ഏത്തപ്പഴം)',
      weight: 'Per Kg (Pala Local)',
      price: 52,
      oldPrice: 68,
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
      badge: 'PALA MEENACHIL'
    },
    {
      id: 107,
      name: 'Fresh Farm Potatoes (ഉരുളക്കിഴങ്ങ്)',
      weight: '1 kg Pack',
      price: 33,
      oldPrice: 42,
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
      badge: 'BESTSELLER'
    },
    {
      id: 108,
      name: 'Fresh Nagpur Seedless Sweet Oranges',
      weight: '1 kg Pack',
      price: 85,
      oldPrice: 120,
      discount: '29% OFF',
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80',
      badge: 'VITAMIN C'
    }
  ],

  // 3. Kerala Special Staples Carousel (8 items)
  keralaStaples: [
    {
      id: 201,
      name: 'Nirmal Vadi Kerala Matta Rice',
      weight: '5 kg Bag',
      price: 275,
      oldPrice: 340,
      discount: '19% OFF',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
      badge: 'AUTHENTIC MATTA'
    },
    {
      id: 202,
      name: 'Eastern Special Kashmiri Chilli Powder',
      weight: '500g Pack',
      price: 165,
      oldPrice: 215,
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
      badge: 'SUPER SAVER'
    },
    {
      id: 203,
      name: 'Eastea Special Dust Tea (Highland Blend)',
      weight: '500g Pack',
      price: 199,
      oldPrice: 250,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
      badge: 'AROMATIC'
    },
    {
      id: 204,
      name: 'Double Horse Appam & Idiyappam Podi',
      weight: '1 kg Pack',
      price: 78,
      oldPrice: 105,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      badge: 'BREAKFAST HIT'
    },
    {
      id: 205,
      name: 'Gold Winner Pure Sunflower Cooking Oil',
      weight: '1 Litre Pouch',
      price: 145,
      oldPrice: 185,
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
      badge: 'HEART HEALTHY'
    },
    {
      id: 206,
      name: 'Peringome Organic Jaggery (നാടൻ ശർക്കര)',
      weight: '1 kg Block',
      price: 95,
      oldPrice: 130,
      discount: '27% OFF',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
      badge: 'PURE & UNREFINED'
    },
    {
      id: 207,
      name: 'Brahmins Sambar Powder Traditional Mix',
      weight: '250g Box',
      price: 68,
      oldPrice: 85,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=400&q=80',
      badge: 'KERALA TASTE'
    },
    {
      id: 208,
      name: 'Kerala Banana Chips in Pure Coconut Oil',
      weight: '400g Pouch',
      price: 155,
      oldPrice: 200,
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
      badge: 'LOCAL FAVOURITE'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = productsData;
}
