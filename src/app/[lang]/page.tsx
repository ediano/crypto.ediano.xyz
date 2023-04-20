import { getDictionary } from '@/dictionaries';

type GenerateMetadata = {
  params: { lang: any };
};

export async function generateMetadata({ params }: GenerateMetadata) {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.title,
    description: dict.description,
  };
}

export default async function Home({ params }: any) {
  return <div>{JSON.stringify(params, null, 2)}</div>;
}
