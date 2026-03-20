"use client";
import { useState, useCallback } from "react";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import { API } from "@/lib/api";
interface ReportDialogProps {
  open: boolean;
  setReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  challengeId: string;
}
export default function ReportDialog({
  open,
  setReportOpen,
  challengeId,
}: ReportDialogProps) {
  const [reason, setReason] = useState("");

  const handleReport = useCallback(async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for the report.");
      return;
    }

    const reportPromise = async () => {
      const response = await fetch(API.challenges.report(challengeId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit report");
      }

      return response.json();
    };

    toast.promise(reportPromise(), {
      loading: "Sending report...",
      success: () => {
        setReportOpen(false);
        return "Report submitted! Our team will review it.";
      },
      error: (err) => err.message,
    });
  }, [challengeId, reason]);

  return (
    <Dialog open={open} onOpenChange={setReportOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <TriangleAlert />
          Report Challenge
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Report this challenge</DialogTitle>
          <DialogDescription>
            Help us understand what's wrong with this challenge.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-4">
          <Label htmlFor="reason-message">Reason</Label>
          <Textarea
            id="reason-message"
            placeholder="e.g. Inappropriate content, spam..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => handleReport()}>
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
