"use client";

import React, { useState } from "react";
import { testResults } from "./testResults"; // adjust path

export default function VerifyReportHero() {
    const [reportId, setReportId] = useState("");
    const [result, setResult] = useState<any>(null);
    const [notFound, setNotFound] = useState(false);

    const handleVerify = () => {
        const found = testResults.find(
            (item) => item.reportId.toLowerCase() === reportId.trim().toLowerCase()
        );

        if (found) {
            setResult(found);
            setNotFound(false);
        } else {
            setResult(null);
            setNotFound(true);
        }
    };

    return (
        <section className="bg-[#023347] min-h-auto">
            <div className="flex max-w-[1600px] flex-col justify-center items-center gap-10 px-6 py-16 mx-auto">

                <div className="text-center">
                    <h3 className="text-white font-syne text-4xl md:text-5xl font-semibold mb-6">
                        Verify a peptide report
                    </h3>
                    <p className="text-[#D2D2D5] max-w-[434px] mx-auto text-sm md:text-lg">
                        Enter a Report ID to view verification status and the summary you choose to share.
                    </p>
                </div>

                {/* Input */}
                <div className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        className="text-center text-white bg-transparent border-b border-white/20 focus:outline-none w-[352px] py-2.5"
                        placeholder="LNL-2026-000124"
                        value={reportId}
                        onChange={(e) => setReportId(e.target.value)}
                    />

                    <button
                        onClick={handleVerify}
                        className="px-8 py-4 rounded-full bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white text-lg font-medium hover:opacity-90 transition"
                    >
                        Verify Report
                    </button>
                </div>

                {/* Not Found */}
                {notFound && (
                    <div className="bg-[#FFF3CD] text-[#856404] px-6 py-3 rounded-md">
                        Report Not Found
                    </div>
                )}

                {/* Result Card */}
                {result && (
                    <div className="bg-white rounded-2xl p-8 w-full max-w-[700px] mt-8">

                        <h4 className="text-[#1D1F2C] font-syne text-2xl font-semibold leading-[120%] mb-6">Test Results</h4>

                        <div className="space-y-4 text-[#777980]">
                            <DisplayResult label="Report ID" result={result.reportId} />
                            <DisplayResult label="Test date" result={result.testDate} />
                            <DisplayResult label="Product Name" result={result.productName} />
                            <DisplayResult label="Lot" result={result.lot} />
                            <DisplayResult label="Status" result={result.status} />
                        </div>


                        <div className="mt-4 ">
                            <h4 className="text-[#777980] text-left text-xl font-medium leading-[120%] tracking-[0.12px] mb-2">Result Summary</h4>
                        </div>


                        <div className="mt-4 space-y-2">
                            {result.summary.map((item: any, index: number) => (
                                <DisplayResult key={index} label={item.name} result={item.value} isSummary={true} />
                            ))}
                        </div>

                        <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-b from-[#84B6DE] to-[#1C5E96] text-white">
                            View Full Report
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}


const DisplayResult = ({ label, result, isSummary = false }: { label: string, result: string, isSummary?: boolean }) => {

    const isResultPass = result.toLowerCase() === "pass";


    if (!isSummary) {
        return (
            <div className="flex justify-between">
                <span className="text-[#777980] text-center text-xl font-normal leading-[120%] tracking-[0.12px]">{label}</span>
                {
                    isResultPass ? (
                        <span className="text-[#1A9882] text-xl font-normal leading-[120%] tracking-[0.12px] px-4 py-1.5 bg-[#E9FAF7] rounded-full">Pass</span>
                    ) : (
                        <span className="text-[#1D1F2C] text-xl font-normal leading-[120%] tracking-[0.12px]">{result}</span>
                    )
                }
            </div>
        )
    }

    return (
        <div className="flex justify-between py-2 border-b border-[#E9E9EA] last:border-b-0">
            <span className="text-[#777980] text-center  text-base font-normal leading-[120%] tracking-[0.08px] ">{label}</span>
            <span className="text-[#1D1F2C] text-center  text-base font-normal leading-[120%]">{result}</span>
        </div>
    )
}
