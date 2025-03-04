const Footer = () => {
  return (
    <footer className="w-full mt-auto pt-8 pb-4 animate-fade-in text-center">
      <div className="text-warmstone-600 text-sm">
        <span className="font-light">© {new Date().getFullYear()} </span>
        <span className="font-medium">Costin Georgescu</span>
      </div>
    </footer>
  );
};

export default Footer;
