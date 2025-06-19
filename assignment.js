// Question 2: DSA Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.
// For example, given:
// const nums = [2, 7, 11, 15];
// const target = 9;
// The function should return [0, 1] because nums[0] + nums[1] = 2 + 7 = 9.
// Requirements:
// Implement the solution in JavaScript.
// The solution should have a time complexity better than O(n^2).
// Include proper error handling for edge cases.

// Ans:  Approach 
//   Create a hash map to store numbers and their indices
//   For each number, calculate the difference (target - current number)
//   If difference exists in map, return the indices
//   Otherwise, add current number and its index to map

// Time Complexity: O(n) - single pass through the array
//  Space Complexity: O(n) - hash map storage

function twoSum(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const diff = target - arr[i];
        if (map.has(diff) && map.get(diff) !== i) {
            return [map.get(diff), i];
        }
        map.set(arr[i], i);
    }
    return []; 
}

//  Question 3: MongoDB Aggregation Consider a MongoDB collection named sales with documents structured as follows:
// json:
// {
//     "_id": ObjectId("..."),
//     "date": ISODate("2024-06-15T00:00:00Z"),
//     "store": "Store A",
//     "items": [
//         {
//             "name": "item1",
//             "quantity": 5,
//             "price": 10.0
//         },
//         {
//             "name": "item2",
//             "quantity": 3,
//             "price": 20.0
//         }
//     ]
// }
// Ans:  
db.sales.aggregate([
  {
    $unwind: "$items"
  },
  {
    $project: {
      store: 1,
      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
      revenue: { $multiply: ["$items.quantity", "$items.price"] },
      price: "$items.price"
    }
  },
  {
    $group: {
      _id: {
        store: "$store",
        month: "$month"
      },
      totalRevenue: { $sum: "$revenue" },
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: 1
    }
  },
  {
    $sort: {
      store: 1,
      month: 1
    }
  }
])
