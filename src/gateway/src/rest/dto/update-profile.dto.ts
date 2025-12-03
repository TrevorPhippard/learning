import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  about?: string;
}
