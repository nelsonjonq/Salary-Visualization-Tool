import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";

import * as d3 from "d3";
import gamineData from "./../data/gamine.csv";
import hookfishData from "./../data/hookfish.csv";

import Filters from "./Filters";

const DEFAULT_RESTAURANT = "Hookfish";

const RangeBarGraph = () => {
  const [data, setData] = useState([]);
  const [restauraunt, setRestauraunt] = useState(DEFAULT_RESTAURANT);
  const [employmentType, setEmploymentType] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const formattedData = {};

      await d3.csv(
        restauraunt === "Hookfish" ? hookfishData : gamineData,
        function (data) {
          const salary = data?.salary || "";
          const level = data?.level || "";
          const employeeGender = data?.gender || "";
          const roleEmploymentType = data?.employmentType || "";

          // Filter by Employment
          if (
            (employmentType &&
              roleEmploymentType === "contractor" &&
              employmentType !== "Contractor") ||
            (roleEmploymentType === "fullTime" &&
              employmentType !== "Full Time") ||
            (roleEmploymentType === "Part time" &&
              employmentType !== "Part Time")
          ) {
            return;
          }

          // Filter by Gender
          if (gender && employeeGender !== gender) {
            return;
          }

          if (level && salary) {
            let currMin = salary;
            let currMax = salary;
            if (formattedData[level]) {
              currMin = formattedData[level].values[0];
              currMax = formattedData[level].values[1];
            }

            formattedData[level] = {
              type: `Level ${level}`,
              values: [
                Math.min(currMin, parseInt(salary)),
                Math.max(currMax, parseInt(salary)),
              ],
            };
          }
        }
      );

      const res = [];
      for (const value of Object.values(formattedData)) {
        res.push(value);
      }

      setData(res);
    };

    fetchData();
  }, [restauraunt, employmentType, gender]);

  const onChangeRestaurant = (event) => {
    const location = event.target.textContent;
    setRestauraunt(location);
  };

  const onChangeEmploymentType = (event) => {
    const employmentType = event.target.textContent;
    setEmploymentType(employmentType === "All" ? "" : employmentType);
  };

  const onChangeGender = (event) => {
    const selectedGender = event.target.textContent;
    setGender(selectedGender === "All" ? "" : selectedGender);
  };

  return (
    <div className="range-chart">
      <div className="range-chart-header">
        <h2 className="range-chart-title">Salary Range Chart</h2>
        <Filters
          restauraunt={restauraunt}
          employmentType={employmentType}
          gender={gender}
          onChangeRestaurant={onChangeRestaurant}
          onChangeEmploymentType={onChangeEmploymentType}
          onChangeGender={onChangeGender}
        />
      </div>
      <Bar
        data={data.reverse()}
        xField="values"
        yField="type"
        isRange={true}
        label={{
          position: "middle",
          layout: [{ type: "adjust-color" }],
        }}
      />
    </div>
  );
};

export default RangeBarGraph;
