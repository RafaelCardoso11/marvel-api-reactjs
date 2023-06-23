import { Header } from "@/components/header";
import { useData } from "@/hooks/useData";

export const Home = () => {
  const { data, error } = useData("characters");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <Header></Header>
    </>
  );
};
