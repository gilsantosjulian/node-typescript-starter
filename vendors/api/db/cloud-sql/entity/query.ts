import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Query {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public vendor: string;
  @Column()
  public invoice: number;
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
  @Column({ nullable: true })
  public value: number;
  @Column()
  public txId: string;
  @Column()
  public sourceDate: Date;
  @Column()
  public language: string;
  @Column({ nullable: true })
  public reference: string;
  @Column()
  public resId: string;
  @Column()
  public responseType: string;
  @Column()
  public description: string;
  @Column({ nullable: true })
  public expirationDate: Date;
  @Column()
  public invoiceStatus: string;
  @Column({ nullable: true })
  public value2: number;
  @Column()
  public labels: string; // check how we can store like a object param
  @Column()
  public created: Date;
  @Column()
  public updated: Date;
}
