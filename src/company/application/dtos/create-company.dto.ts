import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  industry?: string;

  @IsOptional()
  location?: string;
}
