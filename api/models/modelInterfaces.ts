export interface IDictionary {
  key: string;
  value: number;
}

interface userInterface {
  email: string;
  password: string;
  contracts: [contractInterface];
  balance: number;
}

interface contractInterface {
  name: string;
  address: string;
  functions: [Object];
  userWallet: string;
  userMail: string;
}


export { userInterface };
export { contractInterface };
