"use client";

import React from "react";
import { Skeleton } from "@ui/skeleton";
import { buttonVariants } from "@ui/button";
import TextVariantes from "@ui/TextsVariants";
import Link from "next/link";
import { BoxCard } from "../ui/boxCard";
import { useIsMounted } from "@/hooks/useIsMounted";
import Image from "next/image";

export interface CallBannerInterface {
  imageUrl: string;
  title: string;
  paragraph: string;
  buttonText?: string;
  buttonLink?: string;
  buttonTarget?: React.HTMLAttributeAnchorTarget | undefined;
  alignment?: "end" | "start";
}

const CallBanner: React.FC<CallBannerInterface> = ({
  imageUrl,
  paragraph,
  title,
  buttonLink,
  buttonTarget,
  buttonText,
  alignment = "start",
}) => {
  const isMounted = useIsMounted();
  const imageRef1 = React.useRef(null);

  const handleImageLoad = (ref: any) => {
    ref.current.dataset.loaded = "true";
  };

  if (!isMounted) {
    return <Skeleton className="w-full aspect-[1440/572]" />;
  }

  return (
    <div
      className={`relative bg-no-repeat bg-cover flex flex-col gap-3 justify-center  ${
        alignment === "start" ? "lg:items-start" : "lg:items-center"
      }  w-full
       lg:aspect-[1440/572] px-2 lg:px-12 pt-[8rem] lg:pt-[10rem] pb-4 lg:pb-[4.75rem] bg-center 
       transition-all duration-500 blur-0`}
    >
      <Image
        ref={imageRef1}
        priority
        src={imageUrl}
        alt="Cover Image"
        className="bg-img blur-up max-lg:object-cover max-lg:rounded-xl max-lg:aspect-[1440/572] max-lg:max-h-[28.75rem] max-lg:w-full"
        sizes="(max-width: 768px) 100vw, 1440px"
        width={1440}
        height={720}
        quality={100}
        placeholder="blur"
        blurDataURL="data:..."
        onLoad={() => handleImageLoad(imageRef1)}
      />
      <BoxCard type="main">
        <TextVariantes variant="h1_main_title" lineBottom>
          {title}
        </TextVariantes>
        <TextVariantes variant="paragraph_01">{paragraph}</TextVariantes>
        {buttonLink && buttonText && (
          <Link href={buttonLink} target={buttonTarget} className={buttonVariants()}>
            {buttonText}
          </Link>
        )}
      </BoxCard>
    </div>
  );
};

const MemoizedCallBanner = React.memo(CallBanner);
MemoizedCallBanner.displayName = "CallBanner";

export default MemoizedCallBanner;
