import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  userAccountId!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @MaxLength(200)
  headline?: string;

  @IsOptional()
  @MaxLength(5000)
  summary?: string;
}
