import BrandComingSoon from "../../components/BrandComingSoon";

export const metadata = {
  title: "علامة روبين التجارية | مصنع بون للصناعات الطبية",
  description: "ترقبوا إطلاق منتجات علامة روبين التجارية قريبًا من مصنع بون للصناعات الطبية.",
};

export default function RubinPage() {
  return (
    <BrandComingSoon
      brandNameAr="روبين"
      brandNameEn="Rubin"
      logo="/images/Rubin.png"
      descAr="نستعد قريبًا لتقديم تجربة فريدة ومنتجات متطورة من علامة روبين (Rubin) تلبي تطلعاتكم بأعلى درجات الفعالية والجودة الطبية. ترقبوا الإطلاق قريبًا!"
      descEn="We are preparing to introduce advanced Rubin brand products designed to meet expectations with peak efficacy and medical-grade quality. Launching soon!"
    />
  );
}
