import { FaFilePdf } from "react-icons/fa";

export const getResourcesData = (t: any, isRTL: boolean, mounted: boolean) => {
  return [
    {
      id: "company-profile",
      slug: "company-profile",
      title: mounted ? t("resources.companyProfile") : "Company Profile",
      desc: isRTL 
        ? "تعرف على تاريخنا، رؤيتنا، وخدماتنا المتكاملة في ملف واحد شامل." 
        : "Learn about our history, vision, and comprehensive services in one file.",
      fileUrl: "https://drive.google.com/file/d/1InHy52ARLddTeoiawjA4I8S_1PYTyPHR/view?usp=drive_link",
      icon: FaFilePdf,
      size: "Drive Link",
    }
  ];
};
