import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class mongoIdDto {
  @ApiProperty({ description: 'MongoDB _id' })
  @ApiProperty({ example: '6451786d24e368d53c9b4d66' })
  @IsMongoId()
  id: string;
}
