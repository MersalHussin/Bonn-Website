import BrandComingSoon from "../../components/BrandComingSoon";

export const metadata = {
  title: "علامة فيرت التجارية | مصنع بون للصناعات الطبية",
  description: "ترقبوا إطلاق منتجات علامة فيرت التجارية قريبًا من مصنع بون للصناعات الطبية.",
};

export default function VertPage() {
  return (
    <BrandComingSoon
      brandNameAr="فيرت"
      brandNameEn="Vert"
      logo="/images/Vert.png"
      descAr="نعمل حاليًا على تحضير وإطلاق تشكيلة منتجات علامة فيرت (Vert) المتميزة بأعلى معايير الجودة والتصنيع الطبي. ترقبوا الإطلاق الرسمي قريبًا!"
      descEn="We are actively preparing to launch the distinguished Vert product line, crafted with the highest standards of medical manufacturing and quality. Launching soon!"
    />
  );
}
