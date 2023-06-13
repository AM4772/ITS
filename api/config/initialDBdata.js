const bcrypt = require("bcrypt");

const hashPwd = bcrypt.hashSync("125ghj", 10);

const users = [
  {
    id: 1,
    name: "John",
    surname: "Smith",
    username: "jsmith",
    email: "jsmith@test.com",
    password: hashPwd,
    role: "Developer",
    active: true,
  },
  {
    id: 2,
    name: "Eli",
    surname: "Wasp",
    username: "ewasp",
    email: "ewasp@test.com",
    password: hashPwd,
    role: "Manager",
    active: true,
  },
  {
    id: 3,
    name: "Tim",
    surname: "Burton",
    username: "tburton",
    email: "tburton@test.com",
    password: hashPwd,
    role: "Admin",
    active: true,
  },
  {
    id: 4,
    name: "Rita",
    surname: "Hayworth",
    username: "rhayworth",
    email: "rhayworth@test.com",
    password: hashPwd,
    role: "EndUser",
    active: true,
  },
  {
    id: 5,
    name: "Joe",
    surname: "Black",
    username: "jblack",
    email: "jblack@test.com",
    password: hashPwd,
    role: "Developer",
    active: true,
  },
  {
    id: 6,
    name: "Mary",
    surname: "Reyes",
    username: "mreyes",
    email: "mreyes@test.com",
    password: hashPwd,
    role: "Developer",
    active: true,
  },
  {
    id: 7,
    name: "Annie",
    surname: "Smith",
    username: "asmith",
    email: "asmith@test.com",
    password: hashPwd,
    role: "Developer",
    active: true,
  },
  {
    id: 8,
    name: "Aldo",
    surname: "Moro",
    username: "amoro",
    email: "amoro@test.com",
    password: hashPwd,
    role: "Developer",
    active: false,
  },
  {
    id: 9,
    name: "Marcelo",
    surname: "Tombo",
    username: "mtombo",
    email: "mtombo@test.com",
    password: hashPwd,
    role: "EndUser",
    active: true,
  },
  {
    id: 10,
    name: "Gonzalo",
    surname: "Tisco",
    username: "gtisco",
    email: "gtisco@test.com",
    password: hashPwd,
    role: "EndUser",
    active: false,
  },
  {
    id: 11,
    name: "Jerry",
    surname: "Lewis",
    username: "jlewis",
    email: "jlewis@test.com",
    password: hashPwd,
    role: "Admin",
    active: true,
  },
  {
    id: 12,
    name: "Robert",
    surname: "De Niro",
    username: "rdeniro",
    email: "rdeniro@test.com",
    password: hashPwd,
    role: "EndUser",
    active: true,
  },
];

const tickets = [
  {
    id: 1,
    name: "App Name was undefined",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 4,
    severity: 6,
    nature: "Compatibility",
    status: false,
    resolution: "Assigned to Development",
    author: "rdeniro",
    userId: 6,
  },
  {
    id: 2,
    name: "new ticket problem 35",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 3,
    severity: 1,
    nature: "Unit Level",
    status: true,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 1,
  },
  {
    id: 3,
    name: "new ticket problem 4",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 2,
    severity: 2,
    nature: "Logic",
    status: false,
    resolution: "Assigned to Development",
    author: "rhayworth",
    userId: 5,
  },
  {
    id: 4,
    name: "New user status not being stored",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "More Info Required. To Filer",
    author: "gtisco",
    userId: 6,
  },
  {
    id: 5,
    name: "NEW TICKET PROBLEM 6e",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 2,
    nature: "Compatibility",
    status: true,
    resolution: "Assigned to Development",
    author: "gtisco",
    userId: 5,
  },
  {
    id: 6,
    name: "bug by user screen does not exist",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 4,
    nature: "Logic",
    status: false,
    resolution: "More Info Required. To Filer",
    author: "mtombo",
    userId: 8,
  },
  {
    id: 7,
    name: "App Load",
    application: "Speranto",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 3,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "More Info Required. To Filer",
    author: "rhayworth",
    userId: 1,
  },
  {
    id: 8,
    name: "App crash",
    application: "Speranto",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "gtisco",
    userId: 5,
  },
  {
    id: 9,
    name: "Menu not visible",
    application: "Speranto",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 6,
  },
  {
    id: 10,
    name: "new ticket form failsd",
    application: "Speranto",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Logic",
    status: true,
    resolution: "Assigned to Development",
    author: "rdeniro",
    userId: 7,
  },
  {
    id: 11,
    name: "new ticket problem22",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 3,
    severity: 5,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "gtisco",
    userId: 8,
  },
  {
    id: 12,
    name: "Log in failed",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: true,
    resolution: "Assigned to Development",
    author: "rhayworth",
    userId: 1,
  },
  {
    id: 13,
    name: "Reload not found",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 2,
    severity: 2,
    nature: "Functional",
    status: true,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 5,
  },
  {
    id: 14,
    name: "App crash on update",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "rdeniro",
    userId: 6,
  },
  {
    id: 15,
    name: "Tickets can be assigned to endusers",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 2,
    severity: 3,
    nature: "Functional",
    status: false,
    resolution: "More Info Required. To Filer",
    author: "gtisco",
    userId: 7,
  },
  {
    id: 16,
    name: "save modal incorrect",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 4,
    severity: 4,
    nature: "Syntax",
    status: false,
    resolution: "Assigned to Development",
    author: "rhayworth",
    userId: 8,
  },
  {
    id: 17,
    name: "success responses not rendering",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 1,
  },
  {
    id: 18,
    name: "App not storing new tickes",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "rdeniro",
    userId: 5,
  },
  {
    id: 19,
    name: "App not storing new tickets when saving",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "gtisco",
    userId: 6,
  },
  {
    id: 20,
    name: "Checking error",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 3,
    severity: 4,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "rhayworth",
    userId: 7,
  },
  {
    id: 21,
    name: "Success response not showing up",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 2,
    severity: 3,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 8,
  },
  {
    id: 22,
    name: "App crashed when loading tickets",
    application: "Tango",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "rdeniro",
    userId: 1,
  },
  {
    id: 23,
    name: "Delete button not showing up",
    application: "Zodiak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 2,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "gtisco",
    userId: 5,
  },
  {
    id: 24,
    name: "Delete button not working",
    application: "Kojak",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 2,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "rhayworth",
    userId: 6,
  },
  {
    id: 25,
    name: "App crashes after login",
    application: "Speranto",
    details: "detais of the bug",
    steps: "123456",
    version: "V1",
    priority: 1,
    severity: 1,
    nature: "Functional",
    status: false,
    resolution: "Assigned to Development",
    author: "mtombo",
    userId: 7,
  },
];

module.exports = { users, tickets };