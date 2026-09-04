import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Lahore",
      "Hasilpur",
      "Islamabad",
      "Karachi",
      "Bahawalpur",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Frontend",
      "Backend",
    ],
  },
  {
    filterType: "Experience",
    array: [
      "0-3 years",
      "3-5 years",
      "5-7 years",
      "7+ years",
    ],
  }
];

const Filter = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (filterType, value) => {
    setSelectedValues((prev) => {
      const alreadySelected = prev.some(
        (item) =>
          item.filterType === filterType &&
          item.value === value
      );

      if (alreadySelected) {
        return prev.filter(
          (item) =>
            !(
              item.filterType === filterType &&
              item.value === value
            )
        );
      }

      return [
        ...prev,
        {
          filterType,
          value,
        },
      ];
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues, dispatch]);

  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>

      <hr className="mt-3" />

      <div className="mt-5">
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">

            <h2 className="font-bold text-lg mb-2">
              {data.filterType}
            </h2>

            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;

              const isSelected = selectedValues.some(
                (selected) =>
                  selected.filterType === data.filterType &&
                  selected.value === item
              );

              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-2 my-2"
                >
                  <input
                    type="checkbox"
                    id={itemId}
                    value={item}
                    checked={isSelected}
                    onChange={() =>
                      handleChange(data.filterType, item)
                    }
                    className="w-4 h-4 text-[#6B3AC2] border-gray-300 rounded focus:ring-[#6B3AC2] cursor-pointer"
                  />

                  <label
                    htmlFor={itemId}
                    className="cursor-pointer text-gray-700"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;