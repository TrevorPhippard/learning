import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  authorId!: string;

  @IsOptional()
  companyId?: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsOptional()
  location?: string;
}
