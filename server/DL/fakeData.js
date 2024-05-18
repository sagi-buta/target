// // ** פעילויות **
// export const actions = [
//    {
//       _id: "null",
//       orderSource: "עריית בני ברק",
//       fundingSource: "משרד הכלכלה",
//       location: "בני ברק",
//       locationType: 1,
//       days: [1, 5],
//       startTime: "16:30",
//       endTime: "21:30",
//       startDate: new Date("01/01/2023"),
//       endDate: new Date("01/08/2023"),
//       status: 1,
//       lecturer: "yosef",
//       actionType: 'workshop',
//       name: 'full stack',
//       files: [
//          {
//             fileName: "syllabus-fs",
//             fileType: 'txt',
//             size: "2433",
//             createdDate: new Date("12/04/2022")
//          },
//          {
//             fileName: "images01",
//             fileType: 'jpg',
//             size: "202131",
//             createdDate: new Date("11/06/2023")
//          }
//       ],
//       tasks: [
//          {
//             deadline: new Date("22/07/2023"),
//             details: "task 1",
//             isDone: false,
//          },
//          {
//             deadline: new Date("23/07/2023"),
//             details: "task 2",
//             isDone: true,
//          },
//          {
//             deadline: new Date("27/07/2023"),
//             details: "task 3",
//             isDone: false,
//          },
//       ],
//       users: ["123", "456", "789"],
//       schedules: [
//          {
//             date: "16/07/2023",
//             lecturer: "Aviad",
//             comments: "to do users name",
//             status: "active"
//          },
//          {
//             date: "20/08/2023",
//             lecturer: "Aviad",
//             comments: "to do users  last name",
//             status: "active"
//          }
//       ]
//    },
//    {
//       _id: "null",
//       orderSource: "מועצה איזורית מטה בינימין",
//       fundingSource: `מגע"ר`,
//       location: "טלמון",
//       locationType: 2,
//       days: [1, 4],
//       startTime: new Date("09:00"),
//       endTime: new Date("16:00"),
//       startDate: new Date("10/11/2023"),
//       endDate: new Date("10/11/2024"),
//       status: 2,
//       lecturer: "אביעד",
//       actionType: 'course',
//       name: 'full stack',
//       files: [
//          {
//             fileName: "syllabus-fs",
//             fileType: 'txt',
//             size: "2433",
//             createdDate: new Date("12/04/2023")
//          },
//          {
//             fileName: "images01",
//             fileType: 'jpg',
//             size: "202131",
//             createdDate: new Date("11/06/2023")
//          }
//       ],
//       tasks: [
//          {
//             deadline: new Date("22/07/2023"),
//             details: "task 1",
//             isDone: false,
//          },
//          {
//             deadline: new Date("23/07/2023"),
//             details: "task 2",
//             isDone: true,
//          },
//          {
//             deadline: new Date("27/07/2023"),
//             details: "task 3",
//             isDone: false,
//          },
//       ],
//       users: ["123", "456", "789"],
//       schedules: [
//          {
//             date: new Date("2023/06/22"),
//             lecturer: "Aviad",
//             comments: "to do users name",
//             status: "active"
//          }
//          , {
//             date: "12/07/2023",
//             lecturer: "Aviad",
//             comments: "to do users  last name",
//             status: "active"
//          }
//       ]
//    }

// ]

// // ** משתמשים / סטודנטים **
// export const users = [
//    {
//       _id: "1",
//       userId: "123",
//       fName: 'Avi',
//       lName: "Sason",
//       phone: "0505477654",
//       email: "avi@gmail.com",
//       participantNum: 324,
//       comments: null,
//       permission: "student"
//    },
//    {
//       _id: "2",
//       userId: "456",
//       fName: 'Ben',
//       lName: "Cohen",
//       phone: "0505117614",
//       email: "ben@gmail.com",
//       participantNum: 345,
//       comments: null,
//       permission: "student",
//    }
//    , {
//       _id: "3",
//       userId: "789",
//       fName: 'sagi',
//       lName: "buta",
//       phone: "0547658620",
//       email: "sagi@gmail.com",
//       participantNum: 111,
//       comments: null,
//       permission: "admin",
//    }

// ]

// export const actionTypes = [
//    {
//       _id: "111qqq",
//       actionType: "workshop",
//       nameHebrew: "סדנה",
//       colors: {
//          primary: "#76C6D1",
//          secondary: "#FEC130",
//          silver: "#BEBEBE"
//       },
//       font: "Assistant , sans-serif"
//    }
//    ,

//    {
//       _id: "222qqq",
//       actionType: "course",
//       nameHebrew: "קורס",
//       colors: {
//          primary: "#76C6D1",
//          secondary: "#FEC130",
//          silver: "#BEBEBE"
//       },
//       font: "Assistant , sans-serif"
//    }
// ]

// export const days =
// {
//    1: "'א",
//    2: "'ב",
//    3: "'ג",
//    4: "'ד",
//    5: "'ה",
//    6: "'ו",
//    7: "'ז",
// }


// export const orderSource = ["עריית בני ברק", "מועצה אזורית מטה בנימין"]

// export const fundingSource = ["משרד הכלכלה", `מגע"ר`]

// export default ({ actions, users, actionTypes, days, orderSource, fundingSource })
// ** פעילויות **
export const actions = [
   {
      _id: "null",
      orderSource: "עריית בני ברק",
      fundingSource: "משרד הכלכלה",
      location: "בני ברק",
      locationType: 1,
      days: [1, 5],
      startTime: "16:30",
      endTime: "21:30",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-08"),
      status: 1,
      lecturer: "yosef",
      actionType: 'workshop',
      name: 'full stack',
      files: [
         {
            fileName: "syllabus-fs",
            fileType: 'txt',
            size: "2433",
            createdDate: new Date("2022-12-04")
         },
         {
            fileName: "images01",
            fileType: 'jpg',
            size: "202131",
            createdDate: new Date("2023-11-06")
         }
      ],
      tasks: [
         {
            deadline: new Date("2023-07-22"),
            details: "task 1",
            isDone: false,
         },
         {
            deadline: new Date("2023-07-23"),
            details: "task 2",
            isDone: true,
         },
         {
            deadline: new Date("2023-07-27"),
            details: "task 3",
            isDone: false,
         },
      ],
      users: ["123", "456", "789"],
      schedules: [
         {
            date: "2023-07-16",
            lecturer: "Aviad",
            comments: "to do users name",
            status: "active"
         },
         {
            date: "2023-08-20",
            lecturer: "Aviad",
            comments: "to do users last name",
            status: "active"
         }
      ]
   },
   {
      _id: "null",
      orderSource: "מועצה איזורית מטה בינימין",
      fundingSource: `מגע"ר`,
      location: "טלמון",
      locationType: 2,
      days: [1, 4],
      startTime: new Date("09:00"),
      endTime: new Date("16:00"),
      startDate: new Date("2023-10-11"),
      endDate: new Date("2024-10-11"),
      status: 2,
      lecturer: "אביעד",
      actionType: 'course',
      name: 'full stack',
      files: [
         {
            fileName: "syllabus-fs",
            fileType: 'txt',
            size: "2433",
            createdDate: new Date("2023-12-04")
         },
         {
            fileName: "images01",
            fileType: 'jpg',
            size: "202131",
            createdDate: new Date("2023-11-06")
         }
      ],
      tasks: [
         {
            deadline: new Date("2023-07-22"),
            details: "task 1",
            isDone: false,
         },
         {
            deadline: new Date("2023-07-23"),
            details: "task 2",
            isDone: true,
         },
         {
            deadline: new Date("2023-07-27"),
            details: "task 3",
            isDone: false,
         },
      ],
      users: ["123", "456", "789"],
      schedules: [
         {
            date: new Date("2023-06-22"),
            lecturer: "Aviad",
            comments: "to do users name",
            status: "active"
         },
         {
            date: "2023-07-12",
            lecturer: "Aviad",
            comments: "to do users last name",
            status: "active"
         }
      ]
   }
]

// ** משתמשים / סטודנטים **
export const users = [
   {
      _id: "1",
      userId: "123",
      fName: 'Avi',
      lName: "Sason",
      phone: "0505477654",
      email: "avi@gmail.com",
      participantNum: 324,
      comments: null,
      permission: "student"
   },
   {
      _id: "2",
      userId: "456",
      fName: 'Ben',
      lName: "Cohen",
      phone: "0505117614",
      email: "ben@gmail.com",
      participantNum: 345,
      comments: null,
      permission: "student",
   },
   {
      _id: "3",
      userId: "789",
      fName: 'sagi',
      lName: "buta",
      phone: "0547658620",
      email: "sagi@gmail.com",
      participantNum: 111,
      comments: null,
      permission: "admin",
   }
]

export const actionTypes = [
   {
      _id: "111qqq",
      actionType: "workshop",
      nameHebrew: "סדנה",
      colors: {
         primary: "#76C6D1",
         secondary: "#FEC130",
         silver: "#BEBEBE"
      },
      font: "Assistant, sans-serif"
   },
   {
      _id: "222qqq",
      actionType: "course",
      nameHebrew: "קורס",
      colors: {
         primary: "#76C6D1",
         secondary: "#FEC130",
         silver: "#BEBEBE"
      },
      font: "Assistant, sans-serif"
   }
]

export const days = {
   1: "א'",
   2: "ב'",
   3: "ג'",
   4: "ד'",
   5: "ה'",
   6: "ו'",
   7: "ז'"
}

export const orderSource = ["עריית בני ברק", "מועצה אזורית מטה בנימין"]

export const fundingSource = ["משרד הכלכלה", "מגער"]

export default { actions, users, actionTypes, days, orderSource, fundingSource }
