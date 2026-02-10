// ============================================
// PageTurner Books - Orders Database
// ============================================
// 15 Orders (O1001-O1015), INR (₹) Currency
// Statuses: Shipped, Delivered, Processing, Cancelled
// Restored from original chat.js ordersDatabase
// ============================================

export const ordersDatabase = [
  {
    id: 'O1001',
    customer: 'Rahul Sharma',
    email: 'rahul@email.com',
    bookId: 'B001',
    bookTitle: 'Atomic Habits',
    quantity: 1,
    total: 499,
    status: 'Shipped',
    orderDate: '2026-02-01',
    deliveryDate: '2026-02-05'
  },
  {
    id: 'O1002',
    customer: 'Priya Patel',
    email: 'priya@email.com',
    bookId: 'B003',
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    quantity: 2,
    total: 798,
    status: 'Delivered',
    orderDate: '2026-01-28',
    deliveryDate: '2026-02-02'
  },
  {
    id: 'O1003',
    customer: 'Amit Verma',
    email: 'amit@email.com',
    bookId: 'B008',
    bookTitle: 'The Psychology of Money',
    quantity: 1,
    total: 410,
    status: 'Processing',
    orderDate: '2026-02-03',
    deliveryDate: null
  },
  {
    id: 'O1004',
    customer: 'Neha Singh',
    email: 'neha@email.com',
    bookId: 'B014',
    bookTitle: '1984',
    quantity: 1,
    total: 310,
    status: 'Delivered',
    orderDate: '2026-01-25',
    deliveryDate: '2026-01-30'
  },
  {
    id: 'O1005',
    customer: 'Karan Mehta',
    email: 'karan@email.com',
    bookId: 'B021',
    bookTitle: 'Dune',
    quantity: 1,
    total: 600,
    status: 'Shipped',
    orderDate: '2026-02-02',
    deliveryDate: '2026-02-07'
  },
  {
    id: 'O1006',
    customer: 'Sneha Iyer',
    email: 'sneha@email.com',
    bookId: 'B005',
    bookTitle: 'Rich Dad Poor Dad',
    quantity: 3,
    total: 1050,
    status: 'Processing',
    orderDate: '2026-02-04',
    deliveryDate: null
  },
  {
    id: 'O1007',
    customer: 'Arjun Rao',
    email: 'arjun@email.com',
    bookId: 'B012',
    bookTitle: 'The Hobbit',
    quantity: 1,
    total: 420,
    status: 'Cancelled',
    orderDate: '2026-01-29',
    deliveryDate: null
  },
  {
    id: 'O1008',
    customer: 'Meera Joshi',
    email: 'meera@email.com',
    bookId: 'B019',
    bookTitle: 'The Silent Patient',
    quantity: 2,
    total: 680,
    status: 'Delivered',
    orderDate: '2026-01-30',
    deliveryDate: '2026-02-03'
  },
  {
    id: 'O1009',
    customer: 'Vikas Nair',
    email: 'vikas@email.com',
    bookId: 'B017',
    bookTitle: 'The Lean Startup',
    quantity: 1,
    total: 520,
    status: 'Shipped',
    orderDate: '2026-02-01',
    deliveryDate: '2026-02-06'
  },
  {
    id: 'O1010',
    customer: 'Pooja Das',
    email: 'pooja@email.com',
    bookId: 'B015',
    bookTitle: "The Subtle Art of Not Giving a F*ck",
    quantity: 1,
    total: 360,
    status: 'Processing',
    orderDate: '2026-02-04',
    deliveryDate: null
  },
  {
    id: 'O1011',
    customer: 'Ankit Jain',
    email: 'ankit@email.com',
    bookId: 'B002',
    bookTitle: 'The Alchemist',
    quantity: 1,
    total: 299,
    status: 'Delivered',
    orderDate: '2026-01-27',
    deliveryDate: '2026-01-31'
  },
  {
    id: 'O1012',
    customer: 'Ritu Kapoor',
    email: 'ritu@email.com',
    bookId: 'B023',
    bookTitle: 'The Name of the Wind',
    quantity: 1,
    total: 580,
    status: 'Shipped',
    orderDate: '2026-02-02',
    deliveryDate: '2026-02-08'
  },
  {
    id: 'O1013',
    customer: 'Manish Yadav',
    email: 'manish@email.com',
    bookId: 'B010',
    bookTitle: 'The Power of Now',
    quantity: 1,
    total: 380,
    status: 'Delivered',
    orderDate: '2026-01-26',
    deliveryDate: '2026-01-30'
  },
  {
    id: 'O1014',
    customer: 'Kavya Reddy',
    email: 'kavya@email.com',
    bookId: 'B022',
    bookTitle: 'Project Hail Mary',
    quantity: 2,
    total: 1040,
    status: 'Processing',
    orderDate: '2026-02-04',
    deliveryDate: null
  },
  {
    id: 'O1015',
    customer: 'Deepak Gupta',
    email: 'deepak@email.com',
    bookId: 'B018',
    bookTitle: "Can't Hurt Me",
    quantity: 1,
    total: 480,
    status: 'Shipped',
    orderDate: '2026-02-03',
    deliveryDate: '2026-02-09'
  }
];

// ==========================================
// ORDER STATUS UTILITIES
// ==========================================
export const statusEmojis = {
  'Delivered': '✅',
  'Shipped': '🚚',
  'Processing': '📦',
  'Cancelled': '❌'
};

export const statusColors = {
  'Delivered': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
  'Shipped': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  'Processing': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
  'Cancelled': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
};

export default ordersDatabase;