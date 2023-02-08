import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Alkalmazott {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kezdoDatum: Date;

  @Exclude()
  @Column('int')
  haviBer: number;

  @Column()
  teljes_nev: string;

  @Exclude()
  @Column()
  jelszo: string;

  @Column()
  beosztottak_szama: number;

  @Column()
  hivatalosEmail: string;
}
