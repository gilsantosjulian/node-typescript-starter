export class Query {
  public id: number;
  public vendor: string; // vendor wallet
  public invoice: number; // nroRefRecaudo
  public subscription: string; // codigoEAN
  public nature: string; // codigoCanal
  public processor: string; // codigoBanco
  public branch: string; // codigoSucursal
  public environment: string; // entorno
  public value: number; // valorRecaudar
  public txId: string; // idTransaccion
  public sourceDate: Date; // fchPeticion
  public language: string; // idioma
  public reference: string; // refAdicional
  public resId: string; // codigoResp
  public responseType: string; // severidadResp
  public description: string; // descripcionResp
  public expirationDate: Date; // fchVencimiento
  public invoiceStatus: string; // estadoDoc
  public value2: number; // valorConAporte
  public labels: string; // check how we can store like a object param
  public created: Date;
  public updated: Date;
}
