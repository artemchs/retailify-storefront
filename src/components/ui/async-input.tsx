import { Skeleton } from "./skeleton";

type Props = {
  isLoading: boolean;
  component: any;
};

export default function AsyncInput({ component, isLoading }: Props) {
  if (isLoading) return <Skeleton className="flex h-10 w-full rounded-md" />;

  return component;
}
