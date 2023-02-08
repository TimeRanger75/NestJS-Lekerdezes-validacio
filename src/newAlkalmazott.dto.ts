import { Exclude } from 'class-transformer';
import {
  Contains,
  IsDateString,
  IsDefined,
  IsEmail,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export default class NewAlkalmazottDto {
  @IsDateString()
  @IsOptional()
  kezdoDatum: string | Date;

  @IsEmail()
  hivatalosEmail: string;

  @Min(0, { message: 'A havibérnek legalább 0-nak kell lennie' })
  @IsInt({ message: 'A havibérnek egész számnak kell lennie' })
  @IsDefined({ message: 'A havibér megadása kötelező' })
  haviBer: number;

  @IsOptional()
  @Min(0)
  beosztottak_szama: number;

  @IsDefined()
  @Contains(' ')
  teljes_nev: string;
}
