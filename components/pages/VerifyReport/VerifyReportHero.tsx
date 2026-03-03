"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLazyGetReportByUserIdQuery } from "@/redux/features/admin/reports/reportApi";

interface NormalizedReport {
  reportId: string | number;
  testDate: string;
  productName: string;
  lot: string;
  status: string;
  summary: { name: string; value: string }[];
  file?: string;
}

export default function VerifyReportHero() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [reportId, setReportId] = useState("");

  const [result, setResult] = useState<NormalizedReport | null>(null);
  const [notFound, setNotFound] = useState(false);

  // 🔥 Lazy query (only runs when triggered)
  const [trigger, { data, isLoading, error, isError }] =
    useLazyGetReportByUserIdQuery();

    

  /* ================= Handle API Response ================= */

  useEffect(() => {
    if (!data) return;

    try {
      // Handle result_summary parsing
      let parsedSummary = data.result_summary;
      
      // Parse if it's a string
      if (typeof data.result_summary === "string") {
        try {
          parsedSummary = JSON.parse(data.result_summary);
        } catch {
          parsedSummary = [];
        }
      }

      // Ensure parsedSummary is an array
      if (!Array.isArray(parsedSummary)) {
        parsedSummary = [];
      }

      const normalized: NormalizedReport = {
        reportId: data.id || data.report_id || "N/A",
        testDate: data.test_date || data.date || "N/A",
        productName: data.name || data.product_name || "N/A",
        lot: data.lot || data.batch_no || "N/A",
        status: data.result_status ?? data.status ?? "Pending",
        summary: parsedSummary,
        file: data.report_file || data.file_url || data.pdf_url,
      };

      setResult(normalized);
      setNotFound(false);
    } catch (err) {
      console.error("Parsing error:", err);
      setResult(null);
      setNotFound(true);
    }
  }, [data]);

  /* ================= Handle Error ================= */

  useEffect(() => {
    if (isError || error) {
      setResult(null);
      setNotFound(true);
    }
  }, [isError, error]);

  /* ================= Verify Handler ================= */

  const handleVerify = async () => {
    const id = inputRef.current?.value.trim();

    if (!id) {
      // Optional: Show toast or validation message
      return;
    }

    setReportId(id);
    setNotFound(false);
    setResult(null);

    try {
      await trigger({ id }).unwrap();
    } catch (err) {
      // Error handled in useEffect
      console.error("Verification failed:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <section className="bg-[#023347]">
      <div className="flex max-w-[1600px] flex-col justify-center items-center gap-10 px-6 py-16 mx-auto">
        
        {/* Header */}
        <div className="text-center">
          <h3 className="text-white text-4xl md:text-5xl font-semibold mb-6">
            Verify a peptide report
          </h3>
          <p className="text-[#D2D2D5] max-w-[434px] mx-auto text-sm md:text-lg">
            Enter a Report ID to view verification status and summary.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            ref={inputRef}
            type="text"
            className="text-center text-white bg-transparent border-b border-white/20 focus:outline-none w-full py-2.5 px-4 placeholder:text-white/50"
            placeholder="LNL-2026-000124"
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="px-8 py-4 rounded-full bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white text-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Report"}
          </button>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="bg-[#FFF3CD] text-[#856404] px-6 py-3 rounded-md animate-fadeIn">
            {error ? "An error occurred. Please try again." : "Report Not Found"}
          </div>
        )}

        {/* Result */}
        {result && !notFound && (
          <div className="bg-white rounded-2xl p-8 w-full max-w-[700px] mt-8 animate-fadeIn">
            <h4 className="text-[#1D1F2C] text-2xl font-semibold mb-6">
              Test Results
            </h4>

            <div className="space-y-4 text-[#777980]">
              <DisplayResult label="Report ID" result={String(result.reportId)} />
              <DisplayResult label="Test Date" result={result.testDate} />
              <DisplayResult label="Product Name" result={result.productName} />
              <DisplayResult label="Lot" result={result.lot} />
              <DisplayResult label="Status" result={result.status} />
            </div>

            {result.summary && result.summary.length > 0 && (
              <>
                <div className="mt-6">
                  <h4 className="text-[#777980] text-xl font-medium mb-2">
                    Result Summary
                  </h4>
                </div>

                <div className="mt-4 space-y-2">
                  {result.summary.map((item, index) => (
                    <DisplayResult
                      key={index}
                      label={item.name || `Test ${index + 1}`}
                      result={item.value || "N/A"}
                      isSummary
                    />
                  ))}
                </div>
              </>
            )}

            {result.file && (
              <a
                // href={result.file}
                href={`${process.env.NEXT_PUBLIC_API_URL}/reports/${result.reportId}/download`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white hover:opacity-90 transition"
              >
                View Full Report
              </a>
            )}
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

/* ================= Display Component ================= */

function DisplayResult({
  label,
  result,
  isSummary = false,
}: {
  label: string;
  result: string;
  isSummary?: boolean;
}) {
  const isPass = result?.toLowerCase?.() === "pass";
  const isFail = result?.toLowerCase?.() === "fail";

  // For summary items (non-status fields)
  if (!isSummary) {
    // Special handling for Status field
    if (label === "Status") {
      return (
        <div className="flex justify-between items-center">
          <span className="text-xl">{label}</span>
          {isPass ? (
            <span className="text-[#1A9882] px-4 py-1.5 bg-[#E9FAF7] rounded-full font-medium">
              Pass
            </span>
          ) : isFail ? (
            <span className="text-[#DC2626] px-4 py-1.5 bg-[#FEE2E2] rounded-full font-medium">
              Fail
            </span>
          ) : (
            <span className="text-[#F59E0B] px-4 py-1.5 bg-[#FEF3C7] rounded-full font-medium">
              {result || "Pending"}
            </span>
          )}
        </div>
      );
    }

    // Regular fields
    return (
      <div className="flex justify-between items-center">
        <span className="text-xl">{label}</span>
        <span className="text-[#1D1F2C] text-xl font-medium">{result}</span>
      </div>
    );
  }

  // Summary items
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-[#777980]">{label}</span>
      <span className="text-[#1D1F2C] font-medium">{result}</span>
    </div>
  );
}