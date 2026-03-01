"use client";

import React from "react";
import { format } from "date-fns";
import DashboardTtile from "@/components/reusable/DashboardTtile";
import { useGetReportByIdQuery } from "@/redux/features/admin/reports/reportApi";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/reusable/StatusBadge";

export default function ReportDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: report, isLoading, error } =
    useGetReportByIdQuery({ id });

  if (isLoading) {
    return <div className="p-6">Loading report...</div>;
  }

  if (error || !report) {
    return <div className="p-6">Report not found</div>;
  }

  // 🔥 Extract Safe Values
  const reportId = report?.id || "N/A";
  const clientName = report?.name || "N/A";
  const progressStatus = report?.progress_status || "N/A";
  const uniqueId = report?.order?.id || "N/A";
  const lot = report?.lot || "N/A";
  const resultStatus = report?.result_status || "N/A";
  const reportFile = report?.report_file || "No file uploaded";

  // Format Date Safely
  const formattedDate = report?.test_date
    ? format(new Date(report.test_date), "PPP")
    : "N/A";

  // 🔥 Extract Test + Addons
  const testItems =
    report?.order?.items
      ?.filter((item: any) => item.type === "test" || item.type === "addon")
      ?.map((item: any) => item.name)
      ?.join(" & ") || "N/A";

  // 🔥 Result Summary (if backend sends JSON later)
  const resultSummary =
    report?.result_summary && Array.isArray(report.result_summary)
      ? report.result_summary
      : [];

  return (
    <div className="space-y-8">
      <DashboardTtile
        baseTitle="Home"
        page="Report Entry"
        heading="Report Details"
        description="Upload and verify client reports"
        isBackButton
      />

      {/* ========================= */}
      {/* Test Information Section */}
      {/* ========================= */}

      <section className="p-6 rounded-2xl border border-[#ECEFF3] space-y-6 bg-white">
        <h2 className="text-[#4A4C56] text-lg font-medium">
          Test Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DisplayField label="Report ID" value={reportId} />
          <DisplayField label="Test Type" value={testItems} />
          <DisplayField label="Client Name" value={clientName} />
          {/* <DisplayField label="Progress Status" value={progressStatus} /> */}

          <DisplayField label="Progress Status"  value={<StatusBadge status={progressStatus} />} />
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
          <DisplayField label="Date" value={formattedDate} />
          <DisplayField label="Unique ID" value={uniqueId} />
          <DisplayField label="Lot" value={lot} />
          {/* <DisplayField label="Result Status" value={resultStatus} /> */}
          <DisplayField label="Result Status" value={<StatusBadge status={resultStatus === 'pass' ? 'Pass' : 'Fail'} />} />
        </div>

        {/* Result Summary */}
        <div className="space-y-3 pt-4">
          <h3 className="text-[#1D1F2C] text-base font-medium">
            Result Summary
          </h3>

          {resultSummary.length > 0 ? (
            <div className="divide-y divide-[#ECEFF3]">
              {resultSummary.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between py-3 text-base"
                >
                  <span className="text-[#777980]">
                    {item.name || "N/A"}
                  </span>
                  <span className="text-[#1D1F2C] font-medium">
                    {item.value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No result summary available
            </p>
          )}
        </div>

        {/* Uploaded File */}
        <div className="pt-4">
          <h3 className="text-[#1D1F2C] text-base font-medium mb-3">
            Uploaded Report
          </h3>

          <div className="p-4 border border-[#DFE1E7] rounded-xl bg-[#F8FAFB]">
            <p className="text-sm text-[#1D1F2C] font-medium">
              {reportFile}
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
  value: string | React.ReactNode;
  className?: string;
}) {
  return (
    <div className="space-y-1 ">
      <p className="text-sm text-[#777980]">{label}</p>
      {
        React.isValidElement(value as React.ReactElement) ? value : (
          <p className="text-base text-[#1D1F2C] font-medium border rounded-md py-2 px-3 border-[#ECEFF3]">
            {value || "N/A"}
          </p>
        )
      }
    </div>
  );
}