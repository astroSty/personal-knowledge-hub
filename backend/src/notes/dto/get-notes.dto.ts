import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, } from 'class-validator';

export enum SortBy {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetNotesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 10;

  @IsOptional()
@IsEnum(SortBy)
sortBy: SortBy = SortBy.CREATED_AT;

@IsOptional()
@IsEnum(SortOrder)
order: SortOrder = SortOrder.DESC;

}