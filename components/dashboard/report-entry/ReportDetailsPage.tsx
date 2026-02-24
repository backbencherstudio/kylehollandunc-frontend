"use client";

import React from "react";
import { format } from "date-fns";
import DashboardTtile from "@/components/reusable/DashboardTtile";
import FileUpload from "@/components/reusable/FileUpload";

export default function ReportDetailsPage() {
  // Fake static data (would come from API)
  const reportData = {
    reportId: "LNL-000123",
    testType: "Standard Panel & 2 add ons",
    clientName: "Theresa Webb",
    progressStatus: "Completed",
    date: new Date(),
    uniqueId: "Illinois DOL",
    lot: "290",
    resultStatus: "Pass",
    summary: [
      { name: "GHK-Cu", value: "71.36 mg" },
      { name: "BPC-157", value: "12.41 mg" },
    ],
    fileName: "report.xlsx",
  };

  return (
    <div className="space-y-8">
      <DashboardTtile
        baseTitle="Home"
        page="Report Entry"
        heading="Report Details"
        description="Upload and verify client reports"
      />

      {/* ========================= */}
      {/* Test Information Section */}
      {/* ========================= */}

      <section className="p-6 rounded-2xl border border-[#ECEFF3] space-y-6 bg-white">
        <h2 className="text-[#4A4C56] text-lg font-medium">
          Test Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DisplayField label="Report ID" value={reportData.reportId} />
          <DisplayField label="Test Type" value={reportData.testType} />
          <DisplayField label="Client Name" value={reportData.clientName} />
          <DisplayField
            label="Progress Status"
            value={reportData.progressStatus}
          />
        </div>
      </section>

      {/* ========================= */}
      {/* Update Test Report */}
      {/* ========================= */}

      <section className="p-6 rounded-2xl border border-[#ECEFF3] space-y-6 bg-white">
        <h2 className="text-[#4A4C56] text-lg font-medium">
          Update Test Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DisplayField
            label="Date"
            value={format(reportData.date, "PPP")}
          />
          <DisplayField label="Unique ID" value={reportData.uniqueId} />
          <DisplayField label="Lot" value={reportData.lot} />
          <DisplayField
            label="Result Status"
            value={reportData.resultStatus}
          />
        </div>

        {/* Result Summary */}
        <div className="space-y-3 pt-4">
          <h3 className="text-[#1D1F2C] text-base font-medium">
            Result Summary
          </h3>

          <div className="divide-y divide-[#ECEFF3]">
            {reportData.summary.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-3 text-base"
              >
                <span className="text-[#777980]">{item.name}</span>
                <span className="text-[#1D1F2C] font-medium">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded File */}
        <div className="pt-4">
          <h3 className="text-[#1D1F2C] text-base font-medium mb-3">
            Uploaded Report
          </h3>

          <div className="p-4 border border-[#DFE1E7] rounded-xl bg-[#F8FAFB]">
            <p className="text-sm text-[#1D1F2C] font-medium">
              {reportData.fileName}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========================= */
/* Reusable Display Field */
/* ========================= */

function DisplayField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-[#777980]">{label}</p>
      <p className="text-base text-[#1D1F2C] font-medium">
        {value || "-"}
      </p>
    </div>
  );
}