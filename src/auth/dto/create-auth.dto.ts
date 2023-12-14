import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class loginUser {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  password: string;
}
