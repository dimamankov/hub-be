export class ProfileDto {
  name: string;
  lastName: string;
  phone: string;
  role: 'agency' | 'landlord' | 'tenant' | null;
}
