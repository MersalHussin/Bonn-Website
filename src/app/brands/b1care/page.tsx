import BrandComingSoon from "../../components/BrandComingSoon";

export const metadata = {
  title: "علامة B1Care التجارية | مصنع بون للصناعات الطبية",
  description: "ترقبوا إطلاق منتجات علامة B1Care التجارية قريبًا من مصنع بون للصناعات الطبية.",
};

export default function B1CarePage() {
  return (
    <BrandComingSoon
      brandNameAr="B1Care"
      brandNameEn="B1Care"
      logo="/images/B1.png"
      descAr="نعمل حاليًا على إطلاق منتجات علامة B1Care المبتكرة والمصنعة بأعلى معايير الجودة. ترقبوا الإطلاق قريبًا!"
      descEn="We are actively working on launching innovative B1Care products manufactured to the highest quality standards. Coming soon!"
    />
  );
}
