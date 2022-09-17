export interface RefID {
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

export interface DataModel<T> {
  _id: string;
  _index: string;
  _source: GenericDataModel & {
    payload: T;
  };
}

export interface ColorFilter {
  text: string;
  count: number;
  checked: boolean;
}
