"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseFile, type ParsedPlacementData } from "@/app/actions/parse-file";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (data: ParsedPlacementData) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error("Invalid file", {
          description: "Please upload an Excel (.xlsx) or CSV file",
        });
        return;
      }

      const file = acceptedFiles[0];

      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".csv")) {
        setErrorMessage("Only .xlsx and .csv files are supported");
        setUploadStatus("error");
        toast.error("Invalid file type", {
          description: "Please upload an Excel (.xlsx) or CSV file",
        });
        return;
      }

      setUploading(true);
      setUploadStatus("uploading");
      setProgress(0);

      try {
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 30, 90));
        }, 300);

        const parsedData = await parseFile(file);

        clearInterval(progressInterval);

        if (!parsedData) {
          throw new Error(
            "Failed to parse file. Ensure it has the correct format."
          );
        }

        setProgress(100);
        setUploadStatus("success");

        toast.success("Success!", {
          description: `Uploaded ${file.name} - ${parsedData.companyData.length} companies found`,
        });

        // Reset after 2 seconds
        setTimeout(() => {
          onUploadSuccess(parsedData);
          setUploading(false);
          setProgress(0);
          setUploadStatus("idle");
          onClose();
        }, 1500);
      } catch (error) {
        setUploading(false);
        setUploadStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Upload failed"
        );
        toast.error("Upload failed", {
          description:
            errorMessage ||
            (error instanceof Error ? error.message : "Upload failed"),
        });
      }
    },
    [toast, onClose, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
    disabled: uploading,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0  bg-white" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2">
          <div className="mb-4">
            <DialogTitle>Upload Placement Data</DialogTitle>
            <DialogDescription>
              Drag and drop your Excel or CSV file here, or click to browse
            </DialogDescription>
          </div>
          <div className="space-y-4">
            {/* Drop Zone */}
            <div
              {...getRootProps()}
              className={`border-2 bg-white border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />

              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">
                    {isDragActive
                      ? "Drop your file here"
                      : "Drag and drop your file here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to select a file
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported: .xlsx, .csv
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Uploading...
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Status Messages */}
            {uploadStatus === "success" && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  File uploaded successfully!
                </span>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="flex items-start gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Upload failed</p>
                  <p className="text-xs text-destructive/80">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={uploading}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button disabled={uploading} className="flex-1">
                {uploading ? "Uploading..." : "Close"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
