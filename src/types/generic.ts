import { LIST_VIEW_TYPE } from "@/constants";

export interface IdType {
  id: string;
  type: string;
}

export interface Pageable {
  offset?: number;
  limit?: number;
}

export interface GenericDataModel {
  role: string;
  state: string;
  status: string;
  created_by: string;
  updated_by: string;
  created: number;
  updated: number;
  type: string;
  group: string;
}
export interface AuctionDataModel<T> extends GenericDataModel {
  key?: string;
  id: string;
  _id: string;
  _index: string;
  payload: T;
}
export interface DataModel<T> {
  _id: string;
  _index: string;
  _source: GenericDataModel & {
    payload: T;
  };
}
export type ListViewType = typeof LIST_VIEW_TYPE[number];
