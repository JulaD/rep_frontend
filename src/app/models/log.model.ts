/**
 * Modelo con la información de los logs de cambio para auditoría.
 */
export class Log {
  constructor(
    public id: number,
    public email: string,
    public user_name: number,
    public organization_name: string,
    public date: string,
    public action: string,
  ) { }
}
