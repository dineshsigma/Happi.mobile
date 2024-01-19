// // // // Your data array
// // // let data = [
// // //     {
// // //         rule_name: 'vivo',
// // //         fromdate: '2023-09-10T00:00:00.000Z',
// // //         to_date: '2023-09-28T00:00:00.000Z',
// // //     },
// // //     {
// // //         rule_name: 'vivo',
// // //         fromdate: '2023-09-20T00:00:00.000Z',
// // //         to_date: '2023-09-29T00:00:00.000Z',
// // //     },
// // //     {
// // //         rule_name: 'vivo',
// // //         fromdate: '2023-09-25T00:00:00.000Z',
// // //         to_date: '2023-09-27T00:00:00.000Z',
// // //     },
// // // ];

// // // // Get the current date as a JavaScript Date object
// // // const currentDate = new Date();

// // // // Filter the array based on the nearest or equal 'to_date'
// // // const nearestToDate = data.filter(item => {
// // //     const toDate = new Date(item.to_date);
// // //     // Calculate the absolute difference in milliseconds between the two dates
// // //     const timeDifference = Math.abs(currentDate - toDate);
// // //     // If the difference is less than or equal to 24 hours (in milliseconds), consider it as nearest or equal
// // //     return timeDifference <= 24 * 60 * 60 * 1000;
// // // });

// // // // Sort the filtered array by 'to_date'
// // // nearestToDate.sort((a, b) => {
// // //     const dateA = new Date(a.to_date);
// // //     const dateB = new Date(b.to_date);
// // //     return dateA - dateB;
// // // });

// // // console.log(nearestToDate);

// // let data = [
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 12,
// //     maxhandsetprice: 12,
// //     mindiscountprice: 12,
// //     maxdiscountprice: 12,
// //     id: "98ca7d10-5eb6-11ee-898a-35662290ea77",
// //   },
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 12,
// //     maxhandsetprice: 12,
// //     mindiscountprice: 12,
// //     maxdiscountprice: 12,
// //     id: "123456897",
// //   },
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 12,
// //     maxhandsetprice: 12,
// //     mindiscountprice: 1,
// //     maxdiscountprice: 1,
// //     id: "98ca7d10",
// //   },
// // ];

// // // Define an array of objects to update, each with a unique id
// // const objectsToUpdate = [
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 1,
// //     maxhandsetprice: 1,
// //     mindiscountprice: 1,
// //     maxdiscountprice: 1,
// //     id: "98ca7d10",
// //   },
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 2,
// //     maxhandsetprice: 2,
// //     mindiscountprice: 2,
// //     maxdiscountprice: 2,
// //     id: "123456897",
// //   },
// //   {
// //     Approval_Authority: "saleshead",
// //     minhandsetprice: 2,
// //     maxhandsetprice: 2,
// //     mindiscountprice: 2,
// //     maxdiscountprice: 2,
// //     id: "12345689",
// //   },
// // ];

// // // Loop through the data array and update objects based on their id
// // for (const objToUpdate of objectsToUpdate) {
// //   const index = data.findIndex((item) => item.id === objToUpdate.id);
// //   if (index !== -1) {
// //     // Merge the existing object with the updated properties
// //     data[index] = { ...data[index], ...objToUpdate };
// //   } else {
// //     data[index] = { ...data[index] };
// //   }
// // }

// // // console.log(data);

// // let data3 = [
// //   {
// //     store_id: "650aa7063482272e0eb98db4",
// //     brand: "AA VIVO",
// //     model: "S1 VIVO MOBILE 6GB/128GB - BLUE",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     customer_mobile: "8106838432",
// //     customer_email: "",
// //     employee_id: "HM0062 - R.MAHESH",
// //     cash_approver: "650a9fee2ed403b8214cc78a",
// //     remarks: "",
// //     status: "Approved",
// //     created_by: "650a9ff62ed403b8214cc7b9",
// //     is_used: false,
// //     id: "55b78fd0-6290-11ee-9e50-4fae2066951d",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     discount_type: "flat",
// //     reference_no: "HAPDS00071",
// //     discount_coupoun: "W3CBKQ3ZD2",
// //   },
// //   {
// //     store_id: "650aa7063482272e0eb98db4",
// //     brand: "AA VIVO",
// //     model: "S1 VIVO MOBILE 6GB/128GB - BLUE",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     customer_mobile: "8106838432",
// //     customer_email: "",
// //     employee_id: "HM0062 - R.MAHESH",
// //     cash_approver: "650a9fee2ed403b8214cc78a",
// //     remarks: "",
// //     status: "Reject",
// //     created_by: "650a9ff62ed403b8214cc7b9",
// //     is_used: false,
// //     id: "55b78fd0-6290-11ee-9e50-4fae2066951d",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     discount_type: "flat",
// //     reference_no: "HAPDS00071",
// //     discount_coupoun: "W3CBKQ3ZD2",
// //   },
// //   {
// //     store_id: "650aa7063482272e0eb98db4",
// //     brand: "AA VIVO",
// //     model: "S1 VIVO MOBILE 6GB/128GB - BLUE",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     customer_mobile: "8106838432",
// //     customer_email: "",
// //     employee_id: "HM0062 - R.MAHESH",
// //     cash_approver: "650a9fee2ed403b8214cc78a",
// //     remarks: "",
// //     status: "awaiting",
// //     created_by: "650a9ff62ed403b8214cc7b9",
// //     is_used: false,
// //     id: "55b78fd0-6290-11ee-9e50-4fae2066951d",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     discount_type: "flat",
// //     reference_no: "HAPDS00071",
// //     discount_coupoun: "W3CBKQ3ZD2",
// //   },
// //   {
// //     store_id: "650aa7063482272e0eb98db4",
// //     brand: "AA VIVO",
// //     model: "S1 VIVO MOBILE 6GB/128GB - BLUE",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     customer_mobile: "8106838432",
// //     customer_email: "",
// //     employee_id: "HM0062 - R.MAHESH",
// //     cash_approver: "650a9fee2ed403b8214cc78a",
// //     remarks: "",
// //     status: "awaiting",
// //     created_by: "650a9ff62ed403b8214cc7b9",
// //     is_used: false,
// //     id: "55b78fd0-6290-11ee-9e50-4fae2066951d",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     discount_type: "flat",
// //     reference_no: "HAPDS00071",
// //     discount_coupoun: "W3CBKQ3ZD2",
// //   },
// // ];

// // let access_control = ["cashdiscountadmin", "cashdiscountstore", "dinesh"];

// // const str = "hm0014 5";
// // let whitespaceRemoved = str.replace(/\s/g, "");
// // whitespaceRemoved = whitespaceRemoved.toUpperCase();
// // //console.log(whitespaceRemoved); // 123
// // let data4 = [
// //   {
// //     rule_name: "vivo",
// //     fromdate: "2023-10-11T00:00:00.000Z",
// //     to_date: "2023-10-18T00:00:00.000Z",
// //   },
// //   {
// //     rule_name: "vivo-2",
// //     fromdate: "2023-10-10T00:00:00.000Z",
// //     to_date: "2023-10-19T00:00:00.000Z",
// //   },
// //   {
// //     rule_name: "vivo-3",
// //     fromdate: "2023-10-09T00:00:00.000Z",
// //     to_date: "2023-10-19T00:00:00.000Z",
// //   },
// //   {
// //     rule_name: "vivo-4",
// //     fromdate: "2023-10-18T00:00:00.000Z",
// //     to_date: "2023-10-19T00:00:00.000Z",
// //   },
// // ];

// // // Get the current date
// // const currentDate = new Date();

// // // Filter objects where fromdate is less than or equal to to_date
// // let filteredData = data4.filter(
// //   (item) => new Date(item.fromdate) <= new Date(item.to_date)
// // );

// // // Sort the filtered array by the difference between to_date and currentDate
// // filteredData.sort((a, b) => {
// //   const dateA = new Date(a.to_date);
// //   const dateB = new Date(b.to_date);
// //   return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
// // });

// // // The first item in the sorted array will be the nearest to_date
// // const nearestToDate = filteredData[0];

// // console.log("JSON with nearest to_date:", nearestToDate);

// // let data9 = [
// //   {
// //     store_id: "BANJARAHILLS",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-04T08:40:54.797Z",
// //   },
// //   {
// //     store_id: "BANJARAHILLS",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-05T08:50:54.797Z",
// //   },
// //   {
// //     store_id: "BANJARAHILLS",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-04T08:20:54.797Z",
// //   },

// //   {
// //     store_id: "AMEERPET",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-04T08:20:54.797Z",
// //   },
// //   {
// //     store_id: "AMEERPET",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-05T08:24:54.797Z",
// //   },
// //   {
// //     store_id: "AMEERPET",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-04T08:10:54.797Z",
// //   },
// //   {
// //     store_id: "AMEERPET",
// //     total_price: 18990,
// //     discount_price: 300,
// //     discount_total_price: 18690,
// //     created_at: "2023-10-04T08:40:54.797Z",
// //   },
// // ];

// // let output = [
// //   {
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     totalcount: 2,
// //     discount_price: 600,
// //   },
// //   {
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-05T08:30:54.797Z",
// //     totalcount: 1,
// //     discount_price: 600,
// //   },
// //   {
// //     store_name: "AMEERPET",
// //     created_at: "2023-10-04T08:30:54.797Z",
// //     totalcount: 3,
// //     discount_price: 900,
// //   },
// //   {
// //     store_name: "AMEERPET",
// //     created_at: "2023-10-05T08:30:54.797Z",
// //     totalcount: 1,
// //     discount_price: 300,
// //   },
// // ];

// // // let json=[
// // //   {
// // //     "created_at":"2023-10-11T10:01:31.189Z",
// // //     "store":[
// // //       {
// // //         "store_id":"650aa7063482272e0eb98db4",
// // //         "totalDiscountPrice":4000,
// // //         "totalSalesCount":30
// // //       },
// // //       {
// // //         "store_id":"650aa7063482272e0",
// // //         "totalDiscountPrice":4000,
// // //         "totalSalesCount":30
// // //       }
// // //     ]
// // //   },
// // //   {
// // //     "created_at":"2023-10-12T10:01:31.189Z",
// // //     "store":[
// // //       {
// // //         "store_id":"650aa7063482272e0eb98db",
// // //         "totalDiscountPrice":4000,
// // //         "totalSalesCount":30
// // //       },
// // //       {
// // //         "store_id":"650aa7063482e0",
// // //         "totalDiscountPrice":4000,
// // //         "totalSalesCount":30
// // //       }
// // //     ]
// // //   }
// // // ]

// // let data7 = [
// //   {
// //     totalcount: 1,
// //     discount_price: 200,
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-12T06:06:21.791Z",
// //   },
// //   {
// //     totalcount: 1,
// //     discount_price: 500,
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-11T09:01:14.637Z",
// //   },
// //   {
// //     totalcount: 1,
// //     discount_price: 599,
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-11T10:01:31.189Z",
// //   },
// //   {
// //     totalcount: 1,
// //     discount_price: 899,
// //     store_name: "BANJARAHILLS",
// //     created_at: "2023-10-11T09:56:33.248Z",
// //   },
// // ];

// // // Get the current date

// // // Get today's date

// // let dinesh = new Date();
// // console.log("dinesh", dinesh);

// // // Calculate the date two days from today

// // let d=dinesh.setDate(dinesh.getDate() + 2);

// // console.log("d",d)

// // // nearestToDate = filteredDates.filter((item) => {
// //       //   const toDate = new Date(item.to_date);
// //       //   const timeDifference = Math.abs(currentDate - toDate);
// //       //   console.log("timeDifference", timeDifference, 24 * 60 * 60 * 1000,timeDifference <= 24 * 60 * 60 * 1000);
// //       //   return timeDifference <= 24 * 60 * 60 * 1000;
// //       // });
// //       // console.log("nearestToDate", nearestToDate);
// //       // nearestToDate.sort((a, b) => {
// //       //   const dateA = new Date(a.to_date);
// //       //   const dateB = new Date(b.to_date);
// //       //   return dateA - dateB;
// //       // });



// //Hi <name>,
// // Real-time MIS report is been generated on <Date & Time>. Please check the link below.
// // <link>

// let data = {
//   "from": {
//     "phone_number": "+919121863666"},
//   "to": [{
//     "phone_number": "+918106838432"}],
//   "data": {
//     "message_template": {
//       "storage": "none",
//       "namespace": "bccb4a1b_6c81_4b39_8472_d08f22ffd0cd",
//       "template_name": "MIS report",
//       "language": {
//         "policy": "deterministic",
//         "code": "en"
//       },
//       "rich_template_data": {
//         "body": {
//           "params": [
//             {
//             "data": "dinesh"
//             },
//             {
//               "data": "{{lead.first_name}}"
//             },
//             {
//               "data": "{{lead.first_name}}"
//             },

//           ]}
//         }
//       }
//     }
//   }




//   [
//     {
//       $match: { status: "Approved" }, // Filter by status "Approved"
//     },
//     {
//       $group: {
//         _id: "$store_name",
//         totalDiscountPrice: {
//           $sum: "$discount_price",
//         },
//         totalTotalPrice: { $sum: "$total_price" },
//         brands: {
//           $push: {
//             brandName: "$brand",
//             HandsetPrice: "$total_price",
//             discountPrice: "$discount_price",
//             discountPercentage: "$discountPercentage",
//             models: {
//               brandName: "$brand",
//               modelName: "$model",
//               HandsetPrice: "$total_price",
//               discountPrice: "$discount_price",
//               discountPercentage: "$discountPercentage",
//             },
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         storeName: "$_id",
//         totalDiscountPrice: 1,
//         totalTotalPrice: 1,
//         brands: 1,
//       },
//     },
//     {
//       $unwind: "$brands", // Unwind the brands array
//     },
//     {
//       $group: {
//         _id: {
//           storeName: "$storeName",
//           brandName: "$brands.brandName",
//         },
//         totalDiscountPrice: { $first: "$totalDiscountPrice" },
//         totalTotalPrice: { $first: "$totalTotalPrice" },
//         brands: {
//           $push: "$brands.models", // Group by brandName and storeName
//         },
//       },
//     },
//     {
//       $group: {
//         _id: "$_id.storeName", // Group by storeName
//         totalDiscountPrice: { $first: "$totalDiscountPrice" },
//         totalTotalPrice: { $first: "$totalTotalPrice" },
//         brands: {
//           $push: {
//             brandName: "$_id.brandName",
//             models: "$brands", // Collect brands and their models
//           },
//         },
//       },
//     },
//   ]

  


