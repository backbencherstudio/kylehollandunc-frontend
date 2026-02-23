import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { MoreVertical } from "lucide-react";
  import React from "react";
  
  export type TableAction<T> = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
    danger?: boolean;
    show?: (item: T) => boolean;
    className?: string;
  };
  
  interface RowActionsProps<T> {
    item: T;
    actions: TableAction<T>[];
    mode?: "dropdown" | "inline"; // NEW
    className?: string;
    showLabelOn?: "mobile" | "desktop" | "always";
  }
  
  export function RowActions<T>({
    item,
    actions,
    mode = "dropdown", // default keeps old behavior
    className,
    showLabelOn = "desktop",
  }: RowActionsProps<T>) {
    const visibleActions = actions?.filter(
      (action) => (action.show ? action.show(item) : true)
    );
  
    if (!visibleActions || visibleActions.length === 0) return null;
  
    // 🔥 INLINE MODE (No 3 dots)
    if (mode === "inline") {
      return (
        <div
          className={` ${className ? className : "flex flex-col  items-center gap-1.5"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {visibleActions.map((action) => (
            <button
              key={action.key}
  
              onClick={() => action.onClick(item)}
              className={`
        flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all border border-[#E5E5E5] cursor-pointer
        ${action.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}
        ${action.className || ""}
      `}
            >
              <span className="opacity-70">{action.icon}</span>
                  {action.label}
  
  
  
            </button>
          ))}
        </div>
      );
    }
  
    // 🔥 DEFAULT DROPDOWN MODE
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="rounded-md p-1 text-[#A3A3A3] hover:bg-gray-100 active:scale-95 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
  
        <DropdownMenuContent
          align="end"
          className={`bg-white border border-[#E5E5E5] rounded-xl z-[100] ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {visibleActions.map((action) => (
            <DropdownMenuItem
              key={action.key}
              onClick={() => action.onClick(item)}
              className={`flex items-center gap-2 ${action.danger ? "text-red-600 focus:text-red-600" : ""
                }`}
            >
              {action.icon}
                  {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  