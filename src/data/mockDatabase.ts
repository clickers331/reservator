import allRendezvous from "./allRendezvous.json";

export interface User {
  email: string;
  password: string;
  uid: string;
}

const users: User[] = [
  {
    email: "john.doe@example.com",
    password: "P@ssw0rd1",
    uid: "uid123456",
  },
  {
    email: "jane.smith@example.com",
    password: "P@ssw0rd2",
    uid: "uid234567",
  },
  {
    email: "michael.johnson@example.com",
    password: "P@ssw0rd3",
    uid: "uid345678",
  },
  {
    email: "emily.williams@example.com",
    password: "P@ssw0rd4",
    uid: "uid456789",
  },
  {
    email: "david.brown@example.com",
    password: "P@ssw0rd5",
    uid: "uid567890",
  },
  {
    email: "sarah.jones@example.com",
    password: "P@ssw0rd6",
    uid: "uid678901",
  },
  {
    email: "william.johnson@example.com",
    password: "P@ssw0rd7",
    uid: "uid789012",
  },
  {
    email: "olivia.smith@example.com",
    password: "P@ssw0rd8",
    uid: "uid890123",
  },
  {
    email: "james.davis@example.com",
    password: "P@ssw0rd9",
    uid: "uid901234",
  },
  {
    email: "emma.wilson@example.com",
    password: "P@ssw0rd10",
    uid: "uid012345",
  },
];

type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
interface UserDetail {
  isAdmin: boolean;
  isActive: boolean;
  personalData: {
    name: string;
    surname: string;
    bloodType: BloodType;
    phoneNumber: number;
    dateOfBirth: Date;
    placeOfBirth: string;
    id: number;
  };
  lessonData: {
    lessonCount: number;
    lessonTimes: {
      futureLessons: Date[];
      pastLessons: Date[];
    };
  };
}

export interface UserDetailObj {
  [key: string]: UserDetail;
}

const userDetailData: UserDetailObj = {
  uid123456: {
    isAdmin: false,
    isActive: false,
    personalData: {
      name: "John",
      surname: "Doe",
      bloodType: "A+",
      phoneNumber: 1234567890,
      dateOfBirth: new Date("1990-05-15"),
      placeOfBirth: "New York",
      id: 12345678901,
    },
    lessonData: {
      lessonCount: 20,
      lessonTimes: {
        futureLessons: [new Date("2023-08-20"), new Date("2023-08-27")],
        pastLessons: [new Date("2023-08-06"), new Date("2023-08-13")],
      },
    },
  },
  uid234567: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "Jane",
      surname: "Smith",
      bloodType: "O-",
      phoneNumber: 9876543210,
      dateOfBirth: new Date("1988-10-03"),
      placeOfBirth: "Los Angeles",
      id: 98765432109,
    },
    lessonData: {
      lessonCount: 15,
      lessonTimes: {
        futureLessons: [new Date("2023-08-22"), new Date("2023-08-29")],
        pastLessons: [new Date("2023-08-08"), new Date("2023-08-15")],
      },
    },
  },
  uid345678: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "Michael",
      surname: "Johnson",
      bloodType: "B+",
      phoneNumber: 5555555555,
      dateOfBirth: new Date("1995-03-20"),
      placeOfBirth: "Chicago",
      id: 55555555555,
    },
    lessonData: {
      lessonCount: 18,
      lessonTimes: {
        futureLessons: [new Date("2023-08-21"), new Date("2023-08-28")],
        pastLessons: [new Date("2023-08-07"), new Date("2023-08-14")],
      },
    },
  },
  uid456789: {
    isAdmin: true,
    isActive: true,
    personalData: {
      name: "Emily",
      surname: "Williams",
      bloodType: "AB-",
      phoneNumber: 9871234560,
      dateOfBirth: new Date("1985-12-10"),
      placeOfBirth: "Houston",
      id: 65432198765,
    },
    lessonData: {
      lessonCount: 25,
      lessonTimes: {
        futureLessons: [new Date("2023-08-23"), new Date("2023-08-30")],
        pastLessons: [new Date("2023-08-09"), new Date("2023-08-16")],
      },
    },
  },
  uid567890: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "David",
      surname: "Brown",
      bloodType: "A-",
      phoneNumber: 1239874560,
      dateOfBirth: new Date("1992-07-28"),
      placeOfBirth: "Miami",
      id: 78945612345,
    },
    lessonData: {
      lessonCount: 22,
      lessonTimes: {
        futureLessons: [new Date("2023-08-24"), new Date("2023-08-31")],
        pastLessons: [new Date("2023-08-10"), new Date("2023-08-17")],
      },
    },
  },
  uid678901: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "Sarah",
      surname: "Jones",
      bloodType: "B-",
      phoneNumber: 5551234567,
      dateOfBirth: new Date("1998-01-07"),
      placeOfBirth: "Seattle",
      id: 65478932109,
    },
    lessonData: {
      lessonCount: 17,
      lessonTimes: {
        futureLessons: [new Date("2023-08-25"), new Date("2023-09-01")],
        pastLessons: [new Date("2023-08-11"), new Date("2023-08-18")],
      },
    },
  },
  uid789012: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "William",
      surname: "Johnson",
      bloodType: "O+",
      phoneNumber: 9875551234,
      dateOfBirth: new Date("1993-09-12"),
      placeOfBirth: "San Francisco",
      id: 98712365409,
    },
    lessonData: {
      lessonCount: 16,
      lessonTimes: {
        futureLessons: [new Date("2023-08-26"), new Date("2023-09-02")],
        pastLessons: [new Date("2023-08-12"), new Date("2023-08-19")],
      },
    },
  },
  uid890123: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "Olivia",
      surname: "Smith",
      bloodType: "AB+",
      phoneNumber: 5557891234,
      dateOfBirth: new Date("1997-04-25"),
      placeOfBirth: "Boston",
      id: 78955512340,
    },
    lessonData: {
      lessonCount: 19,
      lessonTimes: {
        futureLessons: [new Date("2023-08-27"), new Date("2023-09-03")],
        pastLessons: [new Date("2023-08-13"), new Date("2023-08-20")],
      },
    },
  },
  uid901234: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "James",
      surname: "Davis",
      bloodType: "B+",
      phoneNumber: 9879876543,
      dateOfBirth: new Date("1996-11-18"),
      placeOfBirth: "Atlanta",
      id: 12378945609,
    },
    lessonData: {
      lessonCount: 14,
      lessonTimes: {
        futureLessons: [new Date("2023-08-28"), new Date("2023-09-04")],
        pastLessons: [new Date("2023-08-14"), new Date("2023-08-21")],
      },
    },
  },
  uid012345: {
    isAdmin: false,
    isActive: true,
    personalData: {
      name: "Emma",
      surname: "Wilson",
      bloodType: "A+",
      phoneNumber: 5559876543,
      dateOfBirth: new Date("1994-06-30"),
      placeOfBirth: "Denver",
      id: 98712378945,
    },
    lessonData: {
      lessonCount: 21,
      lessonTimes: {
        futureLessons: [new Date("2023-08-29"), new Date("2023-09-05")],
        pastLessons: [new Date("2023-08-15"), new Date("2023-08-22")],
      },
    },
  },
};

export interface AllRandezvous {
  [key: string | number]: Rendezvous[][];
}

export interface Rendezvous {
  uid: string | number;
  cancelled: boolean;
  name: string;
  date: Date;
}

export { users, userDetailData, allRendezvous };
