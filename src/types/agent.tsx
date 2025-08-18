export type Agent = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other"; // ✅ matches ENUM
  state: string;
  experience: "0-1" | "2-3" | "4+"; // ✅ matches ENUM
  agency?: string;
  image: string; // ✅ included in SQL but missing in TS
  password: string;
};
