import React, { useState, useRef, useEffect, useCallback } from "react";
import TopNavBar from "./components/TopNavBar";
import Toolbar from "./components/Toolbar";
import BottomNavBar from "./components/BottomNavBar";

// Helpers
const getStatusClasses = (status: string): string => {
  switch (status) {
    case "in-process": return "bg-blue-100 text-blue-800";
    case "need to start": return "bg-yellow-100 text-yellow-800";
    case "complete": return "bg-green-100 text-green-800";
    case "blocked": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityClasses = (priority: string): string => {
  switch (priority) {
    case "High": return "text-red-800";
    case "Medium": return "text-orange-800";
    case "Low": return "text-blue-800";
    default: return "text-gray-800";
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const headers = useRef([
    { id: "num", name: "#", minWidth: 0.5, bgColor: "#eeeee" },
    { id: "jobRequest", name: "Job Request", minWidth: 2, bgColor: "#eeeee" },
    { id: "submitted", name: "Submitted", minWidth: 1.5, bgColor: "#eeeee" },
    { id: "status", name: "Status", minWidth: 1.5, bgColor: "#eeeee" },
    { id: "submitter", name: "Submitter", minWidth: 1.5, bgColor: "#eeeee" },
    { id: "url", name: "URL", minWidth: 2, bgColor: "#eeeee" },
    { id: "assigned", name: "Assigned", minWidth: 1.5, bgColor: "#e6fff9" },
    { id: "priority", name: "Priority", minWidth: 1, bgColor: "#eae3fc" },
    { id: "dueDate", name: "Due Date", minWidth: 1.5, bgColor: "#eae3fc" },
    { id: "estValue", name: "Est. Value", minWidth: 2, bgColor: "#fff0e6" },
  ]);

  const initialFrUnits = headers.current.map(h => h.minWidth || 1);
  const [colFrUnits, setColFrUnits] = useState<number[]>(initialFrUnits);
  const tableRef = useRef<HTMLDivElement>(null);

  const [data] = useState([
    [{ value: 1 }, { value: "Launch campaign" }, { value: "15-11-2024" }, { value: "in-process" }, { value: "Aisha Patel" }, { value: "www.aishapatel..." }, { value: "Sophie Choudhury" }, { value: "Medium" }, { value: "20-11-2024" }, { value: "6,200,000 ₹" }],
    [{ value: 2 }, { value: "Update press kit" }, { value: "28-10-2024" }, { value: "need to start" }, { value: "Irfan Khan" }, { value: "www.irfankhanp..." }, { value: "Tejas Pandey" }, { value: "High" }, { value: "30-10-2024" }, { value: "3,500,000 ₹" }],
    [{ value: 3 }, { value: "User feedback report" }, { value: "05-12-2024" }, { value: "in-process" }, { value: "Mark Johnson" }, { value: "www.markjohns..." }, { value: "Rachel Lee" }, { value: "Medium" }, { value: "10-12-2024" }, { value: "4,750,000 ₹" }],
    [{ value: 4 }, { value: "Design new features" }, { value: "10-01-2025" }, { value: "complete" }, { value: "Emily Green" }, { value: "www.emilygreen..." }, { value: "Tom Wright" }, { value: "Low" }, { value: "15-01-2025" }, { value: "5,900,000 ₹" }],
    [{ value: 5 }, { value: "Prepare Q4 report" }, { value: "25-01-2025" }, { value: "blocked" }, { value: "Jessica Brown" }, { value: "www.jessicabro..." }, { value: "Kevin Smith" }, { value: "Low" }, { value: "30-01-2025" }, { value: "2,800,000 ₹" }],
  ]);

  const MIN_WIDTH_PX = 50;
  const gridTemplateColumns = colFrUnits.map(w => `${w}fr`).join(" ");
  const emptyRowsCount = 5;
  const emptyRowTemplate = Array(headers.current.length).fill({ value: "" });
  const filteredData = data.filter(row => row.some(cell => String(cell.value).toLowerCase().includes(searchTerm.toLowerCase())));

  const handleTabClick = (tab: string) => setActiveTab(tab);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    switch (e.key) {
      case "ArrowRight": setSelectedCell({ row, col: Math.min(col + 1, headers.current.length - 1) }); break;
      case "ArrowLeft": setSelectedCell({ row, col: Math.max(col - 1, 0) }); break;
      case "ArrowDown": setSelectedCell({ row: Math.min(row + 1, data.length + emptyRowsCount - 1), col }); break;
      case "ArrowUp": setSelectedCell({ row: Math.max(row - 1, 0), col }); break;
    }
  };

  const startResize = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialFrs = [...colFrUnits];
    const currentPxWidths: number[] = [];

    if (!tableRef.current) return;
    const headerCells = tableRef.current.querySelectorAll(".column-header-cell");
    headerCells.forEach(cell => currentPxWidths.push(cell.getBoundingClientRect().width));
    const totalPxWidth = currentPxWidths.reduce((sum, w) => sum + w, 0);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaPx = moveEvent.clientX - startX;
      setColFrUnits(prevFrs => {
        const newFrs = [...prevFrs];
        const resizingColIndex = index;
        const nextColIndex = index + 1;
        const currentPx = currentPxWidths[resizingColIndex];
        let newCurrentPx = Math.max(MIN_WIDTH_PX, currentPx + deltaPx);
        const totalInitialFrSum = initialFrs.reduce((a, b) => a + b, 0);
        newFrs[resizingColIndex] = Math.max(headers.current[resizingColIndex].minWidth, (newCurrentPx / totalPxWidth) * totalInitialFrSum);
        if (nextColIndex < headers.current.length) {
          const nextPx = currentPxWidths[nextColIndex];
          let newNextPx = Math.max(MIN_WIDTH_PX, nextPx - deltaPx);
          newFrs[nextColIndex] = Math.max(headers.current[nextColIndex].minWidth, (newNextPx / totalPxWidth) * totalInitialFrSum);
          const currentFrSum = prevFrs.reduce((a, b) => a + b, 0);
          const newFrSum = newFrs.reduce((a, b) => a + b, 0);
          if (newFrSum !== currentFrSum && newFrSum > 0) {
            const scaleFactor = currentFrSum / newFrSum;
            for (let i = 0; i < newFrs.length; i++) newFrs[i] *= scaleFactor;
          }
        }
        return newFrs;
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [colFrUnits]);

  return (
    <div className="min-h-screen bg-gray-100 font-inter flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      <TopNavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Toolbar />
      <div className="flex-grow overflow-auto">
        <div className="w-full bg-white shadow-md overflow-auto" ref={tableRef}>
          {/* Super Header */}
          <div className="grid text-gray-700 text-sm font-bold border-b border-gray-300" style={{ gridTemplateColumns }}>
            <div className="p-3 text-center border-r border-gray-200 bg-[#e2e2e2]" style={{ gridColumn: "span 5" }}>Financial Overview</div>
            <div className="p-3 text-center border-r border-gray-200" style={{ gridColumnStart: 6, gridColumnEnd: 7 }}></div>
            <div className="p-3 text-center border-r border-gray-200 bg-[#d2e0d4]" style={{ gridColumnStart: 7, gridColumnEnd: 8 }}>ABC</div>
            <div className="p-3 text-center border-r border-gray-200 bg-[#dccfcc]" style={{ gridColumnStart: 8, gridColumnEnd: 10 }}>Answer Question</div>
            <div className="p-3 text-center bg-[#fac2AF]" style={{ gridColumnStart: 10, gridColumnEnd: 11 }}>Extract</div>
          </div>

          {/* Column Headers */}
          <div className="grid border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase" style={{ gridTemplateColumns }}>
            {headers.current.map((header, index) => (
              <div key={header.id} className="relative p-3 border-r border-gray-200 text-center column-header-cell" style={{ backgroundColor: header.bgColor }}>
                {header.name}
                {index < headers.current.length - 1 && (
                  <div className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 hover:bg-blue-200 opacity-0 hover:opacity-100 transition-opacity" onMouseDown={(e) => startResize(index, e)} />
                )}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {filteredData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid border-b border-gray-100 text-sm hover:bg-gray-50" style={{ gridTemplateColumns }}>
              {row.map((cell, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                if (colIndex === 0) {
                  return (
                    <div key={colIndex} className="p-3 border-r border-gray-100 text-gray-800 text-center" onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                      {cell.value}
                    </div>
                  );
                }
                const baseClass = `p-3 border-r text-gray-800 focus:outline-none ${isSelected ? "border-2 border-blue-500 bg-white" : "border-gray-100"}`;
                if (colIndex === 3) {
                  return (
                    <div key={colIndex} className={baseClass} onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(cell.value as string)}`}>{cell.value}</span>
                    </div>
                  );
                }
                if (colIndex === 5) {
                  const displayText = cell.value as string;
                  const relativePath = "/" + displayText.replace("www.", "").replace("...", "").toLowerCase();
                  return (
                    <div key={colIndex} className={baseClass} onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                      <a href={relativePath} className="text-blue-600 underline hover:text-blue-800">{displayText}</a>
                    </div>
                  );
                }
                if (colIndex === 7) {
                  return (
                    <div key={colIndex} className={baseClass} onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                      <span className={`text-xs font-medium ${getPriorityClasses(cell.value as string)}`}>{cell.value}</span>
                    </div>
                  );
                }
                return (
                  <div key={colIndex} className={baseClass} onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                    {cell.value}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Empty Rows */}
          {Array.from({ length: emptyRowsCount }).map((_, i) => (
            <div key={`empty-${i}`} className="grid border-b border-gray-100 text-sm hover:bg-gray-50" style={{ gridTemplateColumns }}>
              <div className="p-3 border-r border-gray-100 text-gray-300 text-center">
                {filteredData.length + i + 1}
              </div>
              {emptyRowTemplate.slice(1).map((_, colIndex) => {
                const actualColIndex = colIndex + 1;
                const isSelected = selectedCell?.row === data.length + i && selectedCell?.col === actualColIndex;
                const baseClass = `p-3 border-r text-gray-400 italic focus:outline-none ${isSelected ? "border-2 border-blue-500 bg-white" : "border-gray-100"}`;
                return (
                  <div key={actualColIndex} className={baseClass} onClick={() => setSelectedCell({ row: data.length + i, col: actualColIndex })} />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar tabs={["All Orders", "Pending", "Reviewed", "Arrived"]} activeTab={activeTab} onTabClick={handleTabClick} />
    </div>
  );
};

export default App;
