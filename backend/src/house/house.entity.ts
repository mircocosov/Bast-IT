import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  address: string;

  @Column('float', {nullable: false})
  latitude: number;

  @Column('float', {nullable: false})
  longitude: number;

  @Column({nullable: false})
  price: number;
} 