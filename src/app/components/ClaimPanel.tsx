import React, { useEffect, useId, useState } from "react";
import { Select, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { TPointDataType } from "../../interfaces";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  getPoints,
  selectClaims,
  updatePointsClaim,
  setSelectedClaim,
  getSelectedClaim,
} from "../../app/reducers/claimsSlice";
import {
  IClaim,
  IClaimWayPointExpanded,
  IPropsPointList,
  IPropsClaimContent,
} from "../../interfaces";

const ClaimContent = ({ points, id }: IPropsClaimContent) => {
  const claims = useAppSelector(selectClaims);

  const PointList: React.FC<IPropsPointList> = ({
    id,
    ab,
  }: IPropsPointList) => {
    const points = useAppSelector(getPoints);

    const dispatch = useAppDispatch();

    const [point, setPoint] = useState<TPointDataType>();
    const [selected, setSelected] = useState(0);

    const { Option } = Select;

    const selectClassName = `points-list-${ab ? "a" : "b"}-${id}`; //TODO: удалить

    useEffect(() => {
      claims.map((claim) => {
        if (claim.key === id) {
          setPoint(ab ? claim.pointA : claim.pointB);
          setSelected(ab ? claim.pointA!.id : claim.pointB!.id);
        }
      });
    }, [point, selected]);

    return (
      <span>
        <Select
          className={selectClassName}
          style={{ display: "block" }}
          value={selected}
          onChange={(value: number) => {
            let newPoint: TPointDataType | undefined;
            let savedPoint: TPointDataType | undefined;

            points.find((item) => {
              if (item.id === value) newPoint = item;
            });

            claims.find((claim) => {
              if (claim.key === id)
                savedPoint = ab ? claim.pointB : claim.pointA;
            });

            setSelected(value);
            setPoint(newPoint);

            dispatch(
              setSelectedClaim({
                key: id,
                num: "",
                pointA: ab ? newPoint : savedPoint,
                pointB: !ab ? newPoint : savedPoint,
              })
            );

            dispatch(
              updatePointsClaim({
                key: id,
                num: "",
                pointA: ab ? newPoint : savedPoint,
                pointB: !ab ? newPoint : savedPoint,
              })
            );
          }}
        >
          {points.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </span>
    );
  };

  const columns: TableColumnsType<IClaimWayPointExpanded> = [
    {
      title: "Адрес отправки",
      dataIndex: "pointsA",
      key: id,
      render: (pointsA: Array<TPointDataType>) => <PointList id={id} ab={1} />,
    },

    {
      title: "Адрес завершения",
      dataIndex: "pointsB",
      key: id,
      render: (pointsB: Array<TPointDataType>) => <PointList id={id} ab={0} />,
    },
  ];

  return (
    <Table
      key={useId()}
      columns={columns}
      dataSource={[
        {
          pointsA: points,
          pointsB: points,
        },
      ]}
      pagination={false}
    />
  );
};

export const ClaimPanel = () => {
  const points = useAppSelector(getPoints);
  const claims = useAppSelector(selectClaims);
  const selectedClaim = useAppSelector(getSelectedClaim);
  const dispatch = useAppDispatch();

  const columns: TableColumnsType<IClaim> = [
    { title: "Adresses", dataIndex: "num", key: "num" },
  ];

  return (
    <Table
      key={useId()}
      className="claim-container"
      columns={columns}
      scroll={{
        x: true,
      }}
      expandedRowRender={(record, i) => (
        <ClaimContent points={points} id={record.key} />
      )}
      expandable={{
        expandRowByClick: true,
      }}
      rowClassName={(record) => {
        return record.key === selectedClaim.key ? "claim-selected" : "";
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            dispatch(
              setSelectedClaim({
                key: record.key,
                num: record.num,
                pointA: record.pointA,
                pointB: record.pointB,
              })
            );
          },
        };
      }}
      pagination={false}
      dataSource={claims}
      size="small"
    />
  );
};
