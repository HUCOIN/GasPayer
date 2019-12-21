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
  isPaid: boolean;
  address: string;
  functionName: string;
  parameters: any;
  paymentAmount: number;
  userWallet: string;
  userMail: string;
  isFunctionPayable: boolean;
}

export { userInterface };
export { contractInterface };
