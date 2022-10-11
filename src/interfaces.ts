export interface TPointDataType {
  id: number;
  name: string;
  point: number[];
}

export interface IClaim {
  key: React.Key;
  num: string;
  pointA: TPointDataType | undefined;
  pointB: TPointDataType | undefined;
}

export interface IClaimWayPointExpanded {
  pointsA: Array<TPointDataType>;
  pointsB: Array<TPointDataType>;
}

export interface IReduxClaim {
  key: React.Key;
  num: string;
  pointA: TPointDataType | undefined;
  pointB: TPointDataType | undefined;
}

export interface IReduxWayPoints {
  pointsA: Array<TPointDataType>;
  pointsB: Array<TPointDataType>;
}

export interface IPropsPointList {
  id: React.Key;
  ab: number;
}

export interface IPropsClaimContent {
  id: React.Key;
  points: Array<TPointDataType>;
}
