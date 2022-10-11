import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IReduxClaim } from "../../interfaces";
import { claims } from "../db/destinations";
import { points } from "../db/points";

const initialState = {
  claims: <IReduxClaim[]>claims,

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  selected: <IReduxClaim>{
    key: 0,
    num: "",
    pointA: {},
    pointB: {},
  },

  points: {
    pointsA: points,
    pointsB: points,
    points: points,
  },
};

export const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaims: (state, action: PayloadAction<IReduxClaim[]>) => {
      state.claims = action.payload;
    },

    updatePointsClaim: (state, action: PayloadAction<IReduxClaim>) => {
      const { key, pointA, pointB } = action.payload;

      return {
        ...state,

        claims: state.claims.map((claim) => {
          if (claim.key === key) {
            return {
              key: claim.key,
              num: claim.num,
              pointA: pointA,
              pointB: pointB,
            };
          }

          return claim;
        }),
      };
    },

    setSelectedClaim: (state, action: PayloadAction<IReduxClaim>) => {
      const { key, num, pointA, pointB } = action.payload;

      const selected = {
        key: key,
        num: num ? num : current(state).selected.num,
        pointA: pointA ? pointA : current(state).selected.pointA,
        pointB: pointB ? pointB : current(state).selected.pointB,
      };

      return { ...state, selected: selected };
    },
  },
});

export const { setClaims, setSelectedClaim, updatePointsClaim } =
  claimsSlice.actions;

export const selectClaims = (state: RootState) => state.claims.claims;
export const getPoints = (state: RootState) => state.claims.points.points;
export const getSelectedClaim = (state: RootState) => state.claims.selected;

export default claimsSlice.reducer;
