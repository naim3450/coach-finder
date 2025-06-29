"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Share } from "@/app/naim/icons";
import { toast, Toaster } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function SharePopup({ title }) {
  // copy link
  function handleCopyLinkToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  function handleSocialShare(media) {
    if (media === "facebook") {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(url, "_blank", "width=600,height=400");
    } else if (media === "mail") {
      const subject = `Check out ${title}`;
      const body = `I thought you might be interested in this peer group: ${window.location.href}`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } else if (media === "linkedin") {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(url, "_blank");
    } else if (media === "twitter") {
      const text = `Check out ${title}`;
      const url = encodeURIComponent(window.location.href);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${url}`;
      window.open(twitterUrl, "_blank", "width=600,height=400");
    } else if (media === "whatsapp") {
      const text = `Check out ${title}` + " " + window.location.href;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    }
  }

  return (
    <>
      <Toaster richColors />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="!bg-transparent !py-5 border font-bold text-[16px] !text-[#333] hover:!text-[#FFF] hover:!bg-BtnColor !rounded-[8px] flex items-center gap-2 group">
            <Share className={"fill-[#6E6E6E] group-hover:!fill-white"} />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[300px] border-0 bg-[#fff] p-6 text-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-normal text-primaryColor">
              Share
            </DialogTitle>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto w-auto p-0 text-gray-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </div>
          <div className="space-y-4 pt-2">
            <p className="text-sm text-gray-400">{title}</p>
            <div className="flex justify-center gap-3">
              <div onClick={() => handleSocialShare("facebook")}>
                <Button className="h-10 w-10 rounded-full bg-[#1877F2] hover:bg-[#1877F2] p-0 ">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                </Button>
              </div>
              <div onClick={() => handleSocialShare("mail")}>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-[#2D9CDB] hover:bg-[#2D9CDB] p-0 "
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                  </svg>
                </Button>
              </div>
              <div onClick={() => handleSocialShare("linkedin")}>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full hover:bg-[#0077B5] bg-[#0077B5] p-0  "
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                  </svg>
                </Button>
              </div>
              <div onClick={() => handleSocialShare("twitter")}>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-black hover:bg-black hover: text-white p-0"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Button>
              </div>
              <div onClick={() => handleSocialShare("whatsapp")}>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-[#25D366] p-0 "
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </Button>
              </div>
            </div>
            <button
              onClick={handleCopyLinkToClipboard}
              variant="outline"
              className="w-full justify-center gap-2 py-2 rounded-lg text-sm text-white bg-BtnColor mt-4"
            >
              Copy Link
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
