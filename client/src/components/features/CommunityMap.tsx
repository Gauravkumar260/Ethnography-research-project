import dynamic from "next/dynamic";

const CommunityMapClient = dynamic(() => import("./CommunityMapClient"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-muted animate-pulse rounded-lg" />
});

export default CommunityMapClient;
