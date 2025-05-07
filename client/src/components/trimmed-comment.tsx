import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TrimmedCommentProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export const TrimmedComment = ({ text, maxLength = 100, className="" }: TrimmedCommentProps) => {

  if (text.length <= maxLength) {
    return <p className="text-sm mb-3">{text}</p>;
  }

  const truncatedText = text.slice(0, maxLength) + '...';

  return (
    <div className={`${className} text-sm mb-3`}>
      {truncatedText}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="ml-2 text-primary hover:underline cursor-pointer"
            // onClick={() => setIsTruncated(false)}
          >
            Read full
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Full Comment</DialogTitle>
          </DialogHeader>
          <p className="whitespace-pre-wrap">{text}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};