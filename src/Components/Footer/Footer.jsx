export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer fixed-bottom text-center py-2">
        <h3 className="text-white h6">© {year} All Rights Reserved</h3>
      </footer>
    </>
  );
}
