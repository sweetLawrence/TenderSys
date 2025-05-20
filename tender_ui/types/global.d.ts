export {};

declare global {
  interface Tender {
    id: number;
    title: string;
    description: string;
    financial_year: string;
    deadline: string;
    document: string;
  }

  interface LoginCredentials {
    username: string;
    password: string;
  }
}
