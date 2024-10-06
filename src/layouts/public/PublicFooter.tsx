const Footer = () => {
  return (
    <footer className="w-full bg-[#171d24] pt-8 md:pt-16 2xl:pt-24 pb-4 md:pb-8 2xl:pb-12">
      <section className="mx-auto lg:px-[12rem] md:px-5 px-4 flex items-center justify-center pb-4 md:pb-8 2xl:pb-12">
        <p className="text-white font-semibold text-3xl">USER AUTH SYSTEM</p>
      </section>
      <section className="mx-auto lg:px-[12rem] md:px-5 px-4 ">
        <div className="border-t border-white flex flex-col items-center justify-between text-center lg:flex-row gap-4 pt-4 md:pt-8 2xl:pt-12">
          <p className="text-white">
            © {new Date().getFullYear()} USER AUTH SYSTEM. All Rights Reserved.
          </p>
          <p className="text-white">
            Designed And Developed by
            <span className="text-gray-300 hover:text-white ml-1">
              Satyajit Sahu
            </span>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
