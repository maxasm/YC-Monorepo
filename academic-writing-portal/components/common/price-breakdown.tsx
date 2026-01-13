import type { PriceBreakdown } from "@/types";
import { Card } from "./card";
import { Badge } from "./badge";

interface PriceBreakdownProps {
  price: PriceBreakdown;
  readOnly?: boolean;
}

export function PriceBreakdownView({ price, readOnly = true }: PriceBreakdownProps) {
  return (
    <Card title="Price Breakdown" description="AI-estimated and admin-approved pricing (read-only)" className="bg-indigo-50">
      <div className="space-y-3">
        {price.components && price.components.length > 0 ? (
          <>
            <div className="space-y-2 border-b border-indigo-200 pb-3">
              {price.components.map((component, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-700">{component.label}</span>
                  <span className="font-semibold text-slate-900">
                    {price.currency} {component.value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : null}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">AI Estimate</span>
            <Badge tone="info">
              {price.currency} {price.estimate.toFixed(2)}
            </Badge>
          </div>

          {price.adminApproved !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Admin Approved</span>
              <Badge tone="success">
                {price.currency} {price.adminApproved.toFixed(2)}
              </Badge>
            </div>
          )}

          {price.final !== undefined && (
            <div className="flex items-center justify-between border-t border-indigo-200 pt-2">
              <span className="text-base font-semibold text-slate-900">Final Price</span>
              <span className="text-lg font-bold text-indigo-700">
                {price.currency} {price.final.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
