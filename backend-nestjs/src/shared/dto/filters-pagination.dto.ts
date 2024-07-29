import { IsInt, IsString, Min } from 'class-validator';

export class FiltersPaginationDto {
  @IsInt()
  @Min(0)
  pageIndex: number;

  @IsInt()
  @Min(0)
  pageSize: number;

  @IsString()
  filter?: string;

  @IsString()
  startDate?: string;

  @IsString()
  endDate?: string;

  @IsString()
  financeType?: string;

  @IsString()
  financeTransaction?: string;

  @IsString()
  status?: string;
}