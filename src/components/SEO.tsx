import { Product, WithContext } from 'schema-dts';

type Props = WithContext<Product>;

export function JsonLd(jsonLd: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
