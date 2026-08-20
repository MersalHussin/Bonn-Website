import BrandComingSoon from "../../components/BrandComingSoon";

export const metadata = {
  title: "علامة PuCare التجارية | مصنع بون للصناعات الطبية",
  description: "ترقبوا إطلاق منتجات علامة PuCare التجارية قريبًا من مصنع بون للصناعات الطبية.",
};

export default function PuCarePage() {
  return (
    <BrandComingSoon
      brandNameAr="PuCare"
      brandNameEn="PuCare"
      logo="/images/PUCare.png"
      descAr="نستعد لإطلاق تشكيلة منتجات PuCare المصممة لتوفير أقصى درجات الحماية والنظافة الصحية. ترقبوا الإطلاق قريبًا!"
      descEn="We are preparing to launch the PuCare product line designed for maximum hygienic protection and care. Coming soon!"
    />
  );
}
