import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString({
    message: 'Error! You need send me a string.',
  })
  @IsNotEmpty()
  @MinLength(3)
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  readonly to: string;
}
