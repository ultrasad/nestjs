import { IsEmail, IsNotEmpty } from 'class-validator';

// Register + Login ** เอาไว้ถือ Data
export class UserDto {
  @IsNotEmpty({ message: 'Email is not empty' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;
}
