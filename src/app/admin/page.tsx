import Products from '../admin/products/page';
import Pdf from '../admin/pdf/page';
import Locations from '../admin/locations/page';

export default function AdminDashboard() {
  return (
    <>
    <Products />
    <Pdf />
    <Locations />
    </>
  );
}