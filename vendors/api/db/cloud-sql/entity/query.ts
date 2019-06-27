import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Query {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public vendor: string;
  // @Column()
  // invoice: string;
  // @Column()
  // subscription: string;
  // @Column()
  // nature: string;
  // @Column()
  // processor: string;
  // @Column()
  // branch: string;
  // @Column()
  // environment: string;
  // @Column()
  // value: string;
  // @Column()
  // txId: string;
  // @Column()
  // sourceDate: Date;
  // @Column()
  // language: string;
  // @Column()
  // reference: string;
  // @Column()
  // resId: string;
  // @Column()
  // responseType: string;
  // @Column()
  // description: string;
  // @Column()
  // expirationDate: Date;
  // @Column()
  // invoiceStatus: string;
  // @Column()
  // value2: string;
  // @Column()
  // labels: string; // check how we can store like a object param
}
