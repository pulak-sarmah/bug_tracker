"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue, Status } from "@prisma/client";

const IssueStatusUpdate = ({ issue }: { issue: Issue }) => {
  const [status, setStatus] = useState(issue.status);

  const updateStatus = (newStatus: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: newStatus,
      })
      .then(() => {
        setStatus(newStatus);
      })
      .catch(() => {
        toast.error("Status could not be updated.");
      });
  };

  return (
    <div>
      {/* <label>
        <input
          type="checkbox"
          checked={status === "IN_PROGRESS"}
          onChange={() => updateStatus("IN_PROGRESS")}
        />
        On Going
      </label> */}
      <label className="flex gap-2">
        <span>Fixed:</span>
        <input
          className="w-6 h-6"
          type="checkbox"
          checked={status === "CLOSED"}
          onChange={() => updateStatus("CLOSED")}
        />
      </label>
      <span className=" text-red-600  leading-[4px]  text-xs">
        *Once checked as fixed you can not <p> further modify</p>
      </span>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssueStatusUpdate;
