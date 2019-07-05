import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Query {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public vendor: string;
  @Column()
  public invoice: string;
  @Column()
  public subscription: string;
  @Column()
  public nature: string;
  @Column()
  public processor: string;
  @Column()
  public branch: string;
  @Column()
  public environment: string;
  @Column()
  public value: string;
  @Column()
  public txId: string;
  @Column()
  public sourceDate: Date;
  @Column()
  public language: string;
  @Column()
  public reference: string;
  @Column()
  public resId: string;
  @Column()
  public responseType: string;
  @Column()
  public description: string;
  @Column()
  public expirationDate: Date;
  @Column()
  public invoiceStatus: string;
  @Column()
  public value2: string;
  @Column()
  public labels: string; // check how we can store like a object param
}
