import React from "react";

function SkyCloudTable() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-2 md:px-12">
        <div className="overflow-auto">
          <table className="w-[230%] md:w-[75%] mx-auto border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 min-w-[300px]">Key Differences/Features</th>
                <th className="p-3">SkyCloud</th>
                <th className="p-3">Azure</th>
                <th className="p-3">AWS</th>
                <th className="p-3">Google Cloud</th>
                <th className="p-3">Digital Ocean</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Data Center Hosted in Pakistan",
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
                [
                  "Unlimited Data Transfer (in/out) without any Fair Use Policy",
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
                [
                  "Customize solutions management and support availability",
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
                [
                  "Save on taxes up to 11% w.r.t other public clouds",
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
                [
                  "Local support, offering SLAs as per requirement",
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
                ["Affordable prices", true, false, false, false, false],
                [
                  "Minimum Latency",
                  "40ms",
                  "> 100 ms",
                  "> 100 ms",
                  "> 100 ms",
                  "> 100 ms",
                ],
              ].map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  } border-t border-gray-100`}
                >
                  <td className="p-3 text-gray-500">{row[0]}</td>
                  {row.slice(1).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`p-3 ${
                        typeof cell === "boolean"
                          ? cell
                            ? "text-green-500 font-bold"
                            : "text-red-500 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {typeof cell === "boolean" ? (cell ? "✔" : "✘") : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SkyCloudTable;
