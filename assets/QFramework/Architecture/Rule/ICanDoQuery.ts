import { IQuery } from "../IQuery";

export interface ICanDoQuery {
    DoQuery<D, T extends IQuery<D>>(query: T): D;
}