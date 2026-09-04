import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "motion/react"
const Job = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(allJobs);

useEffect(() => {
  if (
    !searchedQuery ||
    !Array.isArray(searchedQuery) ||
    searchedQuery.length === 0
  ) {
    setFilterJobs(allJobs);
    return;
  }

  const filteredJobs = allJobs.filter((job) => {

    // Separate filters by type
    const locationFilters = searchedQuery
      .filter((item) => item.filterType === "Location")
      .map((item) => item.value.toLowerCase());

    const technologyFilters = searchedQuery
      .filter((item) => item.filterType === "Technology")
      .map((item) => item.value.toLowerCase());

    const experienceFilters = searchedQuery
      .filter((item) => item.filterType === "Experience")
      .map((item) => item.value);

    const salaryFilters = searchedQuery
      .filter((item) => item.filterType === "Salary")
      .map((item) => item.value);


    // -----------------------
    // LOCATION
    // -----------------------

    const locationMatch =
      locationFilters.length === 0 ||
      locationFilters.some((filter) =>
        String(job.location || "")
          .toLowerCase()
          .includes(filter)
      );


    // -----------------------
    // TECHNOLOGY
    // -----------------------

    const jobText = `
      ${job.title || ""}
      ${job.description || ""}
      ${job.position || ""}
      ${(job.requirements || []).join(" ")}
    `.toLowerCase();

    const technologyMatch =
      technologyFilters.length === 0 ||
      technologyFilters.some((filter) =>
        jobText.includes(filter)
      );


    // -----------------------
    // EXPERIENCE
    // -----------------------

    const experienceMatch =
      experienceFilters.length === 0 ||
      experienceFilters.some((filter) => {

        const experience = Number(job.experience);

        if (filter === "0-3 years") {
          return experience >= 0 && experience <= 3;
        }

        if (filter === "3-5 years") {
          return experience > 3 && experience <= 5;
        }

        if (filter === "5-7 years") {
          return experience > 5 && experience <= 7;
        }

        if (filter === "7+ years") {
          return experience > 7;
        }

        return false;
      });


  


    // Job must satisfy every filter category
    return (
      locationMatch &&
      technologyMatch &&
      experienceMatch
    );
  });

  setFilterJobs(filteredJobs);

}, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/5 md:min-w-62.5 md:h-[88vh] md:overflow-y-auto pb-5 pr-2">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-auto md:h-[88vh] md:overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((jobs) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={jobs._id}
                    className="h-full"
                  >
                    <Job1 job={jobs} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;